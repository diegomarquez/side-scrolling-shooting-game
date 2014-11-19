// side-shmup's main entry point

define(function(require){
  var gb = require('gb');

  var sceneEditor = require('scene-editor');

  // Storing some references to avoid excesive typing
  var game = gb.game;

  game.add_extension(require("mouse-events"));

  // This is the main initialization function
  game.on(game.CREATE, this, function() {
    require('ship-bundle').create();
    
    sceneEditor.create();
  });

  // This is the main update loop
  game.on(game.UPDATE, this, function() {

  });

  // This is the main setup that kicks off the whole thing
  // Notice how it needs to find a '#main' and '#game' in the document
  game.create(document.getElementById('main'), document.getElementById('game'));
});
