# Kylast — constelação corporal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement task-by-task. User authorized application of the approved preview on 03/11/2026.

**Goal:** Apply the approved Kylast artwork and fifteen interactive talent stars following his body.
**Architecture:** Keep the existing talent IDs, effects, prerequisite checks, purchase/reset actions and save format. Native exclusive details expose a readable description and purchase button for every star; the illustrated body lines are visual flow, with actual prerequisites named in each detail.
**Tech Stack:** Existing TypeScript, CSS, native HTML details/summary, SVG paths; no dependencies.
**Spec:** Approved image exec-7c136f20-12a7-46e7-aea9-c3bc9b1e6328.png and design/KYLAST_MAESTRIA.md. All fifteen nodes obtainable at level 30. Visual layout does not change prerequisite rules.

## Global Constraints
- Preserve project location, profiles, talent effects and reset cost of 200 Pedras Filosofais.
- Exactly fifteen interactive stars; six central, four on the sword arm, five on the scythe arm.
- Locked/acquired stars remain inspectable; purchases disabled during a run.

## Review Focus
- Stars remain aligned when the image scales and keyboard focus stays visible.
- Locked and acquired talents retain readable effects and prerequisite names.
- No baked stars or level labels contradict current progression.
- Existing purchase/reset hooks and legacy saves continue to work.
- Portable Windows distribution receives the updated build without changing profile storage.

## Task: Replace talent cards with the approved constellation
- [x] Add tests/ui/kylast-talent-view.test.ts; verify it fails before implementation.
- [x] Add clean artwork public/art/kylast-mastery.png, removing baked UI from the approved reference only.
- [x] Update src/ui/talent-view.ts with native inspection panels, fifteen stars and existing actions.
- [x] Add scoped layout/styles to src/ui/hub.css; retain other screens.
- [x] Run targeted talent tests, full suite, TypeScript and Vite build.
- [ ] Visual browser inspection blocked by URL safety verification; static review and automated purchase/reset/run-lock checks passed. See docs/kylast-constelacao.md.
- [x] Update existing portable app assets and ZIP; record verification.

Execution choice: reuse the existing checkout because the user explicitly asked to preserve its location/configuration. No commit: the existing repository is entirely untracked; do not absorb unrelated files into a commit.

