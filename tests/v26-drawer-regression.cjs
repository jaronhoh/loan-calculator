const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const {execFileSync}=require('child_process');
const current=fs.readFileSync(__dirname+'/../development/index.html','utf8');
let html=current;
let checks=0;
const check=(v,msg)=>{assert.ok(v,msg);checks++};
function boot(){
 const elements={},listeners={},strokes=[];let ctx={};
 function el(id){return elements[id]??={value:'',textContent:'',innerHTML:'',hidden:false,style:{},dataset:{},attrs:{},querySelector(){return null},classList:{toggle(){},add(){},remove(){}},open:false,focus(){document.activeElement=this},showModal(){this.open=true;el("closeSettingsBtn").focus()},close(){this.open=false;listeners[id].close?.()},querySelectorAll(){return ["closeSettingsBtn","loanAmount","tenure","loanRate","investmentAmount","optimizeBtn","returnRate","payoutFrequency","reducing","flat"].map(el)},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},addEventListener(k,f){(listeners[id]??={})[k]=f},getBoundingClientRect(){return {width:390,height:260,left:0,top:0,right:390,bottom:260}},getContext(){return new Proxy(ctx,{get(o,k){if(k==='stroke')return ()=>strokes.push(o.strokeStyle);return o[k]??(()=>{})},set(o,k,v){o[k]=v;return true}})}};}
 for(const id of ['loanAmount','tenure','loanRate','investmentAmount','returnRate','payoutFrequency']){let value='';Object.defineProperty(el(id),'value',{get:()=>value,set:x=>value=String(x)});}
 const legend=['investmentPrincipal','balance','cumulativeNetCashFlow','availableCash'].map(key=>({...el(key),dataset:{series:key},style:{}}));
 const root=el('root');root.attrs['data-theme']='light';
 const document={getElementById:el,querySelectorAll:s=>s==='[data-series]'?legend:[],addEventListener(){},documentElement:root,body:{appendChild(){}},createElement:()=>({click(){},remove(){}})};
 const context={document,window:{devicePixelRatio:1,addEventListener(){}},Blob,URL:{createObjectURL(b){context.blob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout,clearTimeout};
 const source=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/render\(\);\s*\}\)\(\);\s*$/,'globalThis.api={getState:()=>state,setState:s=>state={...state,...s},geometry:()=>trendGeometry,exportCsv,chartPalette};render();})();');
 vm.runInNewContext(source,context);listeners.resetBtn.click();return {context,el,listeners,root,strokes,legend,a:context.api};
}

(async()=>{
 const b=boot(),{el,listeners,a}=b;
 check(el('settingsDrawer').open===false,'initially closed');
 const before=el('scheduleBody').innerHTML;
 listeners.openSettingsBtn.click();check(el('settingsDrawer').open,'opens');
 check(b.context.document.activeElement===el('closeSettingsBtn'),'initial focus');
 let prevented=false;listeners.settingsDrawer.keydown({key:'Tab',shiftKey:true,preventDefault(){prevented=true}});
 check(prevented&&b.context.document.activeElement===el('flat'),'reverse Tab wraps');
 prevented=false;listeners.settingsDrawer.keydown({key:'Tab',shiftKey:false,preventDefault(){prevented=true}});
 check(prevented&&b.context.document.activeElement===el('closeSettingsBtn'),'Tab wraps');
 el('investmentAmount').value='90000';listeners.investmentAmount.input();
 const changed=el('scheduleBody').innerHTML;check(changed!==before,'immediate recalculation');
 listeners.closeSettingsBtn.click();check(!el('settingsDrawer').open,'close button');
 check(b.context.document.activeElement===el('openSettingsBtn'),'focus returns');
 listeners.openSettingsBtn.click();check(el('investmentAmount').value==='90000'&&el('scheduleBody').innerHTML===changed,'reopen preserves input and results');
 listeners.settingsDrawer.click({target:el('settingsDrawer'),clientX:200,clientY:100});check(el('settingsDrawer').open,'inside panel does not close');
 listeners.settingsDrawer.click({target:el('settingsDrawer'),clientX:700,clientY:100});check(!el('settingsDrawer').open,'backdrop closes');
 listeners.openSettingsBtn.click();listeners.resetBtn.click();check(el('settingsDrawer').open&&el('investmentAmount').value==='100000','Reset preserves open state and restores values');
 listeners.closeSettingsBtn.click();listeners.language.change({target:{value:'en'}});check(a.getState().language==='en','language retained');
 const baseline=execFileSync('git',['show','133eb96:development/index.html'],{encoding:'utf8'});
 html=baseline;const old=boot();html=current;const fresh=boot();let scenarios=0;
 for(const mode of ['reducing','flat'])for(const language of ['zh','en'])for(const payoutFrequency of [1,3,6,12]){
  for(const x of [old,fresh]){x.a.setState({mode,language});x.el('investmentAmount').value='90000';x.el('payoutFrequency').value=payoutFrequency;x.listeners.loanAmount.input();x.a.exportCsv();}
  check(await old.context.blob.text()===await fresh.context.blob.text(),'baseline CSV identical');
  check(old.el('scheduleBody').innerHTML===fresh.el('scheduleBody').innerHTML,'baseline monthly data identical');
  scenarios++;
 }
 console.log(JSON.stringify({status:'PASS',checks,scenarios,acceptance:['AC-29','AC-30','AC-31','AC-32'],limits:'Dialog stubs check handlers; native Esc, focus, inertness and layout require real browser QA.'},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
