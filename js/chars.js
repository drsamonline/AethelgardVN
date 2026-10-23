/* ============================================================
   SAGA ENGINE — characters, regions, expressions

   The cast, mapped to the art that actually exists in the pack.
   `sprite` names a file in assets/sprites. A missing portrait
   degrades to the name only — it never breaks a scene.

   Expressions: the pack has one image per character, so the
   expression is carried by the name line and the tint, not by
   a second file. When expression art is generated later, drop
   `hero_angry.webp` beside `hero.webp` and it is picked up
   automatically — no code change.
   ============================================================ */
"use strict";
(function () {
const G = window.Game;

G.EXPRESSIONS = ["neutral","warm","angry","grieving","startled","wounded","resolute","afraid","gentle","dry"];

G.CHARS = {
  wanderer: { name:"The Wanderer", role:"a traveller", sprite:"wanderer" },
  keeper:   { name:"The Keeper",   role:"of the hall", sprite:"keeper" },
  stranger: { name:"A Stranger",   role:"", sprite:"stranger" },
  voice:    { name:"—", role:"", sprite:"", intro:"" },
};

/* The world. `bg` is the file to draw; several places share one painting
   until more are made — add your own and point this at it. */
G.REGIONS = {
  road: { name:"the road",  bg:"bg_road" },
  hall: { name:"the hall",  bg:"bg_hall" },
};

/* ==========================================================================
   ACHIEVEMENTS — empty by default; declare your own here.
   ========================================================================== */

G.TITLE = "Saga";
G.SLUG  = "saga";

G.ACHIEVEMENTS = {};   /* the engine ships an empty list — declare yours here */
})();
