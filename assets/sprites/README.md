# Placeholder art

These are **generated placeholders**, not the game's artwork. They exist only so
the demo runs with something on screen. They are MIT-licensed like the engine.

Replace them with your own art. The engine finds a portrait by name:

    char.<id>.<expression>  ->  <sprite>_<expression>.webp, then <sprite>.webp

and a background by region:

    bg.<region>  ->  bg_<region>.webp

Then rebuild the index:  `python3 tools/make-sprite-index.py assets/sprites`
