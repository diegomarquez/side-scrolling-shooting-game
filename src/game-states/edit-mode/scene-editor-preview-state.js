define(function(require) {
	var stateMachineFactory = require("state-machine");
	var gb = require("gb");
	var collisionResolver = require('collision-resolver');
	var viewportFollow = require('viewport-follow');
	var scenePlayer = require('scene-player');
	var localStorageWrapper = require('local-storage');
	var loaderContainer = require('loader-container');

  return function (name) {
    var state = stateMachineFactory.createState(this, name);

    state.addStartAction(function (args) {
    	// Clear update groups and viewports before doing anything else
    	gb.groups.removeAll();
      gb.viewports.removeAll();

      // Add extensions
	    gb.game.add_extension(require("center-canvas"));

    	// Setup pools for the scene player state
    	require('common-bundle').create();
    	require('ship-bundle').create();
    	require('cannon-bundle').create();
    	require('bullets-bundle').create();
    	require('obstacle-bundle').create();
    	require('boss-bundle').create();
    	require('messages-bundle').create();
    	require('control-objects-bundle').create();
    	require('items-bundle').create(); 

    	// Collision pairs setup
    	collisionResolver.addCollisionPair('basicBulletColliderId', 'bossColliderId');
	    collisionResolver.addCollisionPair('basicBulletColliderId', 'cannonColliderId');
	    
	    collisionResolver.addCollisionPair('obstacleColliderId', 'shipColliderId');
	    collisionResolver.addCollisionPair('obstacleColliderId', 'cannonBulletColliderId');
	    collisionResolver.addCollisionPair('obstacleColliderId', 'basicBulletColliderId');
	    
	    collisionResolver.addCollisionPair('shipColliderId', 'cannonBulletColliderId');
	    collisionResolver.addCollisionPair('shipColliderId', 'levelItemColliderId');
    });

		state.addStartAction(function () {
			var previewScene = JSON.parse(localStorageWrapper.getPreviewScene());

			scenePlayer.once(scenePlayer.ESCAPE, this, function () {
				// Wait for the loader to close before going back to the previous state
				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					// Go back to the overview state
					state.execute(state.PREVIOUS, { nextInitArgs: previewScene, lastCompleteArgs: null });	
				});

				loaderContainer.transition();
			});

			// Wait for the loader to complete a transition before playing the scene
			loaderContainer.once(loaderContainer.TRANSITION, this, function() {
				scenePlayer.start();	
			});

			// Load the scene
			scenePlayer.create(previewScene);
			// Decorate the scene player container
			scenePlayer.decorateContainer('Scene Preview', 'Press "ESC" key to exit');
		});

		state.addUpdateAction(function (delta) {
			viewportFollow.update(delta);
		});

    state.addCompleteAction(function (args) {
      // Signal that pools and the instances they hold should be cleared
    	gb.reclaimer.clearAllObjectsFromPools().now();
    	gb.reclaimer.clearAllPools().now();

    	// Collision pairs removal
	  	collisionResolver.removeCollisionPair('basicBulletColliderId', 'bossColliderId');
	  	collisionResolver.removeCollisionPair('basicBulletColliderId', 'cannonColliderId');
	  	
	  	collisionResolver.removeCollisionPair('obstacleColliderId', 'shipColliderId');
	  	collisionResolver.removeCollisionPair('obstacleColliderId', 'cannonBulletColliderId');
	  	collisionResolver.removeCollisionPair('obstacleColliderId', 'basicBulletColliderId');
	  	
	  	collisionResolver.removeCollisionPair('shipColliderId', 'cannonBulletColliderId');
	  	collisionResolver.removeCollisionPair('shipColliderId', 'levelItemColliderId');

	  	// Clean up the scene player    	
		  scenePlayer.cleanUp();
    });

    return state;
  };
});   

  