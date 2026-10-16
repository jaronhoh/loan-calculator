const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync(__dirname+'/../development/index.html','utf8');
const elements={},listeners={},docListeners={};let strokes=0,checks=0,paths=[],current=[];
const cls={toggle(){},add(){},remove(){}};
function el(id){return elements[id]??={value:'',textContent:'',innerHTML:'',hidden:false,style:{},dataset:{},offsetWidth:100,offsetHeight:40,classList:cls,closest(){return null},querySelector(){return null},setAttribute(){},addEventListener(k,f){(listeners[id]??={})[k]=f},getBoundingClientRect(){return {width:800,height:300,left:0,top:0}},getContext(){return new Proxy({},{get:(_,k)=>(...a)=>{if(k==='beginPath')current=[];if(k==='moveTo'||k==='lineTo')current.push([a[0],a[1]]);if(k==='stroke'){strokes++;paths.push(current.slice())}}})}};}
for(const id of ['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency']){let value='';Object.defineProperty(el(id),'value',{get:()=>value,set:x=>value=String(x)});}
const document={getElementById:el,querySelectorAll:()=>[],addEventListener(k,f){docListeners[k]=f},documentElement:{},body:{appendChild(){}},createElement:()=>({click(){},remove(){}})};
const context={document,window:{devicePixelRatio:1,addEventListener(){}},console,Blob,URL:{createObjectURL(b){context.blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout,clearTimeout};
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/render\(\);\s*\}\)\(\);\s*$/,'globalThis.api={buildSchedule,DEFAULTS,setState:s=>state={...state,...s},getGeometry:()=>trendGeometry,showTrendTooltip};})();');
vm.runInNewContext(script,context);const a=context.api;
const check=(v,msg)=>{assert.ok(v,msg);checks++};
const expectedSeries=['investmentPrincipal','balance','cumulativeNetCashFlow','availableCash'];
for(const mode of ['reducing','flat'])for(const language of ['zh','en'])for(const investmentAmount of [100000,90791.75]){
 listeners.resetBtn.click();a.setState({mode,language});el('investmentAmount').value=investmentAmount;listeners.loanAmount?.input?.();
 const payment=mode==='flat'?2000:1841.65, rows=a.buildSchedule({...a.DEFAULTS,mode,investmentAmount},mode);
 el('loanAmount').value=100000;el('tenure').value=60;el('loanRate').value=4;el('investmentAmount').value=investmentAmount;el('returnRate').value=6;el('payoutFrequency').value=6;
 // Trigger the complete UI render through an existing input event.
 listeners.loanAmount.input();
 const g=a.getGeometry();check(g.points.length===240,'all months and four series rendered');
 for(let month=1;month<=60;month++)for(const key of expectedSeries){const point=g.points.find(p=>p.month===month&&p.key===key),row=rows.rows[month-1];check(!!point,`${mode}/${language}/${key}/${month} point exists`);const value=key==='balance'?row.balance:row[key];check(Math.abs(point.value-value)<0.001,`${key} month ${month} matches monthly details`);a.showTrendTooltip(point);const tip=el('trendTooltip').innerHTML;check(tip.includes(language==='zh'?'第 '+month+' 个月':'Month '+month),'month in tooltip');check(tip.includes(language==='zh'?'RM':'RM'),'RM amount');check(tip.includes(language==='zh'?({investmentPrincipal:'投资本金',balance:'剩余贷款',cumulativeNetCashFlow:'累计净现金流',availableCash:'可用现金'}[key]):({investmentPrincipal:'Investment principal',balance:'Remaining loan',cumulativeNetCashFlow:'Cumulative cash flow',availableCash:'Available cash'}[key])),'localized series label');check(el('trendTooltip').hidden===false,'tooltip stays visible');}
 check(g.min<=Math.min(...rows.rows.map(r=>r.availableCash)),'available cash included in scale');
 const neg=g.points.find(p=>p.key==='availableCash'&&p.value<0);check(!!neg,'negative available cash included');a.showTrendTooltip(neg);check(el('trendTooltip').innerHTML.includes(language==='zh'?'−RM':'−RM'),'negative amount sign');
 check(/optimize-btn:hover/.test(html)&&/optimize-btn:focus-visible/.test(html)&&/optimize-btn:disabled/.test(html),'button states');
}
for(const event of ['pointermove','pointerdown','pointerleave','focus','blur','keydown']){check(typeof listeners.trendChart[event]==='function',`chart handler ${event}`);}
console.log(JSON.stringify({status:'PASS',checks,scenarios:8,seriesPoints:8*60*4,limits:'Node VM canvas/DOM stubs; CSS and pointer handlers checked, live browser/mobile rendering not exercised.'},null,2));

