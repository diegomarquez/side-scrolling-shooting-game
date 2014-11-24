// side-shmup's main entry point

define(function(require){
  var gb = require('gb');

  var canvasContainer = require('canvas-container');
  var sceneEditor = require('scene-editor');
  var scenePlayer = require('scene-player');

  // Storing some references to avoid excesive typing
  var game = gb.game;

  game.add_extension(require("mouse-events"));

  // Populate the pools
  // require('ship-bundle').create();

  var createScenePlayer = function() {
    // Detach the canvas container
    canvasContainer.detachCanvas();
    // Create the Scene Player
    scenePlayer.create();
  }

  var createSceneEditor = function() {
    // Populate the pools
    require('ship-bundle').create();

    // Detach the canvas container
    canvasContainer.detachCanvas();
    // Create the Scene Editor
    sceneEditor.create();
  }
  
  // This is the main initialization function
  game.on(game.CREATE, this, function() {
    createScenePlayer();

    scenePlayer.on(scenePlayer.EXIT, this, function() {
      createSceneEditor();
    });

    sceneEditor.on(sceneEditor.EXIT, this, function() {
      createScenePlayer();
    });
  });
  
  // This is the main update loop
  // game.on(game.UPDATE, this, function() {});

  // This is the main setup that kicks off the whole thing
  // Notice how it needs to find a '#main' and '#game' in the document
  game.create(document.getElementById('main'), document.getElementById('game'));
});
