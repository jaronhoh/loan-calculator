# Loan Investment Calculator

面向马来西亚用户的免费、无需注册的纯前端单页计算器，用于评估贷款资金投入固定回报投资后的逐月现金流与净资产影响。

## 当前产品方向

- 贷款金额与投资金额独立输入，但投资金额不得高于贷款金额。
- 支持递减余额法（Reducing Balance）、平息法（Flat Rate），并可比较两种模式。
- 投资回报按固定年回报率计算，只在实际派息月份作为现金收入入账；派息不再产生额外投资回报。
- 贷款每个月都必须还款，不因派息时间而跳过月供。
- 贷款金额减投资金额形成初始保留现金；当月净现金流为负时，该现金余额用于补贴。余额可以低于 RM0，以显示累计资金缺口。
- 展示逐月明细、月度净现金流柱状图和关键资产/贷款趋势；支持 CSV 导出。
- 默认英文，可切换简体中文；修改输入后自动重算。
- 每次打开页面均使用默认参数，不保存用户输入；提供 Reset 按钮。
- 货币为 MYR；纯浏览器端运行，无账号、后端、数据库或服务端持久化。

## 默认参数

| 参数 | 默认值 |
|---|---:|
| Loan Amount | RM100,000 |
| Investment Amount | RM100,000 |
| Loan Tenure | 60 months |
| Loan Interest Rate | 4% p.a. |
| Expected Investment Return | 6% p.a. |
| Payout Frequency | Every 6 months |
| Loan Calculation Mode | Reducing Balance |
| Initial Language | English |

贷款期限最长为 420 个月（35 年）。

## 产品资料

- [产品定义 / Shaping](./shaping/)
- [PRD](./prd/PRD文档.md)
- [Development](./development/)

> 本工具用于情景测算，不构成贷款、投资或财务建议。投资回报是用户输入的固定假设，实际回报可能不同。
