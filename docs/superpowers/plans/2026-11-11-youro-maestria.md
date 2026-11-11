# Youro Mastery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add Youro's approved 15-node mastery tree, its profile/save support, a portrait and mastery illustration, and a portable Windows build for author testing.

**Architecture:** Follow the existing `Talent[]` catalog, talent allocation, mastery renderer, and per-hero battle talent modules. Keep talent state in the existing battle save state, route form/death/evolution/combat/damage hooks through existing engine flows, and preserve the four-death evolution threshold and all existing card IDs/effects.

**Tech Stack:** TypeScript, DOM templates/CSS, Vitest, Vite, Electron 45.2.1, built-in ImageGen.

**Spec:** `docs/superpowers/specs/2026-11-11-youro-maestria-design.md` (approved by the author).

## Global Constraints

- All 15 names, parents and proposed effects follow the approved spec; do not change the four-death evolution rule.
- Preserve IDs, original card effects, simultaneous-death snapshot semantics, and old-save compatibility.
- Keep `docs/HANDOFF.md`, `docs/PROGRESS.md` and existing local changes; no commit, push, publication or backup.
- Save new raster assets as `public/art/youro.png` and `public/art/youro-mastery.png`; do not overwrite existing art.
- Update the portable Windows package into a new release directory after validation; keep previous packages intact.

## Review Focus

- Simultaneous deaths crossing the second/third death thresholds award each relevant mastery trigger once while preserving pre-death snapshots.
- A dying or absent Youro does not receive or trigger form/death mastery effects after leaving play.
- The once-per-battle Bear damage reduction applies to both combat and effect damage, never makes damage negative, and is not consumed by zero damage.
- Tiger combat bonuses do not affect another unit's attack, noncombat damage, or attacks after the once-per-battle use.
- Existing version 1 saves without Youro talent state remain readable; invalid talent IDs remain rejected.

### Task 1: Profile catalog, allocation and mastery presentation

**Files:**
- Modify: `src/profile/talents.ts`
- Modify: `src/profile/validation.ts`
- Modify: `src/ui/talent-view.ts`
- Test: `tests/talents.test.ts`
- Test: `tests/ui/kylast-talent-view.test.ts`
- Test: `tests/expansion-save.test.ts`

**Interfaces:**
- Consumes: `Champion`, `Talent`, `TalentId`, existing `talentsFor`, `allocateTalent`, `resetTalents`, and `renderTalents` contracts.
- Produces: 15 Youro talent records using the exact IDs, names, parent links, and effects in the approved spec; `talentsFor('youro')` returns the array; existing profile/save validation accepts those IDs only when they are in Youro's approved tree.

- [x] **Step 1: Write failing profile and rendering tests**
  - Assert Youro has exactly the 15 approved talent IDs, valid parents, and a level-30 final talent.
  - Assert valid Youro talent allocation/reset works, and another hero cannot allocate a Youro talent.
  - Assert rendering Youro produces 15 nodes, the Youro mastery asset path and accessible names; existing hero trees retain their node counts and paths.
  - Assert current version 1 saves with no talent state still decode, while an unknown Youro talent ID is rejected.
- [x] **Step 2: Run the focused tests and confirm the missing-tree failures.**
- [x] **Step 3: Add the IDs and 15 talent records to `src/profile/talents.ts`; add Youro to save validation; add a 15-position map and Youro alt text to `src/ui/talent-view.ts`.**
- [x] **Step 4: Run the focused tests and confirm profile, validation and rendering pass.**

### Task 2: Youro battle talent effects

**Files:**
- Create: `src/battle/youro-talents.ts`
- Modify: `src/battle/kylast-talents.ts` (extend `TalentBattleState` with optional `youro` state)
- Modify: `src/battle/types.ts` only if a battle-state type requires a direct field
- Modify: `src/battle/units.ts`
- Modify: `src/battle/expansion.ts`
- Modify: `src/battle/combat.ts`
- Modify: `src/battle/effects.ts` and any other existing direct unit-damage path identified by `rg "health=Math.max\(0,.*-" src/battle`
- Modify: `src/profile/validation.ts` for the optional saved state shape
- Test: `tests/battle/youro-talents.test.ts`
- Test: `tests/expansion-save.test.ts`

**Interfaces:**
- Consumes: `BattleState`, `BattleEvent`, `BoardUnit`, `PlayerId`, `TalentId`, existing `heroProgress`, `setForm`, `evolveExpanded`, `recordDamage`, and combat strike flow.
- Produces: `youroHasTalent(s, owner, id): boolean`; `youroBaseLife(s, owner, definition): number`; `youroFormBonus(s, owner, form): number`; `youroReduceDamage(s, owner, unit, amount): number`; `youroStrikeBonus(s, owner, unit, lane, strike): number`; and hooks for evolution and a batch of deaths. State is optional and version 1 save compatible.

- [x] **Step 1: Write failing tests for each of the 15 effects**
  - Cover base life, Bear/Tiger form bonuses, Bear form damage reduction, Bear protection of an ally, extra form/evolution stats, Tiger strike bonus and combat kill, Tiger-form death bonus, first/second/third death milestones, evolution bonus, and first post-evolution death.
  - Assert each one-use effect is consumed once; wrong form, wrong hero, absent Youro, non-death removal, noncombat damage for combat-only effects, and overkill are handled as specified.
  - Assert simultaneous deaths crossing two milestones trigger both once without rescuing doomed units or changing the four-death evolution requirement.
  - Assert version 1 battles without `talentState.youro` restore and continue.
- [x] **Step 2: Run `node node_modules/vitest/vitest.mjs run tests/battle/youro-talents.test.ts tests/expansion-save.test.ts` and confirm the new behavior fails.**
- [x] **Step 3: Implement `YouroTalentState` and the six exported interfaces in `src/battle/youro-talents.ts`; extend existing talent setup and state validation.**
- [x] **Step 4: Connect setup/base life in `units.ts`, form bonuses in `expansion.ts`, evolution/death thresholds in the existing snapshot hook, attack bonuses and kill observation in `combat.ts`, and incoming damage reduction to effect and combat damage paths.** Keep `damageApplied` amounts equal to the actual post-reduction damage.
- [x] **Step 5: Re-run the focused engine and save tests; confirm simultaneous deaths, optional state and every talent effect pass.**

### Task 3: Original portrait and mastery art

**Files:**
- Create: `public/art/youro.png`
- Create: `public/art/youro-mastery.png`
- Modify: `src/ui/profile-view.ts`
- Test: `tests/ui/home-view.test.ts` or the existing profile/portrait UI test

**Interfaces:**
- Consumes: approved art direction in the spec and current hero portrait/mastery rendering contracts.
- Produces: two original project-local images; `heroPortrait('youro')` uses `/art/youro.png`; `renderTalents` loads `/art/youro-mastery.png`.

- [x] **Step 1: Add a failing UI assertion for the portrait asset and the Youro mastery asset path.**
- [x] **Step 2: Run the focused UI test and confirm the asset selection is missing.**
- [x] **Step 3: Generate the portrait as a cat-form character and the wide mastery scene with Bear/Tiger as spiritual echoes, following the approved spec; inspect both outputs for composition, style, subject and unwanted text.**
- [x] **Step 4: Save the final outputs under the two specified paths and connect them in `profile-view.ts`/existing talent renderer.**
- [x] **Step 5: Run the UI test and inspect the tree overlay at 1440×960 and 960×700.**

### Task 4: Full verification and portable test build

**Files:**
- Append: `docs/PROGRESS.md`
- Append: `docs/HANDOFF.md`
- Build: new `release/CAPS-<timestamp>-win-x64/` directory

**Interfaces:**
- Consumes: completed engine, profile/UI and art changes from Tasks 1–3.
- Produces: evidence-backed test/build record and a portable Windows executable for author testing.

- [x] **Step 1: Run `node node_modules/typescript/bin/tsc --noEmit`.**
- [x] **Step 2: Run focused profile, UI, mastery, expansion, combat, save and AI tests; run the full suite only if a concrete interaction risk remains.**
- [x] **Step 3: Run `git diff --check` and `& .\desktop\empacotar.ps1`; verify the generated executable and assets are in the new package.**
- [x] **Step 4: Run an isolated Electron smoke test and a browser visual check at 1440×960 and 960×700, including reduced motion; do not open or modify the author's existing save.**
- [x] **Step 5: Append actual results and limits to `docs/PROGRESS.md` and a concise next step to `docs/HANDOFF.md`; report the new executable path.**

## Completion Criteria

- Youro has 15 purchasable, connected mastery nodes and every approved effect is implemented, serialized safely, and covered by focused tests.
- The portrait and mastery image are original local assets and display in the existing selection and tree interfaces.
- TypeScript, focused tests, build, smoke test and required visual checks pass; previous release packages and pre-existing local edits remain intact.
- No commit, push, publication or backup is made.
