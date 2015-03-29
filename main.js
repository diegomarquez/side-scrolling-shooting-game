// side-shmup's main entry point

define(function(require){
  var gb = require('gb');

  var canvasContainer = require('canvas-container');
  var loaderContainer = require('loader-container');
  var sceneEditor = require('scene-editor');
  var scenePlayer = require('scene-player');

  var viewportFollow = require('viewport-follow');
  var collisionResolver = require('collision-resolver');

  // Storing some references to avoid excesive typing
  var game = gb.game;

  game.add_extension(require("patch-collider-components"));

  // Populate the pools
  var createScenePlayer = function() {
    // game.remove_extension(require("activity-display"));
    // game.remove_extension(require("logger"));
    // game.remove_extension(require("mouse-events"));
    // game.remove_extension(require("fit-canvas-in-region"));
    
    // game.add_extension(require("center-canvas"));

    // Populate the pools
    // require('common-bundle').create();
    // require('ship-bundle').create();
    // require('cannon-bundle').create();
    // require('bullets-bundle').create();
    // require('obstacle-bundle').create();
    // require('boss-bundle').create();
    // require('splash-bundle').create();
    // require('messages-bundle').create();
    // require('control-objects-bundle').create();
    // require('items-bundle').create();

    // Collision pairs setup
    // collisionResolver.addCollisionPair('basicBulletColliderId', 'bossColliderId');
    // collisionResolver.addCollisionPair('basicBulletColliderId', 'cannonColliderId');
    
    // collisionResolver.addCollisionPair('obstacleColliderId', 'shipColliderId');
    // collisionResolver.addCollisionPair('obstacleColliderId', 'cannonBulletColliderId');
    // collisionResolver.addCollisionPair('obstacleColliderId', 'basicBulletColliderId');
    
    // collisionResolver.addCollisionPair('shipColliderId', 'cannonBulletColliderId');
    // collisionResolver.addCollisionPair('shipColliderId', 'levelItemColliderId');    

    // Detach the canvas container
    // canvasContainer.detachCanvas();
    // Create the Scene Player
    // scenePlayer.create();
  }

  var createSceneEditor = function() {
  	// Collision pairs removal
  	// collisionResolver.removeCollisionPair('basicBulletColliderId', 'bossColliderId');
  	// collisionResolver.removeCollisionPair('basicBulletColliderId', 'cannonColliderId');
  	
  	// collisionResolver.removeCollisionPair('obstacleColliderId', 'shipColliderId');
  	// collisionResolver.removeCollisionPair('obstacleColliderId', 'cannonBulletColliderId');
  	// collisionResolver.removeCollisionPair('obstacleColliderId', 'basicBulletColliderId');
  	
  	// collisionResolver.removeCollisionPair('shipColliderId', 'cannonBulletColliderId');
  	// collisionResolver.removeCollisionPair('shipColliderId', 'levelItemColliderId');

  	game.remove_extension(require("center-canvas"));

    // Populate the pools
    require('common-bundle').create();
    require('ship-bundle').create();
    require('cannon-bundle').create();
    require('obstacle-bundle').create();
    require('boss-bundle').create();
    require('control-objects-bundle').create();
    require('items-bundle').create();
   
    // Detach the canvas container
    // canvasContainer.detachCanvas();
    // Create the Scene Editor
    // sceneEditor.create();

    // game.add_extension(require("activity-display"), { hide: true });
    // game.add_extension(require("logger"), { hide: true });
    // game.add_extension(require("mouse-events"));
    // game.add_extension(require("fit-canvas-in-region"));
  }
  
  var stateMachineFactory = require('state-machine');
  var mainStateMachine = stateMachineFactory.createFixedStateMachine(); 

  mainStateMachine.add((require('splash-state'))('splash_state'));
  mainStateMachine.add((require('game-modes-state'))('game_modes_state'));

  // This is the main initialization function
  game.on(game.CREATE, this, function() {
  	// Start the main state machine
  	mainStateMachine.start();
  	// Open the loader
    loaderContainer.open();
  });

  // This is the main update loop
  game.on(game.UPDATE, this, function (delta) {
  	mainStateMachine.update(delta);
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

  // This is the main setup that kicks off the whole thing
  game.create();
});
