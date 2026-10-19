/* SAGA ENGINE — scene manifest
   The running order. Add a line and the chapter appears.
   A mod can push onto this array without touching the engine. */
window.Game = window.Game || {};
window.Game.SCENE_MANIFEST = [
  { id:"d1-01", book:1, title:"The Demo — Chapter One", file:"scenes/demo/d1-01.scene" },
  { id:"d1-02", book:1, title:"The Demo — Chapter Two", file:"scenes/demo/d1-02.scene" },
  { id:"end-dawn",     book:1, title:"Ending", file:"scenes/endings/end-dawn.scene" },
  { id:"end-long_road",book:1, title:"Ending", file:"scenes/endings/end-long_road.scene" },
  { id:"end-weight",   book:1, title:"Ending", file:"scenes/endings/end-weight.scene" },
  { id:"end-ash",      book:1, title:"Ending", file:"scenes/endings/end-ash.scene" },
  { id:"end-crown",    book:1, title:"Ending", file:"scenes/endings/end-crown.scene" },
  { id:"end-silence",  book:1, title:"Ending", file:"scenes/endings/end-silence.scene" },
  { id:"end-hollow",   book:1, title:"Ending", file:"scenes/endings/end-hollow.scene" }
];
