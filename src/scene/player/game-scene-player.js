define(function(require) {
	var gb = require('gb');
	var root = require('root');
	var util = require('util');

	var playerLoader = require('player-scene-loader');
	var viewportFollow = require('viewport-follow');
	var playerGetter = require('player-getter');
	var soundPlayer = require('sound-player');

	require("TweenLite");
	require("EasePack");

	var GameScenePlayer = require("scene-player").constructor.extend({
		init: function() {
			this._super();
		},

		load: function(sceneData) {
			// Load the Scene
			playerLoader.load(sceneData);

			// Get a reference to the player ship, place it outside the screen and block it's controls
			var player = playerGetter.get(-200, -200).blockControls();

			// Disable all player collisions
			playerGetter.get().findComponents().firstWithProp('collider').disable();

			// Add the HP meter
			gb.create('HpMeter', 'First', [{viewport: 'Messages', layer: 'Front'}], { x: 0, y: 5 });

			// Layout all the game objects in the scene
			playerLoader.layout();
		},

		getSceneLoader: function() {
			return playerLoader;
		},

		setCompleteEvents: function() {
			var levelItems = root.findChildren().recurse().all(function(child) {
				return child.poolId == 'LevelItem' || child.poolId == 'AllBossDefeatLevelItem';
			});

			var player = playerGetter.get();

			player.once(player.NO_CONTROL, this, function() {
				this.blockEscape = true;
			});

			player.once(player.DESTROYED, this, function() {
				gb.groups.stop_update('First');
				
				soundPlayer.disableNewPlayback();
				soundPlayer.stop("enemy");
				
				this.blockEscape = true;

				// Show the fail message
				gb.create('FailureMessage', 'Second', this.viewports, {
					onComplete: function() {
						this.blockEscape = false;
						this.execute(this.FAILURE);
					}.bind(this)
				});
			});

			// If there is no level item, skip all the logic
			if (!levelItems) return;

			for (var i = 0; i < levelItems.length; i++) {
				var levelItem = levelItems[i];

				// Picking up the level item triggers the exit sequence
				levelItem.once('collide', this, function () {
					// Block the player controls
					player.blockControls();
					
					// TODO: Stop current sounds, except the win jingle
					// TODO: Prevent further playback of anything except the win jingle
					
					// Stop updating the logic of all the objects in the first group
					gb.groups.stop_update('First');

					// Stop following the player's ship movement with the camera
					viewportFollow.unsetFollow('Main', player);

					// Remove the player's ship from the first update group
					gb.groups.get('First').remove(player);

					// Start the player and all of it's children because they where stopped when calling stop_update
					player.run();
					// Disable all player collisions
					player.findComponents().firstWithProp('collider').enable();
					// Put it in the second group so it continues updating.
					gb.groups.get('Second').add(player);

					this.blockEscape = true;

					// Show the complete message
					gb.create('CompleteMessage', 'Second', this.viewports, {
						onComplete: function() {
							var d = player.getDirection();

							// Right
							if (d === 0) {
								// Tween the player out of the screen
								TweenLite.to(player, 1.5, { viewportOffsetX: gb.canvas.width + 200, ease: Back.easeIn, onComplete: function() {
									// Signal the scene player is done
									this.execute(this.EXIT);
								}.bind(this)});

								return;
							}

							// Left
							if (d === 180) {
								// Tween the player out of the screen
								TweenLite.to(player, 1.5, { viewportOffsetX: -200, ease: Back.easeIn, onComplete: function() {
									// Signal the scene player is done
									this.execute(this.EXIT);
								}.bind(this)});

								return;
							}

							// Up
							if (d === 270) {
								// Tween the player out of the screen
								TweenLite.to(player, 1.5, { viewportOffsetY: -200, ease: Back.easeIn, onComplete: function() {
									// Signal the scene player is done
									this.execute(this.EXIT);
								}.bind(this)});

								return;
							}

							// Down
							if (d === 90) {
								// Tween the player out of the screen
								TweenLite.to(player, 1.5, { viewportOffsetY: gb.canvas.height + 200, ease: Back.easeIn, onComplete: function() {
									// Signal the scene player is done
									this.execute(this.EXIT);
								}.bind(this)});

								return;
							}
						}.bind(this)
					});
				});
			}
		},

		start: function() {
			var player = playerGetter.get();

			var self = this;

			var startPosition = root.findChildren().recurse().firstWithType("StartPosition");
			
			if (startPosition)
				gb.reclaimer.mark(startPosition);

			if (!startPosition) {
				player.viewportOffsetX = -300;
				player.viewportOffsetY = gb.canvas.height/2;

				player.move(0);

				// Tween the player ship into view
				TweenLite.to(player, 3, { viewportOffsetX: 150, onComplete: function() {
					gb.create('StartMessage', 'Second', this.viewports, {
						onComplete: function() {
							// Unblock controls when the start message is gone
							player.unblockControls();
							// Enable all player collisions
							player.findComponents().firstWithProp('collider').enable();

							// Set the main viewport to follow the player movement
							viewportFollow.setFollow('Main', player);

							soundPlayer.stop("INTRO");

							self.blockEscape = false;
						}
					});
				}.bind(this)});

				return;
			}

			if (startPosition.type === "right") {
				player.viewportOffsetX = -300;
				player.viewportOffsetY = gb.canvas.height/2;

				player.move(0);

				// Tween the player ship into view
				TweenLite.to(player, 3, { viewportOffsetX: 150, onComplete: function() {
					gb.create('StartMessage', 'Second', this.viewports, {
						onComplete: function() {
							// Unblock controls when the start message is gone
							player.unblockControls();
							// Enable all player collisions
							player.findComponents().firstWithProp('collider').enable();

							// Set the main viewport to follow the player movement
							viewportFollow.setFollow('Main', player);

							soundPlayer.stop("INTRO");

							self.blockEscape = false;
						}
					});
				}.bind(this)});

				return;
			}

			if (startPosition.type === "left") {
				player.viewportOffsetX = gb.canvas.width + 300;
				player.viewportOffsetY = gb.canvas.height/2;

				player.move(180);

				// Tween the player ship into view
				TweenLite.to(player, 3, { viewportOffsetX: gb.canvas.width - 150, onComplete: function() {
					gb.create('StartMessage', 'Second', this.viewports, {
						onComplete: function() {
							// Unblock controls when the start message is gone
							player.unblockControls();
							// Enable all player collisions
							player.findComponents().firstWithProp('collider').enable();

							// Set the main viewport to follow the player movement
							viewportFollow.setFollow('Main', player);

							soundPlayer.stop("INTRO");

							self.blockEscape = false;
						}
					});
				}.bind(this)});

				return;
			}

			if (startPosition.type === "up") {
				player.viewportOffsetX = gb.canvas.width/2;
				player.viewportOffsetY = gb.canvas.height + 300;

				player.move(270);

				// Tween the player ship into view
				TweenLite.to(player, 3, { viewportOffsetY: gb.canvas.height - 150, onComplete: function() {
					gb.create('StartMessage', 'Second', this.viewports, {
						onComplete: function() {
							// Unblock controls when the start message is gone
							player.unblockControls();
							// Enable all player collisions
							player.findComponents().firstWithProp('collider').enable();

							// Set the main viewport to follow the player movement
							viewportFollow.setFollow('Main', player);

							soundPlayer.stop("INTRO");

							self.blockEscape = false;
						}
					});
				}.bind(this)});

				return;
			}

			if (startPosition.type === "down") {
				player.viewportOffsetX = gb.canvas.width/2;
				player.viewportOffsetY = -300;

				player.move(90);

				// Tween the player ship into view
				TweenLite.to(player, 3, { viewportOffsetY: 150, onComplete: function() {
					gb.create('StartMessage', 'Second', this.viewports, {
						onComplete: function() {
							// Unblock controls when the start message is gone
							player.unblockControls();
							// Enable all player collisions
							player.findComponents().firstWithProp('collider').enable();

							// Set the main viewport to follow the player movement
							viewportFollow.setFollow('Main', player);

							soundPlayer.stop("INTRO");

							self.blockEscape = false;
						}
					});
				}.bind(this)});

				return;
			}
		}
	});

	return new GameScenePlayer();
})