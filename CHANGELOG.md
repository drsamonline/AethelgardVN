# Changelog

The format follows [Keep a Changelog](https://keepachangelog.com/); this project
follows [Semantic Versioning](https://semver.org/).

## 1.0.1

**Fixed — the demo ran with the wrong data, and the ending resolver was never reached.**

- **Demo chapters pointed at the wrong backgrounds.** `d1-01` and `d1-02` used
  `@bg bg_road` / `@bg bg_hall` — the *file* names — but `@bg` takes a *region*
  key. `G.REGIONS` only knows `road` and `hall`, so the lookup missed and the
  scene drew no background at all. Changed to `@bg road` and `@bg hall`.
- **The demo endings did the same thing**, in all seven `scenes/endings/*.scene`.
- **Demo achievements were unlocked by display name, not id.** `@ach First Steps`
  resolved to nothing, because `G.ACHIEVEMENTS` is keyed `first_steps`. Every
  `@ach` in the demo now uses the id (`first_steps`, `a_place`, `the_long_table`).
- **Two diary lines used a syntax the parser cannot read.** `@diary People: …`
  has a colon where the parser expects whitespace, so the line was dropped
  silently. Corrected to `@diary people …` / `@diary places …`.
- **The demo ending scenes never showed an ending.** They ended without
  `@ending <id>`, so a finished demo fell through to the "chapter complete"
  panel instead of the ending card. Each now carries its `@ending`.
- **The `example-book` mod shipped the other game's cast.** Its chapter spoke as
  `corin` and drew `bg_mountains` / sprite `sylva` — none of which exist in the
  engine. It now uses the engine's own cast (`wanderer`) and art (`bg_road`,
  `stranger`), so the example mod runs clean.

**Added**

- A **Title screen** button on the chapter-complete panel, so a run that reaches
  the end of a chapter list without an `@ending` or `@finish` is never a dead end.

## 1.0.0

First release. The engine, the demo chapter, the four axes, seven endings, the
diary, the mod loader and its five safety rules.
