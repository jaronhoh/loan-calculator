const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync(__dirname+'/../development/index.html','utf8');
let checks=0;
const check=(v,msg)=>{assert.ok(v,msg);checks++};
function boot(){
 const elements={},listeners={},strokes=[];let ctx={};
 function el(id){return elements[id]??={value:'',textContent:'',innerHTML:'',hidden:false,style:{},dataset:{},attrs:{},querySelector(){return null},classList:{toggle(){},add(){},remove(){}},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},addEventListener(k,f){(listeners[id]??={})[k]=f},getBoundingClientRect(){return {width:390,height:260,left:0,top:0}},getContext(){return new Proxy(ctx,{get(o,k){if(k==='stroke')return ()=>strokes.push(o.strokeStyle);return o[k]??(()=>{})},set(o,k,v){o[k]=v;return true}})}};}
 for(const id of ['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency']){let value='';Object.defineProperty(el(id),'value',{get:()=>value,set:x=>value=String(x)});}
 const legend=['investmentPrincipal','balance','cumulativeNetCashFlow','availableCash'].map(key=>({...el(key),dataset:{series:key},style:{}}));
 const root=el('root');root.attrs['data-theme']='light';
 const document={getElementById:el,querySelectorAll:s=>s==='[data-series]'?legend:[],addEventListener(){},documentElement:root,body:{appendChild(){}},createElement:()=>({click(){},remove(){}})};
 const context={document,window:{devicePixelRatio:1,addEventListener(){}},Blob,URL:{createObjectURL(b){context.blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout,clearTimeout};
 const source=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/render\(\);\s*\}\)\(\);\s*$/,'globalThis.api={getState:()=>state,setState:s=>state={...state,...s},geometry:()=>trendGeometry,exportCsv,chartPalette};render();})();');
 vm.runInNewContext(source,context);listeners.resetBtn.click();return {context,el,listeners,root,strokes,legend,a:context.api};
}
(async()=>{
 const b=boot(),{el,listeners,root,a}=b;
 check(root.attrs['data-theme']==='light','AC-28 initial light');
 let scenarios=0;
 for(const mode of ['reducing','flat'])for(const language of ['zh','en'])for(const amount of [100000,90791.75]){
  a.setState({mode,language});el('investmentAmount').value=amount;listeners.loanAmount.input();
  const before={state:JSON.stringify(a.getState()),inputs:['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency'].map(id=>el(id).value),table:el('scheduleBody').innerHTML,summary:el('monthlyPayment').textContent,points:JSON.stringify(a.geometry().points)};
  a.exportCsv();const csv=await b.context.blob.text();
  for(const theme of ['dark','light','dark']){
   b.strokes.length=0;listeners[theme+'ThemeBtn'].click();
   check(root.attrs['data-theme']===theme,'theme applied');
   check(el(theme+'ThemeBtn').attrs['aria-pressed']==='true','selected state');
   check(JSON.stringify(a.getState())===before.state,'financial/language state unchanged');
   check(JSON.stringify(a.geometry().points)===before.points,'all chart points unchanged');
   check(el('scheduleBody').innerHTML===before.table&&el('monthlyPayment').textContent===before.summary,'table and summary unchanged');
   check(JSON.stringify(before.inputs)===JSON.stringify(['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency'].map(id=>el(id).value)),'inputs preserved');
   a.exportCsv();check(await b.context.blob.text()===csv,'CSV byte equivalent');
   const p=a.chartPalette();check(b.strokes.includes(p.zero),'RM0 repainted');
   for(const key of ['investmentPrincipal','balance','cumulativeNetCashFlow','availableCash'])check(b.strokes.includes(p[key]),key+' repainted');
   check(new Set(b.legend.map(x=>x.style.background)).size===4,'four distinct legend colors');
   check(el('darkThemeBtn').attrs['aria-label']===(language==='zh'?'深色模式':'Dark Mode'),'bilingual accessible name');
  }
  listeners.resetBtn.click();check(root.attrs['data-theme']==='dark','Reset retains dark');check(el('investmentAmount').value==='100000'&&a.getState().language==='zh','Reset financial defaults preserved');scenarios++;
 }
 el('loanAmount').value='';listeners.loanAmount.input();listeners.lightThemeBtn.click();check(a.geometry()===null,'invalid results cannot be revived by theme');
 const fresh=boot();check(fresh.root.attrs['data-theme']==='light','fresh document restores light');
 check(!/localStorage|sessionStorage|document\.cookie/.test(html),'no preference persistence');
 check(/id="lightThemeBtn"[^>]*type="button"/.test(html)&&/id="darkThemeBtn"[^>]*type="button"/.test(html),'native keyboard/touch buttons');
 check(/width:44px;height:44px/.test(html),'44px touch targets');
 const dark=/html\[data-theme="dark"\]\{([^}]+)\}/.exec(html)[1];
 for(const token of ['bg','card','ink','muted','line','red','green','surface','table-head','tip','warn-bg'])check(dark.includes('--'+token+':'),'dark token '+token);
 console.log(JSON.stringify({status:'PASS',checks,scenarios,acceptance:['AC-26','AC-27','AC-28'],limits:'VM validates state, CSV and canvas drawing; browser/device visual acceptance recorded separately.'},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
