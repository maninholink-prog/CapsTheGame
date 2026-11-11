# Maestria de Kuara Implementation Plan

> Inline implementation, already authorized by the author; use local C.A.P.S. architecture and preserve pre-existing work.

**Goal:** Add Kuara's approved 15-node mastery, combat effects, original portrait and mastery art, and a portable Windows build for testing.

**Architecture:** Extend the shared profile talent catalog/validator and talent tree renderer. Implement optional validated battle talent state in a focused Kuara module, connected to existing strike, steal, draw, cost, unit-entry and death paths. Use existing art dispatch for base and evolved Kuara.

**Tech Stack:** TypeScript, Vitest, Vite, Electron, existing ImageGen tool.

**Spec:** `docs/superpowers/specs/2026-11-11-kuara-maestria-design.md`

## Global Constraints

- Preserve Kuara's approved cost, stats, steal-from-bottom behavior, once-per-round Nexus strike and six-card evolution.
- Preserve IDs and effects of all current cards; stolen cards keep their original instance and cost except explicit mastery discounts.
- Old version 1 saves without Kuara talent state stay readable.
- Keep previous assets/packages; no commit, push, publication or backup.

## Review Focus

- Simultaneous or hand-full steals keep existing progression/evolution behavior.
- Discounts apply only to stolen cards, stack, floor at 1 and consume only when a stolen card is successfully played.
- Returning a stolen unit on death does not trigger on recall/obliterate and respects hand capacity.
- Empty deck caused by steal does not cause fatigue; only actual enemy draw triggers talent 12.
- Kuara absent from board does not receive board-only bonuses; progress/once-per-battle effects remain valid as specified.

### Task 1: Profile, save and presentation

**Files:** `src/profile/talents.ts`, `src/profile/validation.ts`, `src/ui/profile-view.ts`, `src/ui/talent-view.ts`, tests.

- [x] Add failing catalog/allocation/legacy-save tests.
- [x] Add 15 talents with the approved IDs, names, links and text; validate allocation state.
- [x] Add Kuara art path, alt text and constellation positions; pass focused UI/profile tests.

### Task 2: Battle effects

**Files:** create `src/battle/kuara-talents.ts`; modify `src/battle/kylast-talents.ts`, `types.ts`, `units.ts`, `expansion.ts`, `effects.ts`, `draw.ts`, `state-events.ts`, `champions.ts`, `play.ts`, `validation.ts`; battle tests.

- [x] Add tests for all talent triggers, discounts, once limits, absence, death reasons, hand capacity and save validation.
- [x] Add validated optional Kuara state and hooks using the signatures established by surrounding battle talent modules.
- [x] Run the focused tests and typecheck.

### Task 3: Art and package

**Files:** create `public/art/kuara.png`, `public/art/kuara-mastery.png`; modify `src/ui/html.ts`; UI tests.

- [x] Add assertions for base/evolved art and mastery alt text.
- [x] Connect the generated assets without replacing existing files; inspect tree at common and 960×700 viewports.
- [x] Build Vite to a temporary directory, package to a new release folder, run isolated Electron smoke, and open the new package with a confirmed separate QA profile.

### Task 4: Record completion

- [x] Append verification and limitations to PROGRESS/HANDOFF and approved art decision to DECISIONS.
- [x] Confirm `git diff --check` and final status; no commit/push/publication/backup.
