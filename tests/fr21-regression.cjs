const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync(__dirname+'/../development/index.html','utf8');
const elements={},listeners={},docListeners={};let checks=0;
const cls={toggle(){},add(){},remove(){}};
function el(id){return elements[id]??={value:'',checked:false,textContent:'',innerHTML:'',style:{},hidden:id==='trendTooltip',dataset:{},offsetWidth:100,offsetHeight:40,classList:cls,rect:{width:800,height:300,left:40,top:60},closest(){return null},querySelector(){return null},setAttribute(){},addEventListener(k,f){(listeners[id]??={})[k]=f},getBoundingClientRect(){return id==='trendTooltip'?{width:220,height:60,left:0,top:0}:this.rect},getContext(){return new Proxy({},{get:(_,k)=>()=>{}})}};}
for(const id of ['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency']){let value='';Object.defineProperty(el(id),'value',{get:()=>value,set:x=>value=String(x)});}
const document={getElementById:el,querySelectorAll:()=>[],addEventListener(k,f){docListeners[k]=f},documentElement:{setAttribute(){}},body:{appendChild(){}},createElement:()=>({click(){},remove(){}})};
const context={document,window:{innerWidth:390,innerHeight:844,devicePixelRatio:1,addEventListener(k,f){(listeners.window??={})[k]=f}},console,Blob,URL:{createObjectURL(b){context.blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout,clearTimeout};
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/render\(\);\s*\}\)\(\);\s*$/, 'globalThis.api={buildSchedule,DEFAULTS,FORMULAS,TEXT,HEADERS,visibleHeaders,setState:s=>state={...state,...s},getState:()=>({...state}),getChartState:()=>({...trendGeometry,rows:trendGeometry.rows,seriesKeys:trendGeometry.seriesKeys})};})();');
vm.runInNewContext(script,context);const a=context.api;
const check=(v,msg)=>{assert.ok(v,msg);checks++};
function reset(){listeners.resetBtn.click();}
function inputs(v){for(const [k,value] of Object.entries(v))el(k).value=value;}
function schedule(v,mode='reducing',usePrincipal=true){a.setState({allowInvestmentPrincipalRepayment:usePrincipal});return a.buildSchedule(v,mode);}
const defaults={loanAmount:100000,tenure:60,loanRate:4,investmentAmount:100000,returnRate:6,payoutFrequency:6};

// Unchecked mode keeps the legacy loan and cash calculations.
reset();
const legacy=schedule({...defaults},'reducing',false),legacyLast=legacy.rows.at(-1);
check(legacy.monthlyPayment===1841.65,'legacy reducing payment unchanged');
check(legacy.totalPayouts===30000,'legacy total investment payouts unchanged');
check(legacyLast.cumulativeNetCashFlow===-80499.17,'legacy cumulative cash flow unchanged');
check(legacyLast.netAsset===19500.83,'legacy ending net asset unchanged');
check(legacy.rows[0].remainingInvestmentPrincipal===100000&&legacy.rows.every(r=>r.principalWithdrawal===0),'legacy investment principal retained');

// Distributed monthly return fully covers the instalment without principal use.
let r=schedule({loanAmount:1200,tenure:12,loanRate:0,investmentAmount:1000,returnRate:120,payoutFrequency:1});
check(r.rows.every(row=>row.principalWithdrawal===0&&row.outOfPocketRepayment===0),'sufficient distributed yield avoids principal draw');
check(r.rows[0].payout===100,'monthly return uses opening principal');

// Undistributed return cannot be used before its scheduled payout; unused payouts roll forward.
r=schedule({loanAmount:1200,tenure:12,loanRate:0,investmentAmount:1000,returnRate:120,payoutFrequency:3});
check(r.rows[0].payout===0&&r.rows[0].principalWithdrawal===100,'month 1 cannot use undistributed return');
check(r.rows[1].payout===0&&r.rows[1].principalWithdrawal===100,'month 2 cannot use undistributed return');
check(r.rows[2].payout>0&&r.rows[2].principalWithdrawal===0,'distributed return pays the scheduled instalment');
check(r.rows[3].payout===0&&r.rows[3].principalWithdrawal===0,'unused distributed return carries into a non-payout month');

// A lower return uses principal, then personal funds after the principal is exhausted.
r=schedule({loanAmount:1200,tenure:60,loanRate:0,investmentAmount:1,returnRate:1200,payoutFrequency:1});
check(r.rows[0].remainingInvestmentPrincipal===0&&r.rows[0].principalWithdrawal===1,'principal is capped at the available balance');
check(r.rows[0].outOfPocketRepayment>0,'own funds cover the remaining instalment');
check(r.rows[1].payout===0&&r.rows[1].principalWithdrawal===0,'exhausted principal earns no later return');
check(r.rows.every(row=>row.remainingInvestmentPrincipal>=0),'principal never goes below zero');

// Both loan methods and all payout frequencies conserve the loan schedule and asset identities.
for(const mode of ['reducing','flat'])for(const payoutFrequency of [1,3,6,12]){
 r=schedule({...defaults,payoutFrequency},mode);
 check(r.monthlyPayment>0&&r.rows.length===60,mode+' '+payoutFrequency+' schedule created');
 check(r.rows.at(-1).balance===0,mode+' '+payoutFrequency+' loan closes');
 for(let i=0;i<r.rows.length;i++){
  const row=r.rows[i],previous=i?r.rows[i-1]:null;
  check(row.remainingInvestmentPrincipal===Math.max(0,Math.round((defaults.investmentAmount-row.cumulativePrincipalWithdrawal+Number.EPSILON)*100)/100),'remaining principal matches cumulative withdrawal');
  check(row.netAsset===Math.round((row.remainingInvestmentPrincipal+row.availableCash-row.balance+Number.EPSILON)*100)/100,'net asset identity holds');
  check(row.cumulativeNetCashFlow===Math.round(((previous?.cumulativeNetCashFlow||0)+row.payout-row.payment+row.principalWithdrawal+Number.EPSILON)*100)/100,'cash flow identity holds');
 }
}

// UI toggle, summary, schedule, chart, CSV, language, theme and Reset wiring.
reset();
el('loanAmount').value='1200';el('tenure').value='12';el('loanRate').value='0';el('investmentAmount').value='1000';el('returnRate').value='12';el('payoutFrequency').value='3';
el('allowInvestmentPrincipalRepayment').checked=true;
listeners.allowInvestmentPrincipalRepayment.change();
check(a.getState().allowInvestmentPrincipalRepayment,'checkbox toggle recalculates in checked state');
check(el('principalSummary').classList===cls&&el('summaryRemainingPrincipal').textContent.startsWith('RM'),'principal summary rendered');
check(a.visibleHeaders().length===14,'checked schedule adds all repayment fields');
check(a.getChartState().seriesKeys.length===6,'checked trend chart includes principal changes');
listeners.exportTableBtn.click();
(async()=>{
 const csv=(await context.blob.text()).replace(/^\uFEFF/,'').trim().split('\r\n');
 check(csv.length===13,'CSV has one row per loan month plus header');
 check(csv[0].split(',').length===14&&csv[1].split(',').length===14,'CSV includes matching repayment fields');
 check(csv[1].includes('100.00'),'CSV includes current repayment data');
 listeners.language.change({target:{value:'en'}});
 check(a.TEXT.en.allowInvestmentPrincipal==='Allow investment principal for loan repayment','English checkbox label available');
 listeners.language.change({target:{value:'zh'}});
 check(a.TEXT.zh.allowInvestmentPrincipal==='允许使用投资本金偿还贷款','Chinese checkbox label available');
 listeners.darkThemeBtn.click();check(/dark/.test(html),'dark theme implementation remains present');
 el('allowInvestmentPrincipalRepayment').checked=true;listeners.resetBtn.click();
 check(el('allowInvestmentPrincipalRepayment').checked===false&&!a.getState().allowInvestmentPrincipalRepayment,'Reset returns checkbox to unchecked');
 check(a.getChartState().seriesKeys.length===4,'Reset restores legacy chart');
 check(a.visibleHeaders().length===11,'Reset restores legacy schedule columns');
 check(/@media\(max-width:600px\)/.test(html)&&/overflow:auto/.test(html),'responsive layout and scrollable schedule retained');
 console.log(JSON.stringify({status:'PASS',checks,scenarioSets:8,frequencies:[1,3,6,12],loanModes:['reducing','flat'],limitations:'Node VM with DOM stubs; static responsive CSS reviewed, no rendered-browser or physical-device test.'},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
