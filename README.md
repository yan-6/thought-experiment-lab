# Thought Experiment Lab (思维实验室)

> 改变一个变量，运行另一个世界。Change one variable, run another world.

A world simulation interface that transforms "What if" hypotheses into structured thought experiments. Built for competition submission.

## Features

- **Hypothesis Input** — Enter any "What if" scenario (5-300 chars)
- **Experiment Configuration** — AI-parsed config with adjustable parameters
- **Terminal Simulation** — Immersive world model initialization with animated logs
- **Chain Reaction Timeline** — 4-6 chronological events with impact levels
- **Alternate Worldlines** — 3 distinct worldline cards (A/B/C)
- **Dependency Map** — Core → Direct → Secondary → Long-term
- **Winners & Losers** — Plus breaking points and new creations
- **Unexpected Outcomes** — Second/third-order effects
- **Constraint Conflicts** — Logic inconsistency detection
- **Dark Sci-Fi Theme** — Grid, noise, scanlines, monospace fonts

## Tech Stack

- Next.js 14, React 18, TypeScript, Tailwind CSS
- Lucide React icons, Zod validation
- InfiniSynapse API integration

## Quick Start

```bash
npm install
# Edit .env.local with your INFINISYNAPSE_API_KEY
npm run dev
```

Open http://localhost:3000

## Environment Variables

```
INFINISYNAPSE_API_KEY=your_key
INFINISYNAPSE_API_URL=https://api.infiniSynapse.com/v1
INFINISYNAPSE_MODEL=infiniSynapse-large
```

## API Endpoints

- `POST /api/parse-experiment` — Parse hypothesis into config
- `POST /api/run-experiment` — Run full thought experiment

## State Machine

`HOME → PARSING → CONFIG → RUNNING → RESULT` with ERROR reachable from any state.

## Demo Experiments

| # | Hypothesis |
|---|-----------|
| A | 如果微信消失一年，中国人的数字生活会发生什么？ |
| B | 如果人类不再需要睡眠，会发生什么？ |
| C | 如果一家公司取消所有会议，会发生什么？ |

## Disclaimer

All results are AI-assisted structured thought experiments, not real predictions.