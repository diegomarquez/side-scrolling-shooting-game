define(function(require) {
	var stateMachineFactory = require("state-machine");
	var gb = require("gb");
	var collisionResolver = require('collision-resolver');

	var playerLoader = require('player-scene-loader');
	var viewportFollow = require('viewport-follow');
	var playerGetter = require('player-getter');

	require('tweenlite');

  return function (name) {
    var state = stateMachineFactory.createState(this, name);

    state.addStartAction(function (args) {
    	// Clear update groups and viewports before doing anything else
    	gb.groups.removeAll();
      gb.viewports.removeAll();

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

		state.addStartAction(function (args) {
			// Load a scene
      // Setup the scene
      playerLoader.load(JSON.parse(require('local-storage').getScene("TEST_BOSS")))
      // Add the player ship to the scene
			var player = playerGetter.get(gb.canvas.width/2 - 300, gb.canvas.height/2);
			// Block the player controls
      player.blockControls();
      // Add the scene game objects
      playerLoader.layout();

      TweenLite.to(player, 3, { viewportOffsetX: gb.canvas.width/2 - 150, onComplete: function() {
      	gb.create('StartMessage', 'First', [{viewport: 'Main', layer: 'Front'}], {
      		onComplete: function() {
        		// Unblock controls when the start message is gone
         		player.unblockControls();

        		// Set the main viewport to follow the player movement
        		viewportFollow.setFollow('Main', player);
        	}
        });	
      }});
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
    });

    Object.defineProperty(state, "BACK", { get: function() { return 'back'; } });

    return state;
  };
});   

  