/* SAGA ENGINE — scene manifest
   The running order. Add a line and the chapter appears.
   A mod can push onto this array without touching the engine. */
window.Game = window.Game || {};
window.Game.SCENE_MANIFEST = [
  { id:"hello", book:1, title:"Hello — the sample chapter", file:"scenes/hello.scene" }
];
