define(function(require) {
	var gb = require('gb');
	var root = require('root');
	
	var playerLoader = require('player-scene-loader');
	var viewportFollow = require('viewport-follow');
	var playerGetter = require('player-getter');

	require('tweenlite');

	var ScenePlayer = require("ui-component").extend({
		init: function() {
			this._super();

			this.viewports = [{viewport: 'Main', layer: 'Front'}];
		},

		create: function(sceneData) {
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

	Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });

	return new ScenePlayer();
})