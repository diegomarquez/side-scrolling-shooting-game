define(function(require) {
	var gb = require('gb');
	var root = require('root');
	
	var canvasContainer = require('canvas-container');
	var playerLoader = require('player-scene-loader');
	var viewportFollow = require('viewport-follow');
	var playerGetter = require('player-getter');
	var keyboard = require('keyboard');
	var collisionResolver = require('collision-resolver');

	require('tweenlite');

	var ScenePlayer = require("ui-component").extend({
		init: function() {
			this._super();

			this.viewports = [{viewport: 'Main', layer: 'Front'}];
		},

		create: function(sceneData) {
			// Setup pools for the scene player
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

			// Wrap the canvas into a div only if the div is not already there
	    if (!document.getElementById('main-player-container')) {
	    	this.mainContainer = document.createElement('div');
				this.mainContainer.id = 'main-player-container';
				document.body.appendChild(this.mainContainer);
				canvasContainer.detachCanvas();
				this.mainContainer.appendChild(canvasContainer.getCanvasContainer());	
	    }

			// Load a scene
      // Setup the scene
      playerLoader.load(sceneData);
      // Get a reference to the player ship
			var player = playerGetter.get(gb.canvas.width/2 - 300, gb.canvas.height/2);
			// Block the player controls
      player.blockControls();
      // Add the scene game objects
      playerLoader.layout();

      var levelItem = root.findChildren().recurse().firstWithType('LevelItem');

      // Create the Messages viewport in case the scene does not specify it
			var messagesViewport = gb.viewports.add('Messages', gb.canvas.width, gb.canvas.height);
			messagesViewport.addLayer('Front');

			keyboard.onKeyDown(keyboard.ESC, this, escape);

      // If there is no level item, skip all the logic as this might be the preview
      if (!levelItem) return;

      // Picking up the level item triggers the exit sequence
      levelItem.once('collide', this, function () {
      	// Block the player controls
        player.blockControls();

        // Show the complete message
        gb.create('CompleteMessage', 'First', this.viewports, {
      		onComplete: function() {
      			// Tween the player out of the screen
      			TweenLite.to(player, 1.5, { viewportOffsetX: gb.canvas.width + 200, ease: Back.easeIn, onComplete: function() {
      				// Signal the scene player is done 
	      			this.execute(this.EXIT);
	      		}.bind(this)});
        	}.bind(this)
        });
      });
		},

		start: function() {
			var player = playerGetter.get();

			// Tween the player ship into view
      TweenLite.to(player, 3, { viewportOffsetX: gb.canvas.width/2 - 150, onComplete: function() {
      	gb.create('StartMessage', 'First', this.viewports, {
      		onComplete: function() {
        		// Unblock controls when the start message is gone
         		player.unblockControls();

        		// Set the main viewport to follow the player movement
        		viewportFollow.setFollow('Main', player);
        	}
        });	
      }.bind(this)});
		},

		decorateContainer: function(title, caption) {
			var titleContainer = document.createElement('div');
			var captionContainer = document.createElement('div');

			titleContainer.id = 'player-title';
			captionContainer.id = 'player-caption'

			titleContainer.appendChild(document.createTextNode(title));
			captionContainer.appendChild(document.createTextNode(caption));

			this.mainContainer.appendChild(titleContainer);
			this.mainContainer.appendChild(captionContainer);
		},

		cleanUp: function() {
			// Collision pairs removal
	  	collisionResolver.removeCollisionPair('basicBulletColliderId', 'bossColliderId');
	  	collisionResolver.removeCollisionPair('basicBulletColliderId', 'cannonColliderId');
	  	
	  	collisionResolver.removeCollisionPair('obstacleColliderId', 'shipColliderId');
	  	collisionResolver.removeCollisionPair('obstacleColliderId', 'cannonBulletColliderId');
	  	collisionResolver.removeCollisionPair('obstacleColliderId', 'basicBulletColliderId');
	  	
	  	collisionResolver.removeCollisionPair('shipColliderId', 'cannonBulletColliderId');
	  	collisionResolver.removeCollisionPair('shipColliderId', 'levelItemColliderId');

			// Save the canvas for later use
    	canvasContainer.detachCanvas();
      
      // Remove the escape listener
      keyboard.removeKeyDown(keyboard.ESC, this, escape);

			this._super();
			
			// Remove the canvas container from the DOM
      $(this.mainContainer).remove();
		}
	});

	var escape = function() {
		this.execute(this.ESCAPE);
	}

	Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });
	Object.defineProperty(ScenePlayer.prototype, "ESCAPE", { get: function() { return 'escape'; } });

	return new ScenePlayer();
})