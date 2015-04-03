define(function(require) {
	var gb = require('gb');
	var root = require('root');
	
	var playerLoader = require('player-scene-loader');
	var viewportFollow = require('viewport-follow');
	var playerGetter = require('player-getter');

	require('tweenlite');

	var GameScenePlayer = require("scene-player").constructor.extend({
		init: function() {
			this._super();
		},

		load: function(sceneData) {
      // Load the Scene
      playerLoader.load(sceneData);
      // Get a reference to the player ship and block it's controls
			playerGetter.get(gb.canvas.width/2 - 300, gb.canvas.height/2).blockControls();
      // Layout all the game objects in the scene
      playerLoader.layout();
		},

		requiredViewports: function() {
			var messagesViewport = gb.viewports.add('Messages', gb.canvas.width, gb.canvas.height);
			messagesViewport.addLayer('Front');
		},

		setCompleteEvents: function() {
			var levelItem = root.findChildren().recurse().firstWithType('LevelItem');

      // If there is no level item, skip all the logic
      if (!levelItem) return;

      var player = playerGetter.get();

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
		}
	});

	return new GameScenePlayer();
})