const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync(__dirname+'/../development/index.html','utf8');
const elements={},listeners={},paths=[],labels=[];let current=[],dash=[],checks=0;
const cls={toggle(){},add(){},remove(){}};
function el(id){return elements[id]??={value:'',textContent:'',innerHTML:'',hidden:false,style:{},dataset:{},offsetWidth:100,offsetHeight:40,classList:cls,closest(){return null},querySelector(){return null},setAttribute(){},addEventListener(k,f){(listeners[id]??={})[k]=f},getBoundingClientRect(){return {width:800,height:300,left:0,top:0}},getContext(){return new Proxy({},{set:(o,k,v)=>(o[k]=v,true),get:(o,k)=>typeof o[k]==='function'?o[k]:(...a)=>{if(k==='beginPath')current=[];if(k==='moveTo'||k==='lineTo')current.push([a[0],a[1]]);if(k==='setLineDash')dash=a[0];if(k==='fillText')labels.push(a[0]);if(k==='stroke')paths.push({points:current.slice(),dash:dash.slice(),style:o.strokeStyle});}})}};}
for(const id of ['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency']){let value='';Object.defineProperty(el(id),'value',{get:()=>value,set:x=>value=String(x)});}
const document={getElementById:el,querySelectorAll:()=>[],addEventListener(){},documentElement:{},body:{appendChild(){}},createElement:()=>({click(){},remove(){}})};
const context={document,window:{devicePixelRatio:1,addEventListener(){}},console,Blob,URL:{createObjectURL(){return 'blob:test'},revokeObjectURL(){}},setTimeout,clearTimeout};
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/render\(\);\s*\}\)\(\);\s*$/,'globalThis.api={drawTrendChart,getGeometry:()=>trendGeometry};})();');
vm.runInNewContext(script,context);const {drawTrendChart,getGeometry}=context.api;
function check(value,message){assert.ok(value,message);checks++;}
const cases=[
 ['all positive',[100,80,60,40]],
 ['all negative',[-100,-80,-60,-40]],
 ['mixed',[-100,0,40,120]]
];
for(const [name,values] of cases){
 paths.length=0;labels.length=0;current=[];dash=[];
 const rows=values.map((v,i)=>({month:i+1,investmentPrincipal:v,balance:v,cumulativeNetCashFlow:v,availableCash:v}));
 drawTrendChart([{rows}]);const g=getGeometry();
 check(g.min<=0,`${name}: lower axis bound includes zero`);
 check(g.max>=0,`${name}: upper axis bound includes zero`);
 check(Number.isFinite(g.zeroY),`${name}: RM0 maps to a chart coordinate`);
 const baseline=paths.find(p=>p.dash.length>0);
 check(!!baseline,`${name}: dashed horizontal baseline is drawn`);
 check(baseline.style==='#8b929e',`${name}: baseline uses neutral gray`);
 check(baseline.points.length===2&&baseline.points[0][1]===baseline.points[1][1],`${name}: baseline is horizontal`);
 check(Math.abs(baseline.points[0][1]-g.zeroY)<0.001,`${name}: baseline is positioned at RM0`);
 check(labels.includes('RM0'),`${name}: RM0 label is rendered`);
 check(g.points.length===rows.length*4,`${name}: baseline does not become a fifth data series`);
}
check(/setLineDash\(\[5,4\]\)/.test(html), 'reference baseline uses a dashed stroke');
console.log(JSON.stringify({status:'PASS',checks,axisCases:cases.map(([name])=>name),limits:'Node VM canvas stubs validate axis bounds and drawing commands; live browser visual rendering remains a separate check.'},null,2));
