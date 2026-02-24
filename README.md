# 🏁 READING RUSH: The Ultimate Literacy Race

A fast-paced, competitive literacy game designed for classrooms. Students become **Turbo Readers** piloting reading-powered race cars on a glowing neon track!

![Theme](https://img.shields.io/badge/Theme-Neon%20Racing-39ff14?style=for-the-badge)
![Questions](https://img.shields.io/badge/Questions-150+-00f0ff?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-ff2e63?style=for-the-badge)

## 🎮 Two Game Modes

### 🖥️ ViewBoard Mode (Whole Class)
- Teacher-controlled on a ViewSonic ViewBoard or projector
- 2–6 teams with colored **buzzer buttons**
- Animated race track showing all teams
- **Photo Finish** championship showdown between top 2 teams
- Podium with confetti celebration

### 💻 Chromebook Mode (Individual)
- Students play solo on their devices
- **Race against 3 AI opponents** (Speed Reader, Grammar Bot, Word Wizard, etc.)
- Live leaderboard sidebar with real-time standings
- Overtake alerts and race position tracking
- Power-ups, badges, and final standings

## 📚 Literacy Skills

| Domain | Examples |
|---|---|
| 📖 Reading Comprehension | Passages, main idea, inference |
| 🔤 Vocabulary | Definitions, context clues, synonyms |
| ✏️ Grammar | Parts of speech, punctuation, sentence structure |
| 📝 Writing | Editing, tone, organization |

## ⭐ Championship Levels

| Level | Difficulty | Grade |
|---|---|---|
| ⭐ Pit Stop | Warm-up | 3–4 |
| ⭐⭐ Street Race | Intermediate | 5–6 |
| ⭐⭐⭐ Grand Prix | Advanced | 7–8 |
| 🏁 Photo Finish | Championship | All |

## ⚡ Game Features

- **150+ questions** across 4 literacy domains and 4 difficulty levels
- **Streak system**: 🔥 TURBO (×1.5 at 3 streak) → 🔥🔥 NITRO (×2.0 at 5 streak)
- **Power-ups**: 🚀 Turbo Boost, ❄️ Freeze, 🛡️ Shield, 💣 50/50 Eliminator, 🌀 Draft
- **Badges**: 🔥 Turbo Mode, ⚡ Speed Demon, 🌟 Perfect Round, 🧠 Big Brain, 👑 Champion, 🏆 Race Winner
- **Sound effects**: All synthesized via Web Audio API (no external files!)
- **Confetti engine**: Canvas-based particle effects for celebrations
- **Leaderboard**: Persisted in localStorage between sessions
- **Responsive**: Works on ViewBoards, laptops, tablets, and Chromebooks

## 🚀 Getting Started

1. **No installation required!** Just open `index.html` in Chrome
2. Choose **ViewBoard Mode** (classroom) or **Chromebook Mode** (individual)
3. Configure your game settings and start racing!

```
📁 READING RUSH/
├── index.html          ← Landing page (start here)
├── viewboard.html      ← ViewBoard mode
├── chromebook.html      ← Chromebook mode
├── css/
│   └── style.css       ← Full design system
└── js/
    ├── questions.js    ← 150+ question bank
    ├── engine.js       ← Core game engine
    ├── viewboard.js    ← ViewBoard controller
    ├── chromebook.js   ← Chromebook controller
    ├── sounds.js       ← Web Audio synthesizer
    └── confetti.js     ← Particle effects engine
```

## 🎓 For Teachers

- **No server needed** — runs entirely in the browser
- **No login required** — students just enter a name
- ViewBoard mode has **Pause** and **End Early** controls
- Questions cover **Common Core aligned** literacy skills
- Each round increases in difficulty automatically

## 📜 License

Built for classroom use. Free to use and modify for educational purposes.
