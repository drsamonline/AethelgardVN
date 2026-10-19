# Contributing

Thanks for wanting to help. This is a small engine and it is meant to stay small.

## The rules

1. **No build step, no dependencies.** The engine is plain ES5-flavoured
   JavaScript and one stylesheet. It must run from a static file server with
   nothing installed. Do not add a bundler, a framework or a package.json.
2. **No network at runtime.** The game must work offline. The music is
   synthesised with Web Audio precisely so there are no audio files to fetch.
3. **Modular files.** Do not merge the engine into a single HTML file. One
   concern per file, so a game can be debugged and extended.
4. **Check before you send.** Run `node --check` on any file you touch, then
   load the demo and play it.

## What is wanted

- Parser features that stay inside the existing format
- Accessibility improvements
- New mod hook points, with the five safety rules intact
- Bug fixes with a reproduction

## What is not wanted

- Dependencies
- Telemetry or analytics
- Anything that phones home
- Changes that make a mod able to break a running game mid-session

## The five mod safety rules

These are load-bearing. A change that weakens one of them will be refused.

1. Every mod load is wrapped in try/catch — a broken mod must never take the
   game down.
2. Structural mods (scenes, cast, regions) apply at boot only, never mid-session.
3. A mod that declares `requiresMods` will not load without them.
4. Two mods claiming the same `provides` are a conflict; the first wins and the
   second is refused, visibly.
5. `loadAfter` orders mods deterministically.

By Dr. Sohil Momin.
