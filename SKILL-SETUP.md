# Half-Life — Minds Skill Setup Guide

## Prerequisites

1. **Minds Builder API Key** — create at https://build.hellominds.ai/console (Sign in → Keys → Create)
2. Set the key:
   ```bash
   export MINDS_BUILDER_API_KEY="<your-key>"
   ```

## Step 1: Create the "Halflife" Mind

```bash
# Check name availability
minds mind check-name --name Halflife

# Create the Mind (content archetype)
minds mind awaken --name Halflife --id content

# Verify
MIND=$(minds list | jq -r '.items[] | select(.name=="Halflife") | .mindId')
echo "Mind ID: $MIND"
```

## Step 2: Create a Conversation

```bash
minds chat create --mind "$MIND" --alias halflife-main
```

## Step 3: Describe the Skill to Your Mind

Send this to your Mind to create the Half-Life skill:

```bash
minds send halflife-main "Build me a Skill called 'Half-Life' that connects to my creative fatigue detection API at https://half-life-sable.vercel.app. The Skill should:

1. Track content format engagement over time using these HTTP tools:
   - GET /api/format/list?creatorId=halflife — lists all format archetypes with health status
   - POST /api/post/ingest — ingests post metrics (formatId, title, impressions, engagements) and recalibrates decay curves
   - GET /api/format/audit?creatorId=halflife — generates plain-English portfolio health narratives
   - GET /api/alerts/pending?creatorId=halflife — retrieves unacknowledged proactive fatigue alerts
   - POST /api/alerts/acknowledge — dismisses an alert by alertId
   - POST /api/format/create — registers a new format archetype

2. Behavior rules:
   - Use exponential decay: λ = -ln(E_n/E_0)/n, half-life t½ = ln(2)/λ
   - REFUSE to predict fatigue on formats with < 5 posts (PROBATION status)
   - Proactively alert when a format drops below 69% of baseline (FATIGUING) or 50% (DECAYED)
   - Always load persistent format memory before responding
   - Suggest format rotation when decay is detected

Keep responses concise and data-driven."
```

## Step 4: Refine the Skill

```bash
minds send halflife-main "When presenting format health, always include: format name, status badge, baseline rate, trailing rate, decay %, and half-life runway in posts remaining. Use the mathematical symbols (λ, t½) in technical summaries."
```

```bash
minds send halflife-main "That's it. Build it."
```

## Step 5: Test the Skill

```bash
# Test format listing
minds send halflife-main "Show me all my content formats and their current health."

# Test post ingestion
minds send halflife-main "I just published a new Hot Takes post: 'Clean code is overrated' — 15000 impressions, 400 engagements."

# Test portfolio audit
minds send halflife-main "Give me a full portfolio decay summary."

# Test cold-start refusal
minds send halflife-main "How is my Podcast Clips format doing?"
```

## Step 6: Publish to the Bazaar

```bash
minds send halflife-main "Publish this Skill to the Bazaar as 'Half-Life' so other creators can equip it for their own format fatigue detection."
```

## Step 7: Verify Publication

```bash
# Search the Bazaar for your skill
minds bazaar skills list --search "Half-Life"

# Equip it on the Mind
SKILL=$(minds bazaar skills list --search "Half-Life" --max 1 | jq -r '.items[0].skillId')
minds mind skills equip --mind "$MIND" --id "$SKILL"

# Confirm equipped skills
minds mind skills list --mind "$MIND"
```

## Quick Reference

| Command | Purpose |
|---|---|
| `minds doctor` | Check API connectivity & key |
| `minds list` | List your Minds |
| `minds mind skills list --mind $MIND` | See equipped skills |
| `minds bazaar skills list --search X` | Search Bazaar |
| `minds send <alias> <text>` | Talk to your Mind |
| `minds history halflife-main` | Review conversation |
