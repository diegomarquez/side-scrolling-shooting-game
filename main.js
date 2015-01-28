// side-shmup's main entry point

define(function(require){
  var gb = require('gb');

  var canvasContainer = require('canvas-container');
  var loaderContainer = require('loader-container');
  var sceneEditor = require('scene-editor');
  var scenePlayer = require('scene-player');

  var keyboard = require('keyboard');

  // Storing some references to avoid excesive typing
  var game = gb.game;

  game.add_extension(require("patch-collider-components"));

  // Populate the pools
  var createScenePlayer = function() {
    game.remove_extension(require("activity-display"));
    game.remove_extension(require("mouse-events"));
    game.remove_extension(require("fit-canvas-in-region"));

    // Populate the pools
    require('common-bundle').create();
    require('ship-bundle').create();
    require('cannon-bundle').create();
    require('bullets-bundle').create();
    require('obstacle-bundle').create();
    require('boss-bundle').create();

    // Detach the canvas container
    canvasContainer.detachCanvas();
    // Create the Scene Player
    scenePlayer.create();
  }

  var createSceneEditor = function() {
    // Populate the pools
    require('common-bundle').create();
    require('ship-bundle').create();
    require('cannon-bundle').create();
    require('bullets-bundle').create();
    require('obstacle-bundle').create();
    require('boss-bundle').create();
   
    // Detach the canvas container
    canvasContainer.detachCanvas();
    // Create the Scene Editor
    sceneEditor.create();

    game.add_extension(require("activity-display"), { hide: true });
    game.add_extension(require("mouse-events"));
    game.add_extension(require("fit-canvas-in-region"));
  }
  
  // This is the main initialization function
  game.on(game.CREATE, this, function() {
  	// Create the scene player
  	// createScenePlayer();
  	// Open the loader
    // loaderContainer.open();

    // gb.groups.add("First");
    // var mainViewport = gb.viewports.add("Main", gb.canvas.width, gb.canvas.height, 0, 0);
    // mainViewport.addLayer("Front");

    // var ship = gb.create('PlayerShipPolygon', 'First', [{viewport: 'Main', layer: 'Front'}]);

    // ship.x = 200;
    // ship.y = 150;

    // var cannon = gb.create('Cannon_0', 'First', [{viewport: 'Main', layer: 'Front'}], {
    // 	target: ship
    // });

    // cannon.x = 100;
    // cannon.y = 100;

    // cannon = gb.create('Cannon_90', 'First', [{viewport: 'Main', layer: 'Front'}], {
    // 	target: ship
    // });

    // cannon.x = 300;
    // cannon.y = 100;

    // cannon = gb.create('Cannon_180', 'First', [{viewport: 'Main', layer: 'Front'}], {
    // 	target: ship
    // });

    // cannon.x = 100;
    // cannon.y = 250;

    // cannon = gb.create('Cannon_270', 'First', [{viewport: 'Main', layer: 'Front'}], {
    // 	target: ship
    // });

    // cannon.x = 300;
    // cannon.y = 250;

    // keyboard.onKeyDown(keyboard.A, this, function() {
    // 	mainViewport.x += 10;
    // });

    // keyboard.onKeyDown(keyboard.D, this, function() {
    // 	mainViewport.x -= 10;
    // });

    createSceneEditor(); 
    loaderContainer.hide();
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
