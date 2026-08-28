# Half-Life

**Autonomous Creative Fatigue Detection & Format Decay Protocol for Creators powered by Minds Agents (Animoca Brands).**

[![Live Web App](https://img.shields.io/badge/Live_App-half--life--sable.vercel.app-00f2fe?logo=vercel)](https://half-life-sable.vercel.app)
[![Hackathon Track](https://img.shields.io/badge/Track-Audience_Growth_&_Engagement-00f2fe)](https://dorahacks.io/hackathon/creativeminds/details)
[![Minds Agent](https://img.shields.io/badge/Minds_Agent-Halflife-blue)](https://hellominds.ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 1. Executive Summary

Every creator eventually finds a winning content format—a specific hook structure, breakdown thread, or pacing. The natural instinct is to repeat it indefinitely. But audience psychology is governed by **creative fatigue**: the law of diminishing returns on repeated stimuli.

In performance marketing, multi-billion-dollar ad platforms (Meta, Google, TikTok) continuously monitor creative decay, calculate half-life curves, and rotate creatives before ROI collapses. Content creators have never had this capability. Instead, they repeat a decaying format for months, watch reach dwindle, blame "the algorithm," and burn out.

**Half-Life** equips a creator's **Minds Agent** (`Halflife`) with a persistent creative fatigue detection engine that:
1. **Remembers Format Histories (Memory):** Retains format baselines, archetypes, and post engagement metrics across sessions.
2. **Models Longitudinal Decay (Continuity):** Calculates the format's baseline engagement, exponential decay constant ($\lambda$), and half-life ($t_{1/2}$).
3. **Proactively Alerts (Autonomous Follow-Up):** Unprompted, warns the creator when a format enters terminal decay ($>35\%$ drop below baseline over trailing window) and recommends fresh rotation formats before audience churn hits.

---

## 2. Architecture & Data Flow

```
Creator (Chat / Ingestion / Web)
   │
   ▼
Minds Mind (Halflife) ── equips ──▶ "Half-Life" Skill ──HTTP──▶ Tool API (Next.js 15)
   ▲                                                                         │
   │                                                                         ▼
   └─── Proactive Decay Alerts / Plain Narrations ◀─── Trailing Audit ─── [Decay Engine]
                                                                             │
                                                                             ▼
                                                                 Persistent Memory Store
                                                                  (Cross-Session State)
```

---

## 3. Mathematical Decay Engine

### 1. Exponential Decay Model
$$E(n) = E_0 \cdot e^{-\lambda n}$$
* $E_0$: Baseline engagement rate (median of first $N$ healthy posts).
* $E_n$: Trailing engagement rate (median of rolling $k$-window).
* $\lambda$: Exponential fatigue decay rate per post iteration:
$$\lambda = -\frac{\ln(E_n / E_0)}{n}$$

### 2. Projected Half-Life ($t_{1/2}$)
$$n_{1/2} = \frac{\ln(2)}{\lambda}$$
Estimates the remaining post runway before the format loses $\ge 50\%$ of its original baseline yield.

### 3. Status Classification
| Status | Decay Ratio ($E_n / E_0$) | Action |
|---|---|---|
| `PROBATION` | $< 5$ posts recorded | Calibration paused. Refuses fatigue predictions until statistical baseline is reached. |
| `HEALTHY` | $\ge 85\%$ | Safe to maintain as primary content pillar. |
| `STABLE` | $70\% - 84\%$ | Minor fatigue. Test subtle hook variations. |
| `FATIGUING` | $50\% - 69\%$ | Warning threshold. Prepare rotation or visual pivot. |
| `DECAYED` | $< 50\%$ | Terminal fatigue. Retire or pause for 30–45 days to reset audience saturation. |

---

## 4. Hackathon Rubric Alignment (Creative Minds Jam #1)

| Requirement | Implementation in Half-Life |
|---|---|
| **Track: Audience Growth & Engagement** | Directly prevents audience churn and fatigue by keeping content dynamic and high-performing. |
| **🧠 Memory (Cross-Session)** | Format categories, baseline medians, and post histories are persisted across agent sessions. |
| **🔄 Continuity** | Picks up exactly where the creator left off, evaluating continuous longitudinal decay curves. |
| **⚡ Autonomous Follow-Up** | Proactively dispatches warnings unprompted when a format crosses into `FATIGUING` or `DECAYED`. |
| **Honest Calibration Boundary** | Strictly enforces a 5-post minimum floor before computing fatigue—never guessing or hallucinating on sparse data. |

---

## 5. API Reference

### `GET /api/format/list?creatorId=jadoncreator`
Lists all registered content formats with current health, baseline rate, and post count.

### `POST /api/post/ingest`
Ingests a single post metric and recalibrates the decay engine.
```json
{
  "formatId": "fmt-hottakes",
  "creatorId": "jadoncreator",
  "title": "Clean architecture is overrated",
  "impressions": 15000,
  "engagements": 570
}
```

### `GET /api/format/audit?creatorId=jadoncreator`
Generates comprehensive portfolio health audit and plain-English narration for the Mind.

### `GET /api/alerts/pending?creatorId=jadoncreator`
Returns unacknowledged proactive alerts for the Mind to dispatch unprompted.

---

## 6. Running Tests & Development

```bash
# Run unit tests
npm test

# Run Next.js production build
npm run build
```

---

## License
MIT
