# Loan Investment Calculator — Project Status & Handoff

> Single source of truth for cross-conversation handoff.
> Last updated: 2026-10-24 (Malaysia, UTC+08:00)
> Case status: FR-19 RELEASED — 90,959 automated checks and local real-browser acceptance passed; existing owner-only Site version 10 deployed successfully.

## Project identity
- Repository: jaronhoh/loan-calculator
- Branch: main (no additional GitHub branch created)
- Application: development/index.html
- Production version: v2.2 with FR-14–FR-18 UI enhancements (Released 2026-10-17); development version: v2.2
- Existing PocketBay app #3128: user explicitly authorized permanent deletion on 2026-10-16; deletion user-confirmed complete on 2026-11-05; not independently verified by this agent.
- Official production platform: ChatGPT Sites; keep the existing Site intact.
- Existing ChatGPT Site: appgprj_6ad0f21a67c88191ba4abfa0761bc3c0
- Site URL: https://loan-investment-calculator.savoryboar128.chatgpt.site
- Audience: existing owner-only custom access preserved.

## v2.2 release — 2026-10-16 (MYT)
- Branch: main; no additional GitHub branch created.
- GitHub code and test commit: fae87acf2dc7ab8f88e306d35d18772731f7c052; deployment evidence and release status are recorded in this update.
- Implemented FR-13 / AC-16–AC-20: bilingual Optimize button beside Investment Amount, current-mode rounded monthly payment, cent-based reserve calculation, existing calculation/render pipeline, and invalid-result preservation.
- Default verified: RM100,000 − 5 × RM1,841.65 = **RM90,791.75**; Flat Rate result: RM90,000.00.
- Existing loan/investment engine is unchanged. The formula reserves only payments before the first payout; later negative available cash remains visible.
- Automated tests: PASS — v21: 256 scenarios / 77,851 checks; v22: 8 mode/frequency combinations / 122 checks.
- Commands: node tests/v21-regression.cjs; node tests/v22-regression.cjs.
- v22 coverage includes all 4 payout frequencies × both loan modes, RM0.01 rounding, default and boundary values, invalid inputs preserving the original amount, updated summary/chart/table/CSV, Reset, tooltip handlers and responsive CSS.
- Verification limit: tests use Node VM DOM stubs; actual browser layout, native keyboard/touch interactions, and browser CSV download were not independently exercised.
- Existing Site reused: appgprj_6ad0f21a67c88191ba4abfa0761bc3c0; owner-only custom access preserved.
- Sites source commit: e6afe3df5f8a5df0bae79734935182936047e0ed.
- Saved version: appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_af4aa1f95814819195c6771c2c3693e1.
- Deployment: appgdep_6ad2236be1848191b19694d39e4cf73a; terminal status succeeded, failure message null; published 2026-10-16 21:15:44 MYT.
- Live URL: https://loan-investment-calculator.savoryboar128.chatgpt.site
- Release status: **Released**. The browser verification limit above is recorded separately from the successful regression and deployment results.

## v2.1 historical status
| Area | Result | Evidence |
| --- | --- | --- |
| Source baseline | Latest main read before changes | aa54fa0eea6596e6a2ebedc9d3cf2c3b872a3981 |
| Application fixes | Committed to main | 126199a38ed894a7d21199f8f0172f6d808e56b8 |
| Source commit including regression script | fa20f985fea4b934a215025556aa6f8e984a1dcf | tests/v21-regression.cjs |
| Automated regression | PASS: 256 scenarios, 77,849 assertions | Node VM execution with DOM stubs, 2026-10-16 |
| Browser / mobile acceptance | NOT VERIFIED | Required control-browser skill unavailable in this managed environment; no browser or touch simulation performed |
| Sites source synchronization | Prepared and pushed to existing Site source repository | Sites source commit bda9857bd7cd071977113bb87a41e07365ffb817 |
| v2.1 production deployment | SUCCEEDED, 2026-10-16 17:41:43 MYT | Native Sites save/deploy returned terminal succeeded |
| Live Site | v2.1 deployed to existing Site | https://loan-investment-calculator.savoryboar128.chatgpt.site |

## Changes
- Monthly net cash flow chart card and Compare selector confirmed absent; monthly cash flow data retained.
- Reducing Balance and Flat Rate remain selectable; result engine constrained to these two modes.
- Reject empty loan and investment return rates instead of silently converting them to zero.
- Use log1p/expm1 for numerically stable amortization at very small nonzero rates.
- All 11 displayed monthly headers retain Chinese and English formula descriptions.
- Explain zero-rate payment, rate units, flat interest calculation, cent rounding and final adjustment.
- Increase formula button target to 32px and move popover outside the scrolling table, fixed within viewport.
- Associate open formula text using aria-describedby; clear association when closed.

## Test results and limits
Run from repository root: `node tests/v21-regression.cjs`.
- Tested both loan modes across tenures 1, 2, 60, 420; annual loan rates 0, 0.00000001, 4, 25%; payout periods 1, 3, 6, 12.
- Verified principal conservation, final zero loan balance, payment/interest/principal identity, payout timing, cumulative cash, retained cash and net asset identities.
- Default payment verified: reducing RM1,841.65; flat RM2,000.00.
- Invalid amount, term, blank/negative rate, excess investment and unsupported payout frequency rejected.
- CSV verified in both modes/languages: 60 rows, 11 columns, closing balance zero.
- Reset handler verified to restore default values; all 11 formula entries checked in both languages.
- Static inspection confirmed mobile CSS, scrollable table and viewport-contained tooltip rules.
- DOM stubs do not prove real browser rendering, native keyboard activation, tooltip closing interactions, touchscreen use, CSV download integration, refresh behavior or responsive layout. These remain acceptance items.

## Verified deployment
- Application version: v2.1.
- GitHub application source commit: 1c7e2bedb5ff6c843aec51ca69c7b83a8d3b158c (application blob db7f1cdfb9b7e755c436a653f88d1b3960de65b3 on main).
- GitHub source including tests: fa20f985fea4b934a215025556aa6f8e984a1dcf.
- Sites source commit: bda9857bd7cd071977113bb87a41e07365ffb817.
- Saved version: appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_8da1f8eabe708191aa6b6ec54d68ce3b.
- Deployment: appgdep_6ad1f20d2a508191bceb0a0ec2a5104f.
- Terminal status: succeeded; failure_message: null.
- Verified at: 2026-10-16 17:41:43 MYT (09:41:43 UTC), native Sites deployment response.
- URL: https://loan-investment-calculator.savoryboar128.chatgpt.site
- Existing Site reused; owner-only audience preserved; PocketBay #3128 was later reported deleted by the user on 2026-11-05; no independent verification.
- Deployment success verifies publication, not browser/mobile acceptance. The outstanding browser checks below remain unverified.

## PocketBay retirement request — 2026-10-16
- User explicitly requested deletion of PocketBay app #3128 (loan-calculator), with PRD/GitHub updates.
- PocketBay deletion: **USER-CONFIRMED DELETED (2026-11-05); NOT INDEPENDENTLY VERIFIED**. The available tools did not provide PocketBay account application deletion.
- User later confirmed deletion on 2026-11-05. No independent account-side verification was available.
- GitHub application source and ChatGPT Sites must remain untouched.

## v2.2 requirement baseline — One-click Optimize Investment (2026-10-16)
- User confirmed a simple formula, superseding the earlier proposed whole-tenure optimization search.
- Optimized investment = loan amount − (payout frequency in months − 1) × current loan-mode monthly payment, rounded to RM0.01.
- Default example: RM100,000 − 5 × RM1,841.65 = RM90,791.75.
- One button by investment amount; valid result fills the existing input and recalculates. Invalid/nonpositive result leaves existing input untouched and displays a concise error.
- Formula reserves cash only before the **first** payout. It does **not** guarantee nonnegative cash throughout the full tenure or minimize losses; retain deficit visibility.
- This planning note is superseded by the v2.2 release record above.

## Next action
- No deployment action is pending. Browser/device acceptance can be recorded separately if performed later.

## Change log (append-only)
| Date/time | Change | Result | Commit / PR / deployment | Evidence source |
| --- | --- | --- | --- | --- |
| 2026-10-15 | v2.0 deployed to PocketBay #3128 | User reported | Deployment identifier unknown | User reported |
| 2026-10-16 | v2.1 UI changes and documentation | Committed to main; browser test pending | b427e7d9f466599bd51ec8f1051b18d323d12e5d; docs commits | GitHub verified |

| 2026-10-16 | v2.1 numeric/validation/tooltip fixes, regression tests and existing Sites source preparation | Automated PASS; browser acceptance pending; v2.1 not deployed | fa20f985fea4b934a215025556aa6f8e984a1dcf; Sites source bda9857bd7cd071977113bb87a41e07365ffb817 | GitHub, Node VM, Sites source helper |

| 2026-10-16 17:41:43 MYT | User requested website update; published prepared v2.1 to existing Site | Sites deployment succeeded; browser/mobile acceptance remains unverified | appgdep_6ad1f20d2a508191bceb0a0ec2a5104f | Native Sites deployment result |

## Hover Tooltip revision — 2026-10-16 17:41 MYT
- Requested reference: https://ui.shadcn.com/docs/components/base/tooltip
- Vanilla HTML implementation of shadcn-style dark anchored Tooltip; no React/shadcn runtime dependency introduced.
- Mouse hover (200ms delay), keyboard focus, Escape, blur and scroll dismissal; touch pointer tap fallback. Content remains Chinese/English and formula calculations unchanged.
- Popover is portalled to body and positioned near its trigger with horizontal viewport clamping and top/bottom choice; reduced-motion respected.
- Re-ran Node regression: PASS 256 scenarios / 77,849 assertions; changed static expectation for anchored positioning. Actual browser hover/focus/touch and responsive visual acceptance remain unverified.
- Application commit: 126199a38ed894a7d21199f8f0172f6d808e56b8; test commit: 65a1a83f0335d63fd40832676d0b1d6f3cabf41f. PRD and shaping updated.
- Deployment succeeded natively: appgdep_6ad1f20d2a508191bceb0a0ec2a5104f; source bda9857bd7cd071977113bb87a41e07365ffb817; saved version appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_8da1f8eabe708191aa6b6ec54d68ce3b.

## Latest revision — label hover, no i icons
- Updated: 2026-10-16 17:45:05 MYT.
- All 11 monthly headers now use the label itself as hover/focus/touch trigger; i icons removed.
- Application source: f17662306cfff9dd9419f02a4248c6934a166c15; main branch only.
- Regression PASS: 256 scenarios / 77,851 assertions (Node VM; actual browser/mobile visual and input acceptance remains unverified).
- Existing Sites deployment: succeeded; ID appgdep_6ad1f20d2a508191bceb0a0ec2a5104f; saved version appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_8da1f8eabe708191aa6b6ec54d68ce3b; source bda9857bd7cd071977113bb87a41e07365ffb817.
- URL: https://loan-investment-calculator.savoryboar128.chatgpt.site
- PRD and shaping synchronized; PocketBay #3128 was later reported deleted by the user on 2026-11-05; no independent verification.

## Case closure — 2026-10-16 17:49 MYT
- User confirmation: “ok 我测试完成，close case”.
- Acceptance: user-reported testing completed; release accepted and case closed. Individual device/browser and test-case details were not supplied; no agent browser test is claimed.
- Final behavior: hover monthly header labels to display bilingual formula tooltips; no i icons.
- Deployment remains the verified successful label-hover release: appgdep_6ad1f20d2a508191bceb0a0ec2a5104f.
- Sites source commit: bda9857bd7cd071977113bb87a41e07365ffb817; GitHub application commit: f17662306cfff9dd9419f02a4248c6934a166c15.
- Website: https://loan-investment-calculator.savoryboar128.chatgpt.site
- Earlier unverified browser/mobile notes describe the agent's historical verification limits; no further acceptance action is pending following user sign-off.
- No application changes or redeployment performed for closure. PocketBay #3128 unchanged.

| 2026-10-16 | User requested permanent removal of PocketBay #3128 and documentation sync | GitHub documentation updated; deletion pending (no PocketBay delete tool) | No deletion confirmation | User authorization / GitHub verified |

| 2026-10-16 21:15 MYT | v2.2 one-click optimization released | Regression PASS; existing Sites deployment succeeded; owner-only access preserved | Sites source e6afe3df5f8a5df0bae79734935182936047e0ed; deployment appgdep_6ad2236be1848191b19694d39e4cf73a | GitHub fae87acf2dc7ab8f88e306d35d18772731f7c052, Node regression outputs, native Sites response |

## v2.2 UI enhancement implementation — 2026-10-16 21:38 MYT
- User confirmed three changes: (1) make existing Optimize button visually distinct with an accent color; (2) add Available Cash as fourth series to Assets & Cash Flow trend using the monthly table values, including negatives; (3) add per-month hover/touch tooltips for all four series showing month, series label and RM amount.
- PRD FR-14/FR-15/FR-16; acceptance AC-21 through AC-24; shaping, module plan and append log synchronized.
- Implemented FR-14/AC-21: Optimize uses the blue accent with hover, focus-visible, disabled and readable text states; the existing optimization formula remains unchanged.
- Implemented FR-15/AC-22: trend chart draws investment principal, remaining loan, cumulative net cash flow and available cash. The fourth series reads each monthly row's `availableCash`, includes negative values in the axis scale, and uses a distinct purple line with bilingual legend.
- Implemented FR-16/AC-23–AC-24: desktop pointer hover and mobile touch tap show each month's series, localized month label and signed RM value to two decimals. Chart keyboard focus/arrow navigation is wired and tooltip stays within chart bounds.
- Automated regression PASS: `node tests/v21-regression.cjs` — 256 scenarios / 77,854 checks; `node tests/v22-regression.cjs` — 8 mode/frequency combinations / 1,327 checks; `node tests/v23-regression.cjs` — 8 mode/language/amount combinations / 11,566 checks, validating 1,920 chart points against monthly schedule rows, negative cash, bilingual tooltip labels and interaction states.
- JavaScript syntax check passed. Tests use Node VM DOM/Canvas stubs; real browser layout, mouse, keyboard and touch acceptance were not exercised.
- GitHub application commits on main: 4118714f9b16d4dc33c9d103b6d1ecc56a783f9f; final Tooltip recalculation fix c0876b8e95668b37c5bf1de92bd23757f2769560. Test commits: e9148a5fe4c62e711dd5617626f947c55c06baa2, 724f7e2a088f960714f3d0d89ae2e26f5d06b427, 6b6953f429aa359b109fc3336d949c5df86e5210.
- Sites source commit: aea578bf0dde3fd753f2620dfffd4b5ab5426f9a.
- Sites saved version: appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_93f9bf730da08191b39f18af0851f152.
- Deployment ID: appgdep_6ad22823560c81919a6da962144d9cf4; terminal status **succeeded**, failure message null. Sites API `updated_at`: 2026-10-16T13:36:39Z (21:36:39 MYT).
- Live URL verified: https://loan-investment-calculator.savoryboar128.chatgpt.site. Site re-read after deployment: active, same URL, access_mode custom, owner-only allowlist unchanged, no additional viewers.
- Release status: **Released**. Automated tests passed. Actual browser/mobile layout, pointer/touch and browser CSV download were not independently exercised.

## v2.2 UI enhancement release — FR-14 to FR-17 (2026-10-16)
- Existing GitHub `main` request baseline: `78787d37056d54b2a922c2d5f4e5fc05e47e2b5c`.
- FR-14 preserves the existing optimization formula and styles Optimize with accent, hover, focus-visible and disabled states.
- FR-15/FR-16 preserve three existing chart series, add Available Cash from each monthly schedule row, and keep bilingual per-month mouse/touch tooltips for all four series.
- FR-17 adds a neutral gray dashed RM0 reference with an RM0 label. The Y-axis includes zero for positive-only, negative-only and mixed data. The reference is not a data series and has no tooltip.
- Existing Site reused: `appgprj_6ad0f21a67c88191ba4abfa0761bc3c0`; URL and owner-only allowlist were rechecked after deployment and remained unchanged.
- GitHub implementation commit SHA: `ddb6142f7143104f6b099da2c142a56be081ecfd` (direct update to `main`; final handoff documentation follow-up follows this implementation commit).
- Sites source commit: `37d2b7f2f7fd8286098421f52690b91c24a8dafa`.
- Sites saved version: `appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_c156d25c9c90819185ffd92bb5ecae4d`.
- Sites deployment ID: `appgdep_6ad22fbfbcc08191961c3aeea718b523`; status **succeeded**, failure message null; deployment timestamp `2026-10-16T14:08:20Z` (22:08:20 MYT).
- Automated tests: PASS — `node tests/v21-regression.cjs` (256 scenarios / 77,854 checks), `node tests/v22-regression.cjs` (8 optimizer and interaction scenarios / 1,097 checks), `node tests/v23-regression.cjs` (8 mode/language/amount scenarios / 11,566 checks), `node tests/v24-regression.cjs` (3 axis cases / 28 checks). Total: 90,545 checks.
- Regression checks cover loan formulas, Optimize, four trend-series values, signed bilingual tooltips, RM0 position/label/dash, CSV, Reset, responsive CSS and pointer/touch handlers.
- Production verification: Sites returned terminal `succeeded` for the existing live URL; Site reread confirmed active status, version 7, same URL, custom owner-only access, no additional viewers. Live browser/mobile pixel rendering and physical touch were not independently exercised.
- Release status: **Released**. The pre-existing project status referred to the earlier FR-14–FR-16 release; this entry records the subsequent RM0 release.

## New requirement: FR-18 Light/Dark theme (2026-10-17)
- User requested top-right sun icon for Light Mode and moon icon for Dark Mode. Theme applies throughout the page, including Canvas chart, all four trend series, RM0 baseline, tooltips, form, cards and monthly table.
- PRD acceptance AC-26 through AC-28. Current spec uses default Light Mode, in-session switching only (no persistence); Reset keeps theme and refresh returns Light. Theme changes must not alter financial inputs, results, language or CSV.
- **Requirements documentation updated only; implementation, regression and Sites deployment not performed for FR-18.** Keep prior release evidence intact.

## FR-18 implementation — 2026-10-17 (MYT)
- Requirement baseline: GitHub main `70bf5cfe2d541ef2e9b86694f6dee75bd44df29a`.
- Implemented bilingual top-right sun/moon native buttons, selected aria-pressed state and 44px targets. CSS covers inputs, cards, buttons, summaries, validation, both Tooltip types and monthly table. Canvas repaints four distinct series, axes, legend and dashed RM0 for the chosen theme.
- Theme is separate from financial state. Switching preserves inputs, language, results, CSV and visible Tooltip; Reset retains theme; document reload starts light. Invalid input cannot revive old chart data on theme switch. Loan/optimization/CSV formulas unchanged.
- Automated PASS: v21 77,854; v22 1,097; v23 11,566; v24 28; new v25-theme 369. Total 90,914 checks. Existing test DOM stubs extended only with native setAttribute support.
- AC-26/27/28 browser acceptance: local IAB real browser at 1440x1000 and 390x844; visible sun/moon, selected state, Enter/Space activation, mouse clicks, bilingual names, no 390px page overflow, light/dark chart/RM0/Tooltip/table appearance, input/summary/table preservation, Reset retains dark and reload restores light verified. No browser console errors observed. CSV byte equality checked across both modes/languages and two investment amounts by automated VM; physical phone touch and native browser CSV download not independently exercised.
- GitHub main implementation commit and deployment evidence will be appended after publication. No new branch, Site or audience change.

## FR-18 final release evidence — 2026-10-17 14:41 MYT
- Release status: **Released**. Direct GitHub main implementation commit (final application/test source): `8ed001a83cb406ef8486a46e3ad6b31dfb40d0d9`; verified by fetching origin/main after publication. This documentation-only follow-up records deployment evidence; it changes no application source. The containing commit is the final handoff documentation commit and is discoverable from this file's GitHub history.
- Sites source commit: `520f776dc999b37f3a115b506652d581d0aad485`. Its dist/index.html is byte-identical to GitHub development/index.html. Existing .openai/hosting.json retained unchanged.
- Saved version 8: `appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_003f75f703888191a7e23ff4edbea9fc`.
- Sites Deployment ID: `appgdep_6ad3185b875c819196fa20bdc3155bd9`; terminal **succeeded**, failure_message null; published `2026-10-17T06:40:47.595347Z` (14:40:47 MYT).
- Existing URL: https://loan-investment-calculator.savoryboar128.chatgpt.site . Site reread: active, latest version 8, same URL, custom owner-only allowlist, revision 1, no additional viewers. No new Site, branch or access changes.
- Final tests: PASS — v21 77,854; v22 1,097; v23 11,566; v24 28; v25-theme 369 = **90,914 checks**. All five scripts reran successfully as publication preparation.
- Actual verification: local real-browser checks at desktop 1440x1000 and phone viewport 390x844 confirmed keyboard Enter/Space, mouse activation, selected state, both themes, Chinese/English, responsive page without horizontal overflow, chart/RM0/Tooltip/table appearance, data preservation, Reset/theme behavior and refresh/light behavior. CSV byte equality verified automatically in both modes/languages with two investment values. No console errors observed.
- Production browser visit resolves to the expected ChatGPT sign-in page. Authenticated production UI interactions are **NOT independently verified**; native Sites terminal deployment and subsequent get_site confirm publication. No access restrictions were removed. Physical phone touchscreen and native browser CSV downloads are **NOT independently verified**.
- Evidence screenshot: local IAB dark-theme desktop preview retained with this chat's outputs. Earlier pending FR-18 notes are historical and superseded by this release entry.

## FR-19 开始实施 — 2026-10-24
- 已核实指定六个文件，main 基线 133eb96；FR-19 / AC-29–AC-32 需求已更新。
- 现有 Site version 8、URL 及 custom owner-only revision 1 已核实；不新建 Site，不执行含义未明的“比赛”。
- 实施、测试与部署结果将在最终证据追加。

## FR-19 验收结果 — 2026-10-24
- main 基线：133eb966295ac627be8601b4504f759cdd008132；指定六个文件均已核实并同步需求。
- 最小应用变更：保留原输入节点和计算管线，统一原生模态 dialog、左侧布局、三种关闭方式、显式 Tab/Shift+Tab 循环、关闭焦点返回、背景隔离及滚动锁定。手机预留 24px 遮罩点击区。
- 自动回归：v21 77,854；v22 1,097；v23 11,566；v24 28；v25-theme 369；v26-drawer 45；共 90,959 项检查通过。v26 比较旧 main 与新代码，16 种贷款方式/语言/派息周期组合的逐月数据和 CSV 字节完全相同。
- 真实本地 IAB：1440×1000 和 390×844，中英文 × Light/Dark 共八组合均通过：三个区块、默认关闭、打开、Esc 关闭、焦点进入/返回、背景滚动锁定、无页面水平溢出。
- 另验证关闭按钮、桌面及手机遮罩、Tab/Shift+Tab 循环、面板内部滚动、修改即时计算、输入保留、优化 90,791.75、贷款方式切换、图表箭头键 Tooltip、表头公式 Tooltip、手机表格横滚、Reset 保留主题及开关、刷新恢复默认及关闭。未观察到控制台错误/警告。
- 验证限制：手机使用浏览器尺寸模拟，实体手机触屏和原生浏览器 CSV 下载未独立验证；CSV 数据通过自动回归。生产认证后的界面验证与部署成功分别记录。
- 截图及浏览器矩阵将在 docs/evidence/fr19-drawer 保存。真实 GitHub commit 与 Sites deployment 待发布后追加。

## FR-19 最终发布证据 — 2026-10-24 11:33 MYT
- 状态：**Released**；统一左侧 Drawer 在桌面和手机默认关闭，主页面优先显示结果。
- GitHub main 应用/需求/测试 commit：d24e3b20d76af54d332dc039dfeae39624ef87c5。通过连接工具直接提交 main，未创建分支；已 fetch origin/main 并确认文件树 563b442137c67d5f8390874d08467ffde93051ac 与本地已测试提交完全一致。未声称 GitHub CI 运行，本次使用本地回归。
- Sites source commit：8216c809b12501bbfddf060eb75931532719e6c8。dist/index.html 与 GitHub development/index.html 字节一致（blob dda8417bfde1541b74e0ea49872aa51bc31588dc）；原 .openai/hosting.json 未改。
- Sites version 9：appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_f03a2fe22aa88191aced7427bd1157c6。
- Deployment ID：appgdep_6adc26faf4948191a7c69d91f8bd89fc；terminal **succeeded**，failure_message null；updated_at 2026-10-24T03:33:33.227168+00:00（11:33:33 MYT）。
- URL：https://loan-investment-calculator.savoryboar128.chatgpt.site；仍为原 Site appgprj_6ad0f21a67c88191ba4abfa0761bc3c0，没有新建 Site。
- 部署后 get_site：active、version 9、相同 URL；access_policy 与部署前完全一致（custom、仅 owner、revision 1、0 external visitors、无 editors/groups）。env_set_revision 0。
- 自动回归共 90,959 项通过；真实本地浏览器八组合及额外交互通过，详见上节和 docs/evidence/fr19-drawer。实体手机触屏及原生浏览器下载未独立验证；生产发布由原生 Sites 成功响应核实，未声称认证后生产 UI 验收。
- 自动审批曾因把历史 Sites opening source SHA 误认为待部署版本而拒绝打包；检查 helper 确认 saveSource 会创建/推送/核实新提交后，原流程重试获准。最终仅部署上述新 Site source commit。
- 本次文件仅记录发布证据，不改变已部署应用；该文档最终 commit 可从本文件 GitHub 历史查得。

## FR-19 位置修订 — 2026-10-24
- 参数设置按钮移至恢复默认值右边；Drawer 从右侧打开，左侧遮罩关闭。更新 PRD/定型稿/模块/日志，取代此前位置定义。
- 自动回归 90,959 项通过；真实浏览器 1440×1000 / 390×844 × 中英文 × Light/Dark 八组合验证按钮相邻且同排、默认关闭、面板贴右、左侧遮罩关闭和焦点返回，无页面水平溢出；另验证 Esc。
- 本次仅调整 HTML 位置及三处 CSS；实体手机触屏未独立验证。GitHub/Sites 真正发布标识待部署后追加。

### 右侧 Drawer 发布完成 — 2026-10-24 11:49 MYT
- GitHub main implementation commit: 5d92848f1045caa3f30e392c0808a75aaf8c5527；远端 main 与本地测试内容逐字相同。
- Sites source commit: f93ca215f817b4268bc031eb6f45040e2cc7b95b；dist/index.html 与 GitHub development/index.html 字节一致，hosting 配置未改。
- Version 10: appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_d8f848817ef0819191e80216c4ba2859。
- Deployment: appgdep_6adc2abe30c08191b8fc2b0c79dcc31d；succeeded，failure_message null；2026-10-24T03:49:36.160491+00:00。
- URL: https://loan-investment-calculator.savoryboar128.chatgpt.site；部署后 active、version 10，owner-only access_policy 与部署前完全相同（revision 1），没有新建 Site。
- 自动回归 90,959 项及八组合本地浏览器验收通过。截图/矩阵保存在本聊天 outputs/right-drawer-*；物理触控与生产认证后 UI 未独立验证。本次是 HTML/CSS 位置调整，原计算/CSV/Tooltip 未改。


## 2026-11-05 Production release verification
- PASS: production page loads, settings drawer starts closed, its trigger is beside Reset, opening places focus on Close, and Escape closes the drawer.
- PASS: language switches between Chinese and English. Dark theme shows four trend series and the RM0 baseline.
- PASS: Optimize recalculates the default investment amount to RM90,791.75.
- NOT VERIFIED: close-button dismissal, backdrop dismissal, full focus loop and return, trend-tooltip details, Flat Rate mode, mobile viewport behavior, and downloaded CSV contents. Clicking Export CSV did not produce a verifiable download artifact in the browser session.
- Physical touchscreen was not tested. No application changes or deployment were made. Verification was performed on the existing production Site URL.


### 2026-11-05 production verification follow-up
- PASS: production Flat Rate selection; displayed monthly payment RM2,000.00 and total interest RM20,000.00 under the current inputs.
- PASS: Drawer close button and dimmed backdrop both close the open drawer. Closing returns focus to the settings trigger. Escape dismissal was also verified.
- PASS: keyboard focus on the trend chart reveals an actual tooltip for month 1 (investment principal RM100,000.00). Chart accessibility text and legend identify four trend series; the dark-theme view showed the four series and dashed RM0 reference.
- PASS: browser viewport simulator at 390×844 retained the calculator summary, trend chart and monthly breakdown. This is a simulated viewport check, not a physical mobile device or touchscreen check.
- NOT VERIFIED: full Tab/Shift+Tab focus loop; tooltip values for all four series/months and pointer hover/touch behavior; a browser-generated CSV file and its downloaded contents. Export CSV control and all 60 monthly rows/12 columns are present in the production page, but the session exposed no download artifact to inspect. The page's responsive table region is present; horizontal-scroll behavior was not physically exercised.
- Scope/source baseline: production URL only, existing Site ID appgprj_6ad0f21a67c88191ba4abfa0761bc3c0. GitHub main docs, PRD and development/index.html were read; source declares v2.2 and contains the expected Drawer, chart, CSV and calculation handlers. Source inspection is not used as production PASS evidence.
- No code changes, Site creation, or deployment performed. Temporary viewport override was reset. PocketBay deletion was later confirmed by the user on 2026-11-05; not independently verified.


## 2026-11-05 Production Final QA (MYT)

**Production Verification: Partial.** This entry covers the three remaining checks on the existing [production Site](https://loan-investment-calculator.savoryboar128.chatgpt.site/) using the authenticated ChatGPT in-app desktop browser. Earlier verification records are retained.

### CSV download — PASS

- Captured four browser download events and read the resulting files from Downloads. Default 60-month inputs were used with Reducing Balance and Flat Rate in both Simplified Chinese and English. Each file has one header and 60 sequential month rows (1–60), with 11 columns on every line. The full 60 data rows match byte-for-byte across languages for each mode. All 600 amount cells per mode use two decimals and preserve negative signs.
- Chinese header: `月份,月供,利息,已还本金,剩余贷款,投资派息,投资本金,月度净现金流,累计净现金流,可用现金,净资产`
- English header: `Month,Monthly payment,Interest,Principal paid,Remaining loan,Investment payout,Investment principal,Monthly net cash flow,Cumulative net cash flow,Available cash,Net asset`
- Reducing Balance months 1/30/60: remaining loan RM98,491.68 / RM52,493.87 / RM0.00, available cash −RM1,841.65 / −RM40,249.50 / −RM80,499.17. Flat Rate: remaining loan RM98,333.33 / RM49,999.90 / RM0.00, available cash −RM2,000.00 / −RM45,000.00 / −RM90,000.00.

| Mode | Language | Downloaded filename | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| Reducing Balance | ZH | 贷款投资计算器-2026-11-05.csv | 5405 | `d063b2436f2db959be11243fb3918b7231c694d2b5a35fd9cc30c19f1a29870c` |
| Flat Rate | ZH | 贷款投资计算器-2026-11-05 (1).csv | 5403 | `3b541f7bfa6353b6ee4b2302536f7b659944641023123cb2d66b3fc98e0ab931` |
| Flat Rate | EN | loan-investment-calculator-2026-11-05.csv | 5441 | `9a0342589a13b8058c6b975058191a28bf6b40bfe1aeee5ec47aa9e4ae5d1c6e` |
| Reducing Balance | EN | loan-investment-calculator-2026-11-05 (1).csv | 5443 | `8974ed16154e33ba12353b2f8add027fc54f8178022d2f27836add8aeca1af94` |

### Four trend-series tooltips — FAIL for full keyboard coverage

- **Mouse PASS.** Use Reducing Balance, English, and set investment to RM90,000 to separate the two cash curves. Position the mouse over each plotted line. The production Tooltip matched Monthly Breakdown: month 29 investment principal RM90,000.00, remaining loan RM54,155.00, and available cash −RM32,607.85. Month 57 cumulative cash flow was −RM80,674.05 and available cash was −RM70,674.05. Moving outside the chart hid the Tooltip.
- **Keyboard month navigation and Escape PASS.** Left/Right moved between months 5 and 6 and Escape hid the Tooltip.
- **Keyboard series selection FAIL for this QA scope.** Reproduce by opening the production chart, setting investment to RM90,000 as above, focusing the chart and pressing Right, Down, Up, then Left. Right and Left change the month, but the tooltip always displays Investment principal. Down and Up leave the displayed series unchanged. Expected for full keyboard coverage: a keyboard path to inspect remaining loan, cumulative cash flow and available cash as well. No repair performed.
- **Touch NOT VERIFIED.** This desktop session exposed mouse and keyboard input. A touch-capable session or physical touchscreen is needed to verify taps.

### Right-side Drawer — PASS

- Opening Settings moved focus to Close. Shift+Tab wrapped from Close to Flat Rate, and Tab wrapped back to Close. A full forward pass visited amount, tenure, loan rate, investment, Optimize, return rate, payout frequency and both loan-mode buttons before wrapping. Focus stayed in the modal.
- Escape, the Close button and a backdrop click each dismissed the Drawer and returned focus to the Settings trigger. With the Drawer open, the left backdrop intercepted a point outside the panel and wheel scrolling on it left background scroll at 0. The panel's right edge matched the 922 px viewport edge.

Open items: keyboard access to the other three trend series and touch Tooltip verification. This QA changed only this status document. The production Site, application code, deployment and PocketBay were outside the write scope.


## 2026-11-05 Trend Tooltip keyboard fix — production follow-up (MYT)

**Production Verification: Partial.** Keyboard coverage now passes in production. Touch Tooltip verification remains open. The earlier CSV and Drawer PASS records remain the evidence for those checks.

- Deployed Site version 11 at 14:30:11 MYT. Sites source commit `cb7f51c4b649aa594eaa58465acc35084f3105a6`, saved version `appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_3bf32545f8488191b40619c7eff78247`, deployment `appgdep_6aec2254ed448191bf7a6e251c96e49c` returned terminal `succeeded`. The tracked hosting manifest and the owner-only access policy were verified unchanged.
- Current production URL: https://loan-investment-calculator.jaron-hoh.chatgpt.site. The previous savoryboar128 URL redirected to the current URL and loaded the calculator in the authenticated session. An initial 404 cleared on retry.
- **Keyboard PASS (production, Chinese and English).** Tab from Settings focused the chart. Left/Right changed months, Up/Down cycled all four series in both directions, and Escape hid the Tooltip. With investment RM90,000, observed month 1 investment principal RM90,000.00, remaining loan RM98,491.68, and cumulative cash flow −RM1,841.65. Month 2 cumulative cash flow was −RM3,683.30 and available cash RM6,316.70. The chart exposed localized keyboard instructions.
- **Touch NOT VERIFIED.** The authenticated desktop in-app browser exposed mouse and keyboard input. Remaining check: use a touch-capable browser or phone to tap all four series across different months and confirm signed values.
- This GitHub commit records release and QA evidence. The published application change is in the Sites source commit above.


## 2026-11-05 Production verification closure (MYT)

**Production Verification Completed.** The user confirmed that touch interaction on the trend chart passed. Touch is recorded as **PASS (user-confirmed)**, completing the outstanding item in the previous entry. The confirmation did not include device details or a point-by-point log.

The existing production Site, version 11, is accepted. Final coverage includes the four actual CSV downloads, the right-side Drawer, and trend Tooltip mouse, keyboard, and touch interaction. This closure updates the QA record only.


# Project Closure Summary — 2026-11-05 MYT

| Item | Final Status |
|---|---|
| Development | Completed |
| FR-13 – FR-19 | Completed |
| Automated Regression | Passed (90,959 checks recorded for FR-19 release) |
| Production QA | Passed |
| CSV Download | Passed |
| Drawer Accessibility | Passed |
| Chart Mouse Tooltip | Passed |
| Chart Keyboard Tooltip | Passed |
| Chart Touch Tooltip | Passed (User Confirmed; no device log supplied) |
| ChatGPT Sites Deployment | Version 11 |
| Project Closure | Completed |
| Project Lifecycle | Maintenance Mode |

## Release Information
- GitHub repository: jaronhoh/loan-calculator; formal source branch: main.
- Application version: v2.2.
- Production platform: ChatGPT Sites; existing Site reused.
- Production URL: https://loan-investment-calculator.jaron-hoh.chatgpt.site (the earlier savoryboar128 URL redirects to this URL).
- Sites Version 11 deployment: 2026-11-05 14:30:11 MYT; source commit cb7f51c4b649aa594eaa58465acc35084f3105a6; saved version appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_3bf32545f8488191b40619c7eff78247; deployment appgdep_6aec2254ed448191bf7a6e251c96e49c (succeeded).
- Production QA date: 2026-11-05 MYT. CSV, right-side Drawer, and chart mouse/keyboard Tooltip passed in recorded production checks. Touch Tooltip is marked Passed solely from user confirmation; device details and a point-by-point log were not supplied.
- Project closure date: 2026-11-05 MYT.
- Historical deployment/source identifiers, regression records, test limits, and chronological QA entries below are retained.

## Outstanding Items
- Development: none for the completed v2.2 scope.
- QA: none for closure criteria; touch PASS is user-confirmed without an independent device log.
- Documentation: restored this file after its accidental deletion.
- Legacy System Cleanup: PocketBay #3128: user-confirmed deleted on 2026-11-05; not independently verified. This was a Legacy System Cleanup item, separate from application defects.

## Maintenance Rules
- Confirm requirements before starting new features.
- Assess effects on existing behavior before changes.
- Run necessary regression tests after changes.
- Keep GitHub main as the formal source branch.
- Update the existing ChatGPT Site only after verification.
- Prefer updating the existing Site; do not create another Site.
- Preserve the current URL, data, configuration, and access permissions.

## Status-file recovery note
This was not merely a connector read issue: commit bf7c3941446fad6dc63b613f16d3a03f310bdfd8 deletes all 300 lines. Its parent retained the full record, including the 2026-11-05 QA evidence. This update restores that history and adds the closure summary.


## PocketBay cleanup update — 2026-11-05
The user confirmed that legacy PocketBay app #3128 has been deleted. This is recorded as user-confirmed; the deletion was not independently verified through PocketBay account access.
