// side-shmup's main entry point

define(function(require){
  var gb = require('gb');

  var canvasContainer = require('canvas-container');
  var loaderContainer = require('loader-container');
  var sceneEditor = require('scene-editor');
  var scenePlayer = require('scene-player');

  // Storing some references to avoid excesive typing
  var game = gb.game;

  // Populate the pools
  var createScenePlayer = function() {
    game.remove_extension(require("activity-display"));
    game.remove_extension(require("mouse-events"));
    game.remove_extension(require("fit-canvas-in-region"));
    game.remove_extension(require("patch-collider-components"));

    // Populate the pools
    require('common-bundle').create();
    require('ship-bundle').create();
    
    // Detach the canvas container
    canvasContainer.detachCanvas();
    // Create the Scene Player
    scenePlayer.create();
  }

  var createSceneEditor = function() {
    // Populate the pools
    require('common-bundle').create();
    require('ship-bundle').create();
   
    // Detach the canvas container
    canvasContainer.detachCanvas();
    // Create the Scene Editor
    sceneEditor.create();

    game.add_extension(require("activity-display"), { hide: true });
    game.add_extension(require("mouse-events"));
    game.add_extension(require("fit-canvas-in-region"));
    game.add_extension(require("patch-collider-components"));
  }
  
  // This is the main initialization function
  game.on(game.CREATE, this, function() {
  	// Create the scene player
  	createScenePlayer();
  	// Open the loader
    loaderContainer.open();
    
    // createSceneEditor(); 
    // loaderContainer.hide();
  });

  // When the scene player exits...
  scenePlayer.on(scenePlayer.EXIT, this, function() {
  	// Trigger a loader transition
    loaderContainer.transition();

    // When the loader closes...
    loaderContainer.once(loaderContainer.CLOSE, this, function() {
    	// Clean up the scene player view
    	scenePlayer.cleanUp();
    	// Create the scene editor view
    	createSceneEditor();  
    });
  });

  // When the scene editor exits
  sceneEditor.on(sceneEditor.EXIT, this, function() {
  	// Trigger a loader transition
    loaderContainer.transition();

    // When the loader closes
    loaderContainer.once(loaderContainer.CLOSE, this, function() {
    	// Clean up the scene editor view    	
    	sceneEditor.cleanUp();
    	// Create the scene player view
    	createScenePlayer();  
    });
  });
  
  // This is the main update loop
  // game.on(game.UPDATE, this, function() {});

  // This is the main setup that kicks off the whole thing
  // Notice how it needs to find a '#main' and '#game' in the document
  game.create(document.getElementById('main'), document.getElementById('game'));
});
