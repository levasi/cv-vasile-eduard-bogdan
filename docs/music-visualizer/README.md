# Music Visualizer

A production-ready **cinematic music visualizer studio** built with **Nuxt 3**, **Vue 3**, **TypeScript**, **Tailwind CSS**, **Three.js**, and the **Web Audio API**. Upload a track, compose image and text layers, tune audio reactivity, save projects, and export a synced video—or embed the visualizer in any web app.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Set `NUXT_AUTH_SECRET` (min 16 characters) before running in production.

## Main features

### Studio editor

- **Project menu** — rename projects, upload audio (MP3 / WAV / OGG), set BPM (0 = auto-detect), save, save-as, and switch between saved projects
- **Layers panel** — stack **image** and **text** layers with drag-and-drop ordering, visibility toggles, and per-layer settings
- **Frequency spectrum** — interactive graph with custom bands (e.g. kick, snare, hi-hat); bands drive layer parameter modulations
- **Audio player** — play, pause, restart, scrub timeline, volume, and mute
- **Video export** — record the full visualization with synced audio to **WebM**
- **Starter project** — loads with a curated background, text layer, frequency bands, and audio-reactive modulations out of the box

### Visual engine (WebGL)

- **8 cinematic presets** — `neon-pulse`, `liquid-bass`, `dark-energy`, `hologram`, `dreamwave`, `trap-nation`, `cyber-glitch`, `cosmic-space`
- **5 legacy canvas presets** — circular spectrum, waveform, bars, particles, album pulse (fallback mode)
- **GPU pipeline** — Three.js scenes, GLSL shaders, bloom, chromatic aberration, trails, vignette, film grain, and adaptive performance tiers
- **Aspect ratios** — 16:9, 9:16, 1:1
- **Post-FX & camera** — bloom, motion blur, god rays, auto-orbit, bass shake, zoom pulses

### Audio analysis & reactivity

- **Real-time FFT** — volume, bass, mids, treble, transients, kick / snare / hi-hat hits
- **Beat detection** — BPM estimation, bar phase, beat pulse envelope
- **Essentia.js** — optional enhanced analysis via a Web Worker
- **Custom frequency bands** — user-placed bands on the spectrum graph trigger short hit pulses for tight, musical layer motion
- **Layer modulations** — bind any layer parameter (opacity, scale, position, rotation, font size) to spectrum bands or MIR signals (kick, bass, snare, beat, vocals, energy, mood, etc.) with amount, easing, and reverse controls

### Projects & accounts

- **Cloud projects** — register, sign in, and persist projects to SQLite (settings, embedded audio, and image assets as base64)
- **Guest mode** — edit locally without an account; saving prompts login
- **Portable format** — `.mvproj.json` project snapshots with versioned settings

### Embedding

- **Vue / Nuxt component** — drop in `<MusicVisualizer />` with props for preset, settings, and audio URL
- **iframe route** — `/embed/visualizer` with query-param configuration
- **Web component** — `<music-visualizer>` custom element
- **postMessage API** — parent ↔ iframe control (play, pause, preset changes, settings updates)
- **Runtime API** — `window.visualizerAPI` for play/pause, preset switching, image/audio loading

See [docs/VISUAL_ENGINE.md](docs/VISUAL_ENGINE.md) for engine architecture, shader pipeline, and embed API details.

## Tech stack

| Layer | Tools |
|-------|-------|
| App | Nuxt 3, Vue 3, TypeScript, Tailwind CSS |
| Visuals | Three.js, GLSL shaders, EffectComposer post-processing |
| Audio | Web Audio API, AnalyserNode, Essentia.js (Web Worker) |
| Backend | Nitro server routes, SQLite (`better-sqlite3`), JWT sessions |
| Export | Canvas capture + MediaRecorder (WebM) |

## Project structure

```
components/visualizer/   # Studio UI, canvas/WebGL, presets, layers panel
components/auth/           # Login, register, nav
composables/             # Audio analyzer, reactive state, projects, export
engine/                    # Three.js visual engine, shaders, export recorder
pages/                     # Studio (index), auth, embed routes
server/api/                # Auth + project CRUD
types/                     # Visualizer, layer, project, and spectrum types
utils/                     # Audio analysis, layer modulations, project I/O
docs/VISUAL_ENGINE.md      # Engine architecture reference
```

## Embedding

### Vue / Nuxt component

```vue
<MusicVisualizer
  :audio-url="audioUrl"
  preset="neon-pulse"
  :settings="{ primaryColor: '#8b5cf6', sensitivity: 1.5 }"
  :autoplay="false"
/>
```

### iframe

```html
<iframe
  src="https://your-domain.com/embed/visualizer?preset=neon-pulse&bg=%23000000&primary=8b5cf6"
  width="100%"
  height="500"
  allow="autoplay"
></iframe>
```

**Query params**: `preset`, `audio`, `autoplay`, `primary`, `secondary`, `bg`, `sensitivity`, `smoothing`, `glow`, `particles`, `aspect`

### postMessage (parent → iframe)

```js
iframe.contentWindow.postMessage({
  source: 'music-visualizer-parent',
  type: 'play', // pause | restart | changePreset | updateSettings | loadAudio
  payload: { preset: 'liquid-bass' },
}, '*')
```

**iframe → parent**: `ready`, `playing`, `paused`, `timeupdate`, `ended`

### Web component

```html
<music-visualizer preset="neon-pulse" audio="/track.mp3" height="500px"></music-visualizer>
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript check |

## License

MIT
