# Loan Investment Calculator — Project Status & Handoff

> Single source of truth for cross-conversation handoff.
> Last updated: 2026-10-16 21:16 (Malaysia, UTC+08:00)
> Case status: v2.2 RELEASED — code committed, regression tests passed, and the existing ChatGPT Site deployment succeeded.

## Project identity
- Repository: jaronhoh/loan-calculator
- Branch: main (no additional GitHub branch created)
- Application: development/index.html
- Production version: v2.2 (Released 2026-10-16); development version: v2.2
- Existing PocketBay app #3128: user explicitly authorized permanent deletion on 2026-10-16; deletion NOT executed or verified (no PocketBay delete integration available).
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
- Existing Site reused; owner-only audience preserved; PocketBay #3128 untouched.
- Deployment success verifies publication, not browser/mobile acceptance. The outstanding browser checks below remain unverified.

## PocketBay retirement request — 2026-10-16
- User explicitly requested deletion of PocketBay app #3128 (loan-calculator), with PRD/GitHub updates.
- PocketBay deletion: **NOT EXECUTED / NOT VERIFIED**. Available tools do not provide PocketBay account application deletion; do not confuse this with uninstalling a ChatGPT plugin.
- Required owner action: delete app #3128 from the PocketBay account interface, verify it is absent, then record confirmed deletion here.
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
- PRD and shaping synchronized; PocketBay #3128 untouched.

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
