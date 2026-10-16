const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync(__dirname+'/../development/index.html','utf8');
const elements={},listeners={},docListeners={};let strokes=0,checks=0;
const cls={toggle(){},add(){},remove(){}};
function el(id){return elements[id]??={value:'',textContent:'',innerHTML:'',style:{},hidden:id==='trendTooltip',dataset:{},offsetWidth:100,offsetHeight:40,classList:cls,rect:{width:800,height:300,left:40,top:60},closest(){return null},querySelector(){return null},addEventListener(k,f){(listeners[id]??={})[k]=f},getBoundingClientRect(){return id==='trendTooltip'?{width:220,height:60,left:0,top:0}:this.rect},getContext(){return new Proxy({},{get:(_,k)=>()=>{if(k==='stroke')strokes++}})}};}
for(const id of ['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency']){let value='';Object.defineProperty(el(id),'value',{get:()=>value,set:x=>value=String(x)});}
const document={getElementById:el,querySelectorAll:()=>[],addEventListener(k,f){docListeners[k]=f},documentElement:{},body:{appendChild(){}},createElement:()=>({click(){},remove(){}})};
const context={document,window:{innerWidth:390,innerHeight:844,devicePixelRatio:1,addEventListener(k,f){(listeners.window??={})[k]=f}},console,Blob,URL:{createObjectURL(b){context.blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout,clearTimeout};
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/render\(\);\s*\}\)\(\);\s*$/, 'globalThis.api={buildSchedule,DEFAULTS,FORMULAS,money,setState:s=>state={...state,...s},getChartState:()=>({...trendGeometry,series:[r=>r.investmentPrincipal,r=>r.balance,r=>r.cumulativeNetCashFlow,r=>r.availableCash].map(value=>({value}))})};})();');
vm.runInNewContext(script,context);const a=context.api;
const check=(v,msg)=>{assert.ok(v,msg);checks++};
function reset(){listeners.resetBtn.click();}
function click(){listeners.optimizeBtn.click();}
const tableColumn={investmentPrincipal:6,balance:4,cumulativeNetCashFlow:8,availableCash:9};
const chartName={investmentPrincipal:{en:'Investment principal',zh:'投资本金'},balance:{en:'Remaining loan',zh:'剩余贷款'},cumulativeNetCashFlow:{en:'Cumulative cash flow',zh:'累计净现金流'},availableCash:{en:'Available cash',zh:'可用现金'}};
function pointEvent(monthIndex,seriesIndex,type='mouse'){
 const s=a.getChartState(),p={x:s.pad.l+(s.rows.length===1?s.plotW/2:monthIndex/(s.rows.length-1)*s.plotW),y:s.pad.t+(s.max-s.series[seriesIndex].value(s.rows[monthIndex]))/(s.max-s.min)*s.plotH},rect=el('trendChart').getBoundingClientRect();
 const e={pointerType:type,clientX:rect.left+p.x,clientY:rect.top+p.y,target:el('trendChart'),preventDefault(){}};
 listeners.trendChart[type==='touch'?'pointerdown':'pointermove'](e);return {tooltip:el('trendTooltip').innerHTML.replace(/<\/(?:strong|span)>/g,'\n').replace(/<[^>]*>/g,''),p};
}
function tableValue(monthIndex,column){const tr=el('scheduleBody').innerHTML.split('</tr>')[monthIndex],cells=[...tr.matchAll(/<td[^>]*>(.*?)<\/td>/g)].map(m=>m[1].replace(/<[^>]*>/g,''));return cells[column];}
function chartTooltipRegression(){
 const s=a.getChartState(),idx={investmentPrincipal:0,balance:1,cumulativeNetCashFlow:2,availableCash:3};
 for(const mode of ['reducing','flat'])for(const language of ['zh','en']){
  a.setState({mode});listeners.language.change({target:{value:language}});
  const current=a.getChartState(),trs=el('scheduleBody').innerHTML.split('</tr>');
  for(const key of Object.keys(tableColumn))for(let month=0;month<current.rows.length;month++){
   const {tooltip}=pointEvent(month,idx[key]);
   const displayed=tableValue(month,tableColumn[key]),name=chartName[key][language],monthLabel=language==='zh'?`第 ${month+1} 个月`:`Month ${month+1}`;
   check(tooltip.startsWith(monthLabel+'\n')&&tooltip.split('\n').includes(name+': '+displayed),`${mode} ${key} month ${month+1} ${language} matches table; tooltip=${JSON.stringify(tooltip)} table=${JSON.stringify(displayed)}`);
  }
  const endingAvailable=pointEvent(current.rows.length-1,3).tooltip;check(endingAvailable.includes(language==='zh'?'−RM ':'−RM '),'negative cash tooltip');
 }
 listeners.language.change({target:{value:'zh'}});
 const mobile=el('trendChart');mobile.rect={width:360,height:230,left:10,top:20};listeners.window.resize();
 const touch=pointEvent(59,3,'touch');check(touch.tooltip.includes('第 60 个月'),'touch chart tooltip');
 const bounds=el('trendTooltip').style;check(parseFloat(bounds.left)>=6&&parseFloat(bounds.left)<=254,'mobile tooltip stays in chart horizontally');
 check(parseFloat(bounds.top)>=6&&parseFloat(bounds.top)<=254,'mobile tooltip stays in chart vertically');
 check(/\.optimize-btn:hover/.test(html)&&/\.optimize-btn:focus-visible/.test(html)&&/\.optimize-btn:disabled/.test(html),'button interaction states');
 check(/availableCash/.test(html)&&/可用现金/.test(html)&&/Available cash/.test(html),'bilingual available cash legend');
 check(s.series.length===4,'four chart series');
 listeners.trendChart.pointerleave({pointerType:'mouse'});check(el('trendTooltip').hidden,'mouse leave closes tooltip');
 reset();el('investmentAmount').value='75000';listeners.investmentAmount.input();
 let manual=pointEvent(0,3).tooltip;check(manual.split('\n').includes('可用现金: '+tableValue(0,9)),'manual investment edit refreshes available-cash tooltip');
 reset();click();manual=pointEvent(0,3).tooltip;check(manual.split('\n').includes('可用现金: '+tableValue(0,9)),'Optimize refreshes available-cash tooltip');
 listeners.trendChart.focus();listeners.trendChart.keydown({key:'ArrowRight',preventDefault(){}});check(el('trendTooltip').innerHTML.includes('第 2 个月'),'keyboard tooltip navigation');
 reset();check(el('trendTooltip').hidden,'reset closes chart tooltip');
}
(async()=>{
for(const mode of ['reducing','flat'])for(const freq of [1,3,6,12]){
 reset();a.setState({mode});el('payoutFrequency').value=freq;
 const before=strokes,payment=mode==='flat'?2000:1841.65,expected=(100000-(freq-1)*payment).toFixed(2);click();
 check(el('investmentAmount').value===expected,mode+' '+freq);
 check(strokes>before,'chart redrawn');check(el('scheduleBody').innerHTML.includes(Number(expected).toLocaleString('zh-CN',{minimumFractionDigits:2})),'table refreshed');
 const total=Math.round(Number(expected)*.06*freq/12*100)/100*(60/freq);check(el('totalPayouts').textContent.includes(total.toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2})),'summary refreshed');
 check(el('scheduleBody').innerHTML.includes('negative-text'),'funding gap retained');
 for(const language of ['zh','en']){a.setState({language});listeners.exportTableBtn.click();const csv=await context.blob.text();check(csv.trim().split('\r\n').length===61,'CSV rows');check(csv.includes(','+expected+','),'CSV optimized principal');}
}
reset();click();check(el('investmentAmount').value==='90791.75','AC-18 default');
for(const amount of ['0.01','100000.01']){reset();el('loanAmount').value=amount;el('tenure').value=1;el('payoutFrequency').value=1;click();check(el('investmentAmount').value===amount,'monthly payout reserves zero even for one-month term');}
reset();el('loanAmount').value='0.01';el('tenure').value=420;click();check(el('investmentAmount').value==='0.01','zero rounded payment');
reset();el('loanAmount').value=111;el('loanRate').value=0;el('tenure').value=11;el('payoutFrequency').value=12;click();check(el('investmentAmount').value==='0.01','smallest positive investment');
for(const [key,value] of [['loanAmount',''],['loanAmount','0'],['loanAmount','-1'],['loanAmount','1e309'],['loanAmount','1e20'],['tenure','0'],['tenure','421'],['tenure','1.5'],['loanRate',''],['loanRate','-1'],['loanRate','1e309'],['payoutFrequency','2'],['returnRate',''],['returnRate','-1'],['tenure','1']]){
 reset();el('investmentAmount').value='123.45';el(key).value=value;click();check(el('investmentAmount').value==='123.45',key+' preserve');check(el('optimizeStatus').textContent.length>0,'error message');
}
reset();el('loanAmount').value=110;el('loanRate').value=0;el('tenure').value=11;el('payoutFrequency').value=12;el('investmentAmount').value=7;click();check(el('investmentAmount').value==='7','zero result rejected');
for(const mode of ['reducing','flat']){reset();a.setState({mode});el('loanRate').value=0;el('tenure').value=420;el('loanAmount').value='100000.01';el('investmentAmount').value='';click();check(/^\d+\.\d{2}$/.test(el('investmentAmount').value),'cent precision and repair');}
reset();a.setState({language:'en'});el('loanAmount').value=0;click();check(el('optimizeStatus').textContent.startsWith('Check'),'English error');reset();check(el('optimizeStatus').textContent==='','reset clears status');check(el('investmentAmount').value==='100000','reset amount');
for(const language of ['zh','en'])for(const key of ['payment','availableCash','netAssets'])check(!!a.FORMULAS[language][key],'tooltip formula preserved');
check(!!docListeners.pointerdown&&!!docListeners.keydown&&!!docListeners.focusin,'tooltip handlers retained');
check(/@media\(max-width:600px\)/.test(html)&&/overflow:auto/.test(html),'responsive CSS retained');
check(/id="optimizeBtn"[^>]*min-height:44px/.test(html),'touch button target');
reset();el('investmentAmount').value='75000';listeners.investmentAmount.input();chartTooltipRegression();
console.log(JSON.stringify({status:'PASS',checks,payoutScenarios:8,tooltipScenarios:4,monthsPerSeries:60,series:4,limits:'Node VM DOM stubs; responsive CSS and pointer geometry exercised at desktop/mobile dimensions; browser pixel-rendering remains separate.'},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
