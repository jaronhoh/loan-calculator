# Loan Investment Calculator — Project Status & Handoff

> Single source of truth for cross-conversation handoff.
> Last updated: 2026-10-16 (Malaysia, UTC+08:00)

## Project identity
- Repository: jaronhoh/loan-calculator
- Default branch: main
- Canonical status file: docs/PROJECT_STATUS.md
- Existing PocketBay app: #3128 (loan-calculator)
- ChatGPT Sites: creation/publication not verified

## Current status
| Area | Status | Evidence | Updated |
| --- | --- | --- | --- |
| Requirements / PRD | v2.1 UI scope updated | prd/PRD文档.md; shaping/06-最终定型稿.md | 2026-10-16 |
| Development | v2.1 UI committed to main | b427e7d9f466599bd51ec8f1051b18d323d12e5d | 2026-10-16 |
| Automated tests | Not verified for v2.1 | No test run evidence | 2026-10-16 |
| PR / merge | Direct main commits | GitHub connector | 2026-10-16 |
| PocketBay production deployment | Previous version deployed (User reported); v2.1 not deployed | User report, no deploy log | 2026-10-16 |
| ChatGPT Sites | Not verified | No Sites management evidence | 2026-10-16 |

## Latest release
- Version: v2.0 (previously deployed, user reported)
- Source commit: Not verified against live PocketBay deployment
- Release date/time and timezone: Unknown
- Deployment status: User reported deployed
- Production URL: Unknown
- Scope of changes: v2.0 calculator
- Test summary: Prior calculation regression checks documented in prd/追加日志.md; v2.1 not yet browser-tested
- Data / configuration / permissions verification: Not verified
- Evidence classification: User reported / Not verified

## Open work and blockers
| Priority | Item | Owner | Next action | Evidence |
| --- | --- | --- | --- | --- |
| High | v2.1 browser acceptance test | Work / developer | Verify both loan modes, tooltips, responsive table, CSV, and no JS errors | GitHub committed; test not verified |
| High | ChatGPT Sites implementation/publish | ChatGPT Work | Build/update Site from main/development/index.html and verify published Site | Not verified |
| Medium | PocketBay v2.1 redeploy | User / deployment agent | Only redeploy if user requests; preserve app #3128 | Existing deployment user reported |

## Handoff notes
- Important design decisions: Remove monthly net cash flow chart CARD only; retain calculations and monthly breakdown column. Remove Compare UI option; retain Reducing Balance and Flat Rate modes. Add formula `i` tooltip on every monthly table header, in zh/en.
- Constraints: Preserve calculation formulas, CSV data, default Simplified Chinese, existing PocketBay app #3128; no new GitHub branch.
- Relevant paths: development/index.html, prd/PRD文档.md, shaping/06-最终定型稿.md, prd/追加日志.md.
- Known risks: v2.1 implementation has not been verified in a live browser; no Sites deployment confirmation.
- Next recommended action: ChatGPT Work reads this file, tests UI, creates/updates Sites, and records real deployment evidence.

## Change log (append-only)
| Date/time | Change | Result | Commit / PR / deployment | Evidence source |
| --- | --- | --- | --- | --- |
| 2026-10-15 | v2.0 deployed to PocketBay #3128 | User reported | Deployment identifier unknown | User reported |
| 2026-10-16 | v2.1 UI changes and documentation | Committed to main; browser test pending | b427e7d9f466599bd51ec8f1051b18d323d12e5d; docs commits | GitHub verified |

## Next update
- Trigger: After v2.1 browser tests or ChatGPT Sites publication.
- Responsible party: ChatGPT Work / developer.
