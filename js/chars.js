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
   DEMO CONTENT — the engine ships an empty achievement list on purpose.
   This is the demo's own, so you can see the shape of one.
   ========================================================================== */

G.TITLE = "Saga (demo)";
G.SLUG  = "saga-demo";

G.ACHIEVEMENTS = {
  first_steps:  { name: "First Steps",     desc: "You played the demo." },
  a_place:      { name: "A Place to Sleep", desc: "You were offered soup." },
  the_long_table: { name: "The Long Table", desc: "You ate at the Keeper's table." },
};
})();
