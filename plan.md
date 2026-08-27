# Plan — Half-Life: Creative Fatigue Detection Protocol

**Event** Creative Minds Jam #1: Hong Kong · **Deadline** 2026-08-28 15:59 UTC (16:59 WAT)
**Track** Audience Growth & Engagement
**Repo** `github.com/jadonamite/half-life` · **Dashboard** [half-life-sable.vercel.app](https://half-life-sable.vercel.app)

---

## 1. Architecture

```
Creator (Chat / Web / Post Ingestion)
   │
   ▼
Minds Mind (JadonCreator) ── equips ──▶ "Half-Life" Skill ──HTTP──▶ Tool API (Next.js 15)
   ▲                                                                         │
   │                                                                         ▼
   └─── Proactive Decay Alerts / Plain Narrations ◀─── Trailing Audit ─── [Decay Engine]
                                                                             │
                                                                             ▼
                                                                 Persistent Format Store
                                                                (Cross-Session Memory)
```

---

## 2. Work Streams

### Stream A — Core Decay Engine & Test Suite
1. **Mathematical Decay Model:** Implement exponential decay rate calculation, rolling median baselines, half-life days remaining estimation, and categorical status (`PROBATION`, `HEALTHY`, `STABLE`, `FATIGUING`, `DECAYED`).
2. **Cold-Start Guard:** Enforce the $\ge 5$ post statistical confidence threshold with explicit refusal reasoning.
3. **Automated Unit Tests:** Rigorous Vitest/Node test suite verifying baseline computation, decay transitions, cold-start refusal, and rotation recommendations.

### Stream B — Next.js 15 API & Tool Server
1. `/api/format/list`: Retrieves all registered formats, current health, and baseline stats.
2. `/api/format/create`: Registers a new content format archetype.
3. `/api/post/ingest`: Ingests post engagement metrics and recalibrates the decay curve.
4. `/api/format/audit`: Generates plain-English narrative summaries for the Mind.
5. `/api/alerts/pending`: Returns unprompted proactive alerts for the Mind to send to the creator.

### Stream C — Minds Mind Skill & Bazaar Registration
1. Author **"Half-Life" Skill** for `JadonCreator`.
2. Connect Tool API endpoints to the Skill.
3. Verify conversational memory, continuity, and autonomous follow-up triggers.
4. Publish Skill to the **Minds Bazaar**.

### Stream D — Modern Frontend Dashboard & Simulation Lab
1. Interactive visual dashboard displaying Format Health status cards, live decay curves, and post history.
2. Live simulation tool allowing judges to inject post batches (e.g. 5 healthy $\rightarrow$ 3 fatiguing) and observe real-time decay.
3. Embedded Minds chat preview demonstrating memory and unprompted alerts.

### Stream E — Video Demo & DoraHacks Submission
1. 3-minute crisp video demonstrating:
   - **Memory:** Mind remembers past format baselines.
   - **Continuity:** Mind tracks evolving post metrics over time.
   - **Autonomous Follow-up:** Mind proactively pings with a decay alert.
   - **Honest Boundary:** Cold-start refusal on fresh formats.
2. DoraHacks BUIDL submission form, public repo verification, and receipt confirmation.
