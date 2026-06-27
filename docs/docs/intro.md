---
sidebar_position: 1
---

# Introduction

OpenGym is a free, open-source Android workout tracker built with Kotlin and Jetpack Compose. All data lives on your device — no account required.

## Features at a glance

- **Session logging** — log sets, reps, weight, duration, and notes; resume a session after app close
- **Exercise library** — bodyweight, free weights, machines, cardio, and flexibility; with muscle-map highlights
- **Workout plans** — starter plans for beginner / intermediate / advanced goals, with warm-up and cool-down suggestions
- **Progression tracking** — personal records, 1RM estimates, volume graphs, and a calendar heatmap
- **Body tracking** — weight, measurements, and body-fat percentage over time
- **Gamification** — XP, achievements, loot drops, and a gym-discovery map
- **Marketplace** — aggregated deals from nutrition and equipment shops, with community ratings
- **Privacy-first** — no internet required for core features; JSON export for full data portability

## Tech stack

| Layer | Choice |
|---|---|
| Language | Kotlin |
| UI | Jetpack Compose |
| Database | SQLite via Room |
| Architecture | MVVM + Clean Architecture |
| DI | Hilt |
| Async | Coroutines + Flow |
| Background | WorkManager |
| Min SDK | API 29 (Android 10) |

## Project structure

```
.github/          # org-level community health files (this repo)
├── docs/         # Docusaurus documentation site
│   ├── docs/     # markdown pages
│   └── static/
│       └── diagrams/   # draw.io source files
├── CONTRIBUTING.md
└── README.md
```

The Android application source lives in a separate repository under the `open-gym-app` organization.
