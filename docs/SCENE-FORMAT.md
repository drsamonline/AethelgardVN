# The scene format

<p align="center">
  <img src="https://img.shields.io/badge/format-plain%20text-blue" alt="Plain text format">
  <img src="https://img.shields.io/badge/build%20step-none-orange" alt="No build step">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License">
</p>

A chapter is a plain text file. You can write one in a notebook. Nothing here
needs a compiler or a build step.

## The basics

One instruction per line. Blank lines are ignored. `#` starts a comment.

```
@bg hall
@mood uneasy

narrate The fire had been out for an hour, and the Wanderer was still pretending it hadn't.
narrate She had built it herself, badly.

keeper warm "You're doing it again."
wanderer neutral "Doing what."
```

- `narrate <text>` — narration, no portrait
- `<character> <expression> <text>` — spoken line, with a portrait. The
  expressions are `neutral`, `warm`, `angry`, `grieving`, `startled`,
  `wounded`, `resolute`, `afraid`, `gentle` and `dry`.
- `@bg <region>` — set the background. **This takes a region key** from
  `G.REGIONS` (`road`, `hall`, …), not a file name.
- `@mood <name>` — set the music mood (`calm`, `uneasy`, `grief`, `dread`,
  `hope`, `combat`, `boss`)

The text after the instruction is taken literally, so punctuation and quotes are
yours to use or leave out.

## Choices

```
choice
* "Tell him he's right"            => truth+1
* "Say nothing"                    => conviction+1
* [Bonds 2] "Ask about the whistle" => lore:the_whistle
end
```

- `*` starts an option. The text is what the player reads.
- `[Bonds 2]` at the front is a **requirement**: an axis name and a minimum
  value (or any flag string). If the player does not meet it, the option is
  shown greyed out with the reason — it is never hidden. This is the
  Magium rule: you should always be able to see what you missed.
- `=>` introduces the effects, separated by commas.

### Effects

| effect | meaning |
|---|---|
| `mercy+1` `truth-2` `bonds+1` `conviction+2` | move an axis |
| `flag:stepped_over_rope` | set a flag (the story remembers) |
| `lore:the_whistle` | add a Diary entry under Lore |
| `diary decisions <text>` | add a Diary entry under Decisions |
| `ach:the_one_who_got_up` | unlock an achievement |
| `goto label_name` | jump to `@label label_name` |
| `end` | end the scene |

## Labels and branching

```
@label after_the_choice

... the canonical path continues here ...

@label stayed_down

... the other path ...

@goto after_the_choice
```

Labels are how a fork rejoins the spine. Most branches are short — three or four
lines — and then `@goto` back.

## Conditions

```
@if flag:stepped_over_rope
  narrate She remembered the rope, and the rain, and the boy holding his mother's coat.
@endif

@if mercy>=6
  narrate Somewhere in the last three years she had stopped being able to do the arithmetic.
@endif

@if !flag:slept_in_the_hall
  narrate The bed had not been asked for, so it had not been given.
@endif
```

Conditions read:

- `flag:<name>` — is the flag set?
- `!flag:<name>` — negation of any condition
- `mercy>=6`, `truth<3`, `bonds==0` — an axis against a number
- `bonds>mercy` — one axis against another
- `book>=2` — the current book number

## Meta instructions

| instruction | meaning |
|---|---|
| `@title <text>` | set the chapter title |
| `@scene <id>` | the scene's id (used for saves and jump-back) |
| `@card <character>` | show the intro card — first time only, tracked automatically |
| `@diary people <text>` | add a Diary entry (`people`, `places`, `decisions`, or lore) |
| `@ach <id>` | unlock an achievement — **the id**, e.g. `first_steps`, not the display name |
| `@requires <flag>` | skip the whole scene if the flag is absent |
| `@ending <id>` | mark this as an ending scene; resolves to the ending card |
| `@finish` | end the run here and let the resolver pick the ending |

An unknown `@instruction` is ignored, never fatal — so a newer format still
loads in an older engine.

## Scene files and the manifest

```
scenes/
  manifest.js          <- the running order: one line per chapter
  demo/
    d1-01.scene
    d1-02.scene
  endings/
    end-dawn.scene     <- ...and the six others
```

The engine loads exactly what `scenes/manifest.js` lists, in list order:

```js
window.Game.SCENE_MANIFEST = [
  { id:"d1-01", book:1, title:"The Demo — Chapter One", file:"scenes/demo/d1-01.scene" },
  // ...
];
```

Add a line and the chapter appears; the first line is where a new game starts.
Mods push onto this list too — see `mods/README.md`.

## The four axes

Every choice moves one or more. They are hidden during play and revealed in the
epilogue. The ending is a *shape*, not a score:

| axis | high reads as | low reads as |
|---|---|---|
| **Mercy** | spare, forgive, listen | kill, punish, close off |
| **Truth** | tell, admit, ask | conceal, deflect, pretend |
| **Bonds** | lean on others, trust | stand alone, push away |
| **Conviction** | believe in something | doubt, hedge, give up |

Seven endings resolve from that shape — see `js/endings.js` and the README.

## Why plain text

Because the writing is the expensive part, and the writing should not be locked
inside a format that only one program can read. Every chapter in this game is a
text file you can open, edit, diff, translate, or hand to somebody else.
