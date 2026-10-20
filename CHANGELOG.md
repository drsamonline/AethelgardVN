# Changelog

<p align="center">
  <img src="https://img.shields.io/badge/release-v1.0.1-blue" alt="Release v1.0.1">
  <img src="https://img.shields.io/badge/semver-2.0.0-informational" alt="Semantic Versioning 2.0.0">
</p>

## [1.0.2]

**Fixed — the engine would not start when `index.html` was opened directly.**

Opening the folder's `index.html` by double-clicking serves it as a `file://`
page, where browsers block `fetch()`. The engine read its scenes with `fetch()`,
so nothing loaded, boot aborted before `wireUI()` ran, and every button on the
title screen was dead — the page looked fine and ignored all clicks.

- **Scenes, mods and the sprite list are now embedded as plain script.**
  `tools/make-bundle.py` generates `scenes/bundle.js` (every scene's source, plus
  the mod list, each mod's source, and the scenes they add) and
  `assets/sprites/index.js` (the sprite list). Both load as ordinary `<script>`
  tags, so the engine boots from `file://` as well as over http.
  `loadScenes()`, `loadModScenes()`, `discoverMods()` and `buildSpriteIndex()`
  all fall back to `fetch()` when the bundle is absent — nothing else changes.
- **The History panel could not be closed.** `index.html` had two elements with
  `id="backlog"`; the panel wrote into its own frame and lost its Close button.
  The scroll area is now `#backlog-body`.

Regenerate after editing any scene:

```bash
python3 tools/make-bundle.py
```

All notable changes to **Saga** are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/); the project follows
[Semantic Versioning](https://semver.org/).

## [1.0.1]

### Fixed

- Demo scenes used file names (`@bg bg_road`) where `@bg` expects a region key;
  corrected to `@bg road` / `@bg hall` in the demo chapters and all seven
  ending scenes.
- Demo `@ach` lines used display names instead of ids (`first_steps`, `a_place`,
  `the_long_table`), so no achievement resolved. Corrected.
- Two demo `@diary People: …` lines used a colon the parser cannot read; the
  entries were dropped silently. Corrected to `@diary people …` syntax.
- Demo ending scenes lacked `@ending <id>`, so a finished run fell through to
  the "chapter complete" panel instead of showing the ending card. Each ending
  scene now carries its `@ending`.
- The `example-book` mod referenced characters and art from another game
  (`corin`, `sylva`, `bg_mountains`) that don't exist in the engine. It now uses
  the engine's own demo cast and art, so it runs clean.

### Added

- A **Title screen** button on the chapter-complete panel, so a run that ends
  without an `@ending` or `@finish` is never a dead end.

## [1.0.0]

First release. The engine, the demo chapters, the four axes, seven endings, the
Diary, the mod loader and its five safety rules.
