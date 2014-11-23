// side-shmup's main entry point

define(function(require){
  var gb = require('gb');

  var bodyContentCache = require('body-content-cache');
  var sceneEditor = require('scene-editor');
  var scenePlayer = require('scene-player');

  // Storing some references to avoid excesive typing
  var game = gb.game;

  game.add_extension(require("mouse-events"));

  require('ship-bundle').create();
  
  // This is the main initialization function
  game.on(game.CREATE, this, function() {
    // scenePlayer.create();
    // bodyContentCache.saveBodyContent();
    // 
    
    sceneEditor.create();
  });
  
  // sceneEditor.on(sceneEditor.EXIT, this, function() {
  //   // Create the Scene Player
  //   scenePlayer.create();
  //   // Cache the current state of the body tag
  //   bodyContentCache.saveBodyContent();
  // });

  // scenePlayer.on(scenePlayer.EXIT, this, function() {
  //   // Create the Scene Editor
  //   sceneEditor.create();
  //   // Cache the current state of the body tag
  //   bodyContentCache.saveBodyContent();
  // });

  // This is the main update loop
  game.on(game.UPDATE, this, function() {});

  // This is the main setup that kicks off the whole thing
  // Notice how it needs to find a '#main' and '#game' in the document
  game.create(document.getElementById('main'), document.getElementById('game'));
});
