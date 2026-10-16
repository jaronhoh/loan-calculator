const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync(__dirname+'/../development/index.html','utf8');
const elements={},listeners={},docListeners={};let strokes=0,checks=0;
const cls={toggle(){},add(){},remove(){}};
function el(id){return elements[id]??={value:'',textContent:'',innerHTML:'',classList:cls,closest(){return null},querySelector(){return null},addEventListener(k,f){(listeners[id]??={})[k]=f},getBoundingClientRect(){return {width:800,height:300}},getContext(){return new Proxy({},{get:(_,k)=>()=>{if(k==='stroke')strokes++}})}};}
for(const id of ['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency']){let value='';Object.defineProperty(el(id),'value',{get:()=>value,set:x=>value=String(x)});}
const document={getElementById:el,querySelectorAll:()=>[],addEventListener(k,f){docListeners[k]=f},documentElement:{},body:{appendChild(){}},createElement:()=>({click(){},remove(){}})};
const context={document,window:{addEventListener(){}},console,Blob,URL:{createObjectURL(b){context.blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout,clearTimeout};
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/render\(\);\s*\}\)\(\);\s*$/, 'globalThis.api={buildSchedule,DEFAULTS,FORMULAS,setState:s=>state={...state,...s}};})();');
vm.runInNewContext(script,context);const a=context.api;
const check=(v,msg)=>{assert.ok(v,msg);checks++};
function reset(){listeners.resetBtn.click();}
function click(){listeners.optimizeBtn.click();}
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
console.log(JSON.stringify({status:'PASS',checks,scenarios:8,limits:'Node VM DOM stubs; responsive CSS and tooltip handlers checked, real browser acceptance separate.'},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
