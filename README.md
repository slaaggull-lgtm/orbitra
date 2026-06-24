<div align="center">

# 🌍 Orbitra

### Explore via a 3D globe, get your personalized travel itinerary

[![Status](https://img.shields.io/badge/status-actively%20developed-orange?style=for-the-badge)](#-roadmap)
[![Phase](https://img.shields.io/badge/phase-2%20%2F%204-blue?style=for-the-badge)](#-roadmap)
[![Three.js](https://img.shields.io/badge/three.js-r128-black?style=for-the-badge&logo=three.js)](https://threejs.org)


*Not just a map. A moment of discovery..*

</div>

---

## ✨ What does this project do?

Traditional travel planners make you fill out a form and return a flat list. Discovery turns this into an experience:

```
🌍 spinning globe  →  🎯 select country  →  🚀 camera zoom (discovery animation)
        ↓
🏙️ select city  →  📅 days / 🚶 pace / ❤️ interest areas
        ↓
📋 day-by-day, time-flowing, personalized travel itinerary
        ↓
👍 / 👎 feedback  →  🧠 preference profile  →  🗺️ travel history map
```

The goal is not just to answer "where to go" — it is to give the user the genuine feeling of actually approaching a city right through their screen.

## 🎬 Currently working features

| Feature | Status|
|---|---|
| 3D spinning globe (real texture, starfield) | ✅ |
| Country selection + camera "discovery" zoom animation | ✅ |
| City selection panel (multi-select) | ✅ |
| Number of days / pace / interest area form | ✅ |
| Day-by-day itinerary generation engine | 🚧 Phase 2 — currently being worked on |
| Like/dislike + user profile | ⏳ Phase 3 |
| Travel history + map marking | ⏳ Phase 4 |




## 🗂️ Project map

```
orbitra/
│
├── 🏠 index.html              the sole entry page of the application
│
├── 🎨 css/
│   └── style.css              all visual styles
│
├── ⚙️ js/
│   ├── data.js                country / city / interest / pace data
│   ├── globe.js                 3D globe scene + camera discovery animation
│   ├── preferences.js           days / pace / interest preference form
│   ├── ui.js                     panel and button interactions
│   └── main.js                  the initialization sequence of the app
│
└── 📚 docs/
    ├── ROADMAP.md               8-week full roadmap
                                 
```

## 🧰 Technology choices and reasons

| Choice | Reason |
|---|---|
| **Three.js** (CDN, r128) | Powerful 3D scene in the browser without any setup overhead |
| **Vanilla JS, framework yok** | Avoiding complexity while the project is small; will be re-evaluated in Phase 3 if needed |
| **NASA Blue Marble dokusu** (CDN) | Realistic continental outlines; automatically falls back to a backup texture if the CDN is unreachable, so the app never breaks|


## 🗺️ Roadmap

```
Hafta 1-2   ████████████████████  Faz 1  ✅  3D globe & country selection
Hafta 3-4   ██████████░░░░░░░░░░  Faz 2  🚧  preferences & itinerary engine
Hafta 5-6   ░░░░░░░░░░░░░░░░░░░░  Faz 3  ⏳  day flow interface & preference profile
Hafta 7-8   ░░░░░░░░░░░░░░░░░░░░  Faz 4  ⏳  travel history & polishing
```


## 🎯 Design philosophy

"Discovery is Not Linear, It is Chaotic and Fluid"
Orbitra is not a rigid agenda that dictates what the user should do at what exact hour. On the contrary, it is an intelligent and flexible "Attraction Field" engine that connects geography, places, and the user's current mood.

## 📄 License

This project is licensed under the MIT License.






---

<div align="center">
<sub>🌍 the world spins, the plan takes shape.</sub>
</div>

