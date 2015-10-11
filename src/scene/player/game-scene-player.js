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
		playerGetter.get(-300, gb.canvas.height/2).blockControls();

		// Add the HP meter
		gb.create('HpMeter', 'First', [{viewport: 'Messages', layer: 'Front'}], { x: 0, y: 5 });

		// Layout all the game objects in the scene
		playerLoader.layout();
	},

	setCompleteEvents: function() {
		var levelItem = root.findChildren().recurse().firstWithType('LevelItem');

		var player = playerGetter.get();

		player.once(player.DESTROYED, this, function() {

			gb.groups.stop_update('First');

			// Show the fail message
			gb.create('FailureMessage', 'Second', this.viewports, {
				onComplete: function() {
					// Tween the player out of the screen
					TweenLite.to(player, 1.5, { viewportOffsetX: gb.canvas.width + 200, ease: Back.easeIn, onComplete: function() {
						// Signal the scene player is done 
						this.execute(this.FAILURE);
					}.bind(this)});
				}.bind(this)
			});
		});

		// If there is no level item, skip all the logic
		if (!levelItem) return;

		// Picking up the level item triggers the exit sequence
		levelItem.once('collide', this, function () {
			// Block the player controls
			player.blockControls();

			// Stop updating the logic of all the objects in the first group
			gb.groups.stop_update('First');

			// Stop following the player's ship mvement with the camera
			viewportFollow.unsetFollow('Main', player);

			// Remove the player's ship from the first update group
			gb.groups.get('First').remove(player);

			// Put it in the second group so it continues updating.
			gb.groups.get('Second').add(player);			

			// Show the complete message
			gb.create('CompleteMessage', 'Second', this.viewports, {
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
		TweenLite.to(player, 3, { viewportOffsetX: 150, onComplete: function() {
			gb.create('StartMessage', 'Second', this.viewports, {
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