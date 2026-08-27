# Todo — Half-Life

**Deadline** 2026-08-28 15:59 UTC (16:59 WAT) · See `plan.md` for stream details.

## Stream A — Core Decay Engine & Tests
- [x] A1 Define TypeScript interfaces (`types.ts`) for formats, posts, fatigue reports, and alerts
- [x] A2 Implement mathematical decay model (`lib/decay-engine.ts`) with median baseline & half-life calculation
- [x] A3 Implement persistent store (`lib/storage.ts`) providing cross-session memory
- [x] A4 Build and execute full unit test suite (`tests/decay-engine.test.js`) — 5/5 passing covering all status transitions and cold-start refusals

## Stream B — Next.js 15 Tool Endpoints
- [x] B1 Scaffold Next.js 15 project in `projects/half-life`
- [x] B2 Create `/api/format/list` & `/api/format/create`
- [x] B3 Create `/api/post/ingest` (single & batch ingestion)
- [x] B4 Create `/api/format/audit` (plain-English narration generation)
- [x] B5 Create `/api/alerts/pending` & `/api/alerts/acknowledge` (autonomous follow-up queue)

## Stream C — Minds Mind Skill & Bazaar Publishing
- [ ] C1 Configure "Half-Life" Skill definition with quote/audit/ingest/alert actions
- [ ] C2 Test Skill execution with `JadonCreator` via `@animocabrands/minds-cli`
- [ ] C3 Audit Skill scope and conversational responses
- [ ] C4 Publish Skill to Minds Bazaar (`bazaar skills`)

## Stream D — Frontend Dashboard & Simulator
- [x] D1 Configure Tailwind CSS and modern dark-mode editorial theme
- [x] D2 Build Hero, Live Format Tracker Cards, and Decay Curve Chart components
- [x] D3 Build "Simulation Lab" to let judges inject post sequences live
- [x] D4 Build Proactive Notification Feed demonstrating Autonomous Follow-Up

## Stream E — Submission & Demo
- [x] E1 README rewrite with architecture, precedent, API reference, and test instructions
- [ ] E2 Record 3-minute demo video highlighting Memory, Continuity, Autonomous Follow-up, and Cold-Start
- [ ] E3 File DoraHacks BUIDL submission
- [ ] E4 Capture submission receipt screenshot and update tracker
