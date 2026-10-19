<p align="center">
  <strong>Saga</strong><br>
  A small, dependency-free visual-novel engine for the browser.<br>
  <sub>Plain JavaScript · one stylesheet · no build step · works offline</sub>
</p>

---

**Saga** is a visual-novel engine that runs from a static file server with
nothing installed. It was built to make *Aethelgard — The Books*, and it is
released on its own so you can make something else with it.

> **The engine is MIT.** The *Aethelgard* artwork and story are a separate
> work, © Dr. Sohil Momin, all rights reserved. Everything inside this
> repository — including the demo story and placeholder art — is MIT.
> See `LICENSE`.

## Contents

- [Run the demo](#run-the-demo)
- [What you get](#what-you-get)
- [The engine](#the-engine)
- [Write a chapter](#write-a-chapter)
- [The four axes and the endings](#the-four-axes-and-the-endings)
- [Art](#art)
- [Mods](#mods)
- [Accessibility](#accessibility)
- [Making it yours](#making-it-yours)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Licence](#licence)

---

## Run the demo

The engine reads its own scene files over http, so serve the folder — opening
`index.html` by double-click will not work in most browsers.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

No install, no build, no dependencies.

## What you get

| | |
|---|---|
| **Dialogue** | per-line speaker, ten expressions, a portrait that changes with the mood of the line |
| **Choices** | branching, with stat gates shown greyed-out and their reason visible — never a hidden lock |
| **Branches** | `@label` / `@goto`, so a choice can rejoin the main line |
| **Four axes** | hidden counters that every choice moves; the ending is their *shape* |
| **Seven endings** | resolved from which axis led and how far they spread |
| **The Diary** | people, places, lore, decisions and deeds, filled as you play |
| **Intro cards** | a character card the first time someone appears |
| **Achievements** | declared in the script, unlocked in play |
| **Save / export** | localStorage, plus export and import as a JSON file |
| **Backlog** | scroll back through everything said |
| **Music** | synthesised with Web Audio — no audio files at all |
| **Mods** | drop a folder in `mods/`, it is found; five safety rules enforced |
| **Mobile** | tested from 360×640 up |

## The engine

```
index.html            the page
css/style.css         the look
js/core.js            state, save, settings, the four axes
js/script.js          the scene-script parser
js/chars.js           the cast and the regions   <- YOUR DATA
js/graphics.js        sprite lookup
js/music.js           synthesised sound
js/play.js            the runner: dialogue, choices, diary, cards
js/ui.js              title, Diary, settings, endings
js/mods.js            the mod loader and its safety rules
js/endings.js         the axis shape and the ending resolver
js/boot.js            wiring
scenes/               the story, as plain text   <- YOUR DATA
assets/sprites/       the art                    <- YOUR DATA
docs/SCENE-FORMAT.md  how to write a chapter
```

Everything marked **YOUR DATA** is meant to be replaced. The engine does not
know anything about any particular story.

## Write a chapter

A chapter is a plain text file, one instruction per line. Full reference in
`docs/SCENE-FORMAT.md`.

```
@title The Demo — Chapter One
@bg bg_road
@mood uneasy

narrate A road at dusk.
wanderer neutral "You're the Keeper of the hall, then."
keeper warm "I am."

choice
* "Tell the truth."                    => truth+1, bonds+1
* [Bonds 2] "Say you knew her mother." => bonds+2, mercy+1
end

@label after
@mood calm
keeper warm "Then come in. It's cold."
```

Then add one line to `scenes/manifest.js` and the chapter appears.

## The four axes and the endings

Every choice moves **Mercy**, **Truth**, **Bonds** or **Conviction**. They are
hidden while you play. The ending is not a score — it is the *shape*: which axis
led, and how far the four spread. Seven endings, from *Dawn* to *Hollow*:

| ending | the shape that earns it |
|---|---|
| Dawn | every axis high — nothing was sacrificed |
| The Long Road | mercy carried the run |
| The Weight | truth led, and its cost |
| Ash | a balanced, ordinary run |
| The Crown's Shadow | conviction led, without mercy |
| Silence | never committed to anything |
| Hollow | refused everything |

The resolver lives in `js/endings.js` and is pure data — rewrite it freely.

## Art

The engine finds a portrait by name:

```
char.<id>.<expression>   ->   <sprite>_<expression>.webp, then <sprite>.webp
bg.<region>              ->   bg_<region>.webp
```

Ship no art and the game runs text-only — a missing portrait simply hides. The
sprites in `assets/sprites/` here are **generated placeholders**, MIT-licensed
like the engine. Replace them.

Rebuild the index after adding art:

```bash
python3 tools/make-sprite-index.py assets/sprites
```

## Mods

Drop a folder into `mods/` with a `mod.js`, add a line to `mods/mods.json`, and
the engine finds it. Mods can add chapters, cast, regions, achievements, and
can also *replace* existing entries. Five safety rules are enforced so a mod can
never break a running game:

1. Every load is wrapped in try/catch — a broken mod cannot take the game down.
2. Structural mods apply at boot only, never mid-session.
3. `requiresMods` is honoured.
4. Two mods claiming the same `provides` conflict; the first wins, the second is
   refused **visibly**.
5. `loadAfter` orders mods deterministically.

A mod can also say **where** its chapter belongs:

```js
scenes: [ { id:"mod-x", title:"X", file:"mods/my-mod/x.scene" } ],
after: "b1-10",     // place it after that scene; if absent, it goes last
```

See `mods/README.md`.

## Accessibility

Keyboard play throughout (space/enter advance, `D` diary, `B` backlog, `S` save,
`Esc` closes a panel), visible focus outlines, dialog semantics on panels, and
`prefers-reduced-motion` honoured.

## Making it yours

The engine ships **no story**. To make a game you replace three things:

| file | what to put in it |
|---|---|
| `js/chars.js` | your cast, your regions, `G.TITLE`, `G.SLUG`, `G.ACHIEVEMENTS` |
| `scenes/` | your chapters, and a `manifest.js` listing them |
| `assets/sprites/` | your art |

Nothing else needs to change. The engine starts at whatever scene the manifest
lists first, so it never needs to know your chapter ids.

## Documentation

| document | about |
|---|---|
| `docs/SCENE-FORMAT.md` | the full scene-script reference |
| `mods/README.md` | writing a mod, and the five safety rules |
| `assets/sprites/README.md` | the art naming convention |
| `CONTRIBUTING.md` | how to send changes to the engine |
| `CHANGELOG.md` | release history |

## Contributing

Read `CONTRIBUTING.md` first — the engine is meant to stay small, with no build
step and no dependencies. Bug fixes, parser features inside the existing format,
accessibility work and new mod hook points are all welcome.

## Licence

MIT — see `LICENSE`. Use it, fork it, ship it.

By Dr. Sohil Momin.
