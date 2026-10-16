const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync(__dirname+'/../development/index.html','utf8');
let script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements={},listeners={};
const cls={toggle(){},add(){},remove(){}};
function el(id){return elements[id]??=( {value:'',textContent:'',innerHTML:'',classList:cls,closest(){return null},querySelector(){return null},addEventListener(k,f){(listeners[id]??={})[k]=f},getBoundingClientRect(){return {width:800,height:300}},getContext(){return new Proxy({},{get:()=>()=>{}})}})}
for(const id of ['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency']){let value='';Object.defineProperty(el(id),'value',{get:()=>value,set:x=>value=String(x)});}
const document={getElementById:el,querySelectorAll:()=>[],addEventListener(){},documentElement:{},body:{appendChild(){}},createElement:()=>({click(){},remove(){}})};
const context={document,window:{addEventListener(){}},console,Blob,URL:{createObjectURL(b){context.blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout,clearTimeout};
script=script.replace(/render\(\);\s*\}\)\(\);\s*$/, 'globalThis.api={buildSchedule,validate,exportCsv,FORMULAS,HEADERS,DEFAULTS,renderTable,getResults,setState:s=>state={...state,...s}};})();');
vm.runInNewContext(script,context);const a=context.api;let checks=0;
const check=(v,msg)=>{assert.ok(v,msg);checks++};
const near=(x,y)=>Math.abs(x-y)<0.011;
const v={...a.DEFAULTS};for(const [k,x] of Object.entries(v))el(k).value=String(x);
for(const mode of ['reducing','flat'])for(const tenure of [1,2,60,420])for(const rate of [0,0.00000001,4,25])for(const freq of [1,3,6,12]){
 const input={...v,tenure,loanRate:rate,payoutFrequency:freq,investmentAmount:80000},r=a.buildSchedule(input,mode);check(r.rows.length===tenure,'rows');check(r.rows.at(-1).balance===0,'closing balance');let principal=0,cum=0,interest=0;
 for(const row of r.rows){principal+=row.principal;interest+=row.interest;cum+=row.payout-row.payment;check(near(row.payment,row.principal+row.interest),'payment identity');check(near(row.cumulativeNetCashFlow,cum),'cumulative');check(near(row.availableCash,20000+cum),'cash');check(near(row.netAsset,80000+row.availableCash-row.balance),'net assets');check(row.payout===(row.month%freq===0?80000*.06*freq/12:0),'payout');}
 check(near(principal,100000),'principal conservation');check(near(interest,r.totalInterest),'interest total');
}
check(a.buildSchedule(v,'reducing').monthlyPayment===1841.65,'default reducing');check(a.buildSchedule(v,'flat').monthlyPayment===2000,'default flat');
for(const [key,value] of [['loanAmount','0'],['tenure','0'],['tenure','421'],['tenure','1.5'],['loanRate',''],['loanRate','-1'],['returnRate',''],['returnRate','-1'],['investmentAmount','100001'],['investmentAmount','0'],['payoutFrequency','2']]){const prev=el(key).value;el(key).value=value;check(!a.validate().valid,key+' invalid');el(key).value=prev;}
check(a.validate().valid,'defaults valid');
for(const lang of ['zh','en']){a.setState({language:lang});a.renderTable([a.buildSchedule(v,'reducing')]);check((el('scheduleHead').innerHTML.match(/formula-info/g)||[]).length===11,'all headers');for(const [k] of a.HEADERS)check(!!a.FORMULAS[lang][k],lang+' '+k);}
check(!/>i<\/button>/.test(html),'no i icon');check(/<span tabindex="0" class="formula-info"/.test(html),'focusable label');check(!/data-mode="compare"/.test(html),'compare removed');check(!/id="cashChart"/.test(html),'cash chart removed');check(/@media\(max-width:600px\)/.test(html)&&/overflow:auto/.test(html),'responsive rules');check(/min-height:24px/.test(html)&&/position:fixed;width:max-content/.test(html),'label trigger and un-clipped popover');
listeners.resetBtn.click();check(el('loanAmount').value==='100000'&&el('tenure').value==='60','reset');
(async()=>{for(const mode of ['reducing','flat'])for(const language of ['zh','en']){a.setState({mode,language});a.exportCsv();const csv=await context.blob.text();const lines=csv.trim().split('\r\n');check(lines.length===61,'CSV full tenure');check(lines[0].split(',').length===11,'CSV headers');check(lines.at(-1).split(',')[4]==='0.00','CSV closing');}console.log(JSON.stringify({status:'PASS',checks,scenarios:256,limits:'Node VM with DOM stubs; no real browser, layout or touch verification.'},null,2));})().catch(e=>{console.error(e);process.exitCode=1});
