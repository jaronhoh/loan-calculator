
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const html=fs.readFileSync(__dirname+'/../development/index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const functions=script.slice(script.indexOf('function cents('),script.indexOf('function renderSummary('));
const api=vm.runInNewContext(
  'const state={language:"en"};'+functions+';({state,buildSchedule,netReturnMetrics,annualizedIrr,formatReturn})'
);
let checks=0;
function check(condition,message){
  assert.ok(condition,message);
  checks++;
}
function close(actual,expected,message){
  check(actual!==null&&Math.abs(actual-expected)<1e-9,message);
}
const cents=value=>Math.round(value*100)/100;
const base={loanAmount:100000,tenure:61,loanRate:4,investmentAmount:100000,returnRate:18};
for(const mode of ['reducing','flat']){
  for(const payoutFrequency of [1,3,6,12]){
    for(const enabled of [false,true]){
      api.state.allowInvestmentPrincipalRepayment=enabled;
      const input={...base,payoutFrequency};
      const result=api.buildSchedule(input,mode);
      const last=result.rows.at(-1);
      const tailMonths=input.tenure%payoutFrequency;
      let opening=input.investmentAmount;
      let unpaid=enabled?0:cents(opening*input.returnRate*tailMonths/1200);
      const flows=[-opening];
      for(const row of result.rows){
        if(enabled&&row.month>input.tenure-tailMonths){
          unpaid+=cents(opening*input.returnRate/1200);
        }
        flows.push(row.payout+(opening-row.remainingInvestmentPrincipal)-row.interest);
        opening=row.remainingInvestmentPrincipal;
      }
      flows[flows.length-1]+=unpaid+opening;
      close(result.unpaidReturn,unpaid,'unpaid return reconciles with independent accrual');
      const net=result.totalPayouts+unpaid-result.totalInterest;
      close(flows.reduce((a,b)=>a+b,0),net,'cash-flow sum equals earned returns less interest');
      const metrics=api.netReturnMetrics(result,input.investmentAmount);
      close(metrics.roi,net/input.investmentAmount,'ROI reconciles with earned returns');
      check(last.remainingInvestmentPrincipal===opening,'ending principal included once');

      // Search independently in discount-factor space and evaluate NPV directly.
      const npv=x=>flows.reduce((sum,flow,month)=>sum+flow*x**month,0);
      let low=0,high=2;
      check(npv(low)<0&&npv(high)>0,'bounded test case has a sign-changing root');
      for(let step=0;step<60;step++){
        const midpoint=(low+high)/2;
        if(npv(midpoint)<0)low=midpoint;
        else high=midpoint;
      }
      close(metrics.annualized,((low+high)/2)**-12-1,'annualized IRR matches direct NPV root');
    }
  }
}
api.state.allowInvestmentPrincipalRepayment=true;
const depleted={...base,investmentAmount:90000,returnRate:6,payoutFrequency:3};
const depletedResult=api.buildSchedule(depleted,'reducing');
check(depletedResult.rows.at(-1).remainingInvestmentPrincipal===0,'depleted investment fixture');
check(api.netReturnMetrics(depletedResult,depleted.investmentAmount).annualized===null,'ambiguous IRR after depletion');
close(api.annualizedIrr([-100,110]),1.1**12-1,'positive one-month IRR');
close(api.annualizedIrr([-100,90]),0.9**12-1,'negative one-month IRR');
close(api.annualizedIrr([-100,0,100]),0,'zero IRR');
check(api.annualizedIrr([-100,230,-132])===null,'multiple valid IRRs');
check(api.annualizedIrr([-100,200,-100])===null,'numerically ambiguous tangency');
check(api.annualizedIrr([-100,0,-5])===null,'no positive discount root');
check(api.annualizedIrr([-100,190,-100])===null,'mixed signs with no root');
close(api.annualizedIrr([-100,100,-100,100]),0,'unique IRR with multiple sign changes');
close(api.annualizedIrr([-1, ...Array(419).fill(0), 1.01]),1.01**(12/420)-1,'420-month near-zero IRR');
const empty=api.netReturnMetrics(null,0);
check(empty.roi===null&&empty.annualized===null,'zero investment is unavailable');
check(api.formatReturn(null)==='N/A','unavailable formatting');
check(api.formatReturn(-1e-12)==='0.00%','no negative display zero');
check(api.formatReturn(-0.12345)==='-12.35%','negative percent rounding');
console.log(`FR-22 PASS — ${checks} checks across 16 mode/frequency/toggle combinations and edge cases.`);
