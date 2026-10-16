# Loan Investment Calculator — Project Status & Handoff

> Single source of truth for cross-conversation handoff.
> Last updated: 2026-10-16 (Malaysia, UTC+08:00)

## Project identity
- Repository: jaronhoh/loan-calculator
- Branch: main (no additional GitHub branch created)
- Application: development/index.html
- Version: v2.1
- Existing PocketBay app #3128: untouched.
- Existing ChatGPT Site: appgprj_6ad0f21a67c88191ba4abfa0761bc3c0
- Site URL: https://loan-investment-calculator.savoryboar128.chatgpt.site
- Audience: existing owner-only custom access preserved.

## Current status
| Area | Result | Evidence |
| --- | --- | --- |
| Source baseline | Latest main read before changes | aa54fa0eea6596e6a2ebedc9d3cf2c3b872a3981 |
| Application fixes | Committed to main | 1c7e2bedb5ff6c843aec51ca69c7b83a8d3b158c |
| Source commit including regression script | fa20f985fea4b934a215025556aa6f8e984a1dcf | tests/v21-regression.cjs |
| Automated regression | PASS: 256 scenarios, 77,849 assertions | Node VM execution with DOM stubs, 2026-10-16 |
| Browser / mobile acceptance | NOT VERIFIED | Required control-browser skill unavailable in this managed environment; no browser or touch simulation performed |
| Sites source synchronization | Prepared and pushed to existing Site source repository | Sites source commit 5eebbd0eab862e4f36355c86e8d7f68e7bb6f41b |
| v2.1 production deployment | SUCCEEDED, 2026-10-16 17:35:55 MYT | Native Sites save/deploy returned terminal succeeded |
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
- GitHub application source commit: 1c7e2bedb5ff6c843aec51ca69c7b83a8d3b158c (unchanged application blob 027e969c5c0fa0caf4453bb5cebb3bb2b9b9dc49 on main).
- GitHub source including tests: fa20f985fea4b934a215025556aa6f8e984a1dcf.
- Sites source commit: 5eebbd0eab862e4f36355c86e8d7f68e7bb6f41b.
- Saved version: appgprj_6ad0f21a67c88191ba4abfa0761bc3c0~appgver_d57cb96d81988191ae5e36b4cbad1664.
- Deployment: appgdep_6ad1efe670a88191b5bb93414148b8a5.
- Terminal status: succeeded; failure_message: null.
- Verified at: 2026-10-16 17:35:55 MYT (09:35:55 UTC), native Sites deployment response.
- URL: https://loan-investment-calculator.savoryboar128.chatgpt.site
- Existing Site reused; owner-only audience preserved; PocketBay #3128 untouched.
- Deployment success verifies publication, not browser/mobile acceptance. The outstanding browser checks below remain unverified.

## Next action
1. Verify desktop and mobile layout, every tooltip in both languages, repeated click/outside click/Esc and Enter/Space in a supported real-browser environment.
2. Verify actual CSV download, refresh defaults and 420-month scrolling.
3. Record browser acceptance results without conflating them with deployment success.

## Change log (append-only)
| Date/time | Change | Result | Commit / PR / deployment | Evidence source |
| --- | --- | --- | --- | --- |
| 2026-10-15 | v2.0 deployed to PocketBay #3128 | User reported | Deployment identifier unknown | User reported |
| 2026-10-16 | v2.1 UI changes and documentation | Committed to main; browser test pending | b427e7d9f466599bd51ec8f1051b18d323d12e5d; docs commits | GitHub verified |

| 2026-10-16 | v2.1 numeric/validation/tooltip fixes, regression tests and existing Sites source preparation | Automated PASS; browser acceptance pending; v2.1 not deployed | fa20f985fea4b934a215025556aa6f8e984a1dcf; Sites source 5eebbd0eab862e4f36355c86e8d7f68e7bb6f41b | GitHub, Node VM, Sites source helper |

| 2026-10-16 17:35:55 MYT | User requested website update; published prepared v2.1 to existing Site | Sites deployment succeeded; browser/mobile acceptance remains unverified | appgdep_6ad1efe670a88191b5bb93414148b8a5 | Native Sites deployment result |
