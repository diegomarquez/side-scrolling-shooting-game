define(function(require) {
	var gb = require('gb');
	var canvasContainer = require('canvas-container');

	var playerLoader = require('player-scene-loader');
	var loaderContainer = require('loader-container');
	var viewportFollow = require('viewport-follow');
	var playerGetter = require('player-getter');

	require('tweenlite');

	var ScenePlayer = require("ui-component").extend({
		init: function() {
			this._super();
		},

		create: function() {
			// Setup display for the splash screen
			gb.groups.add("First");
    	var mainViewport = gb.viewports.add("Main", gb.canvas.width, gb.canvas.height, 0, 0);
    	mainViewport.addLayer("Front");

    	loaderContainer.once(loaderContainer.TRANSITION, this, this.doSplash);
    	loaderContainer.once(loaderContainer.OPEN, this, this.doSplash);

			// Main Player container
			this.mainContainer = document.createElement('div');
			this.mainContainer.id = 'main-player-container';
			document.body.appendChild(this.mainContainer);

			this.mainContainer.appendChild(canvasContainer.getCanvasContainer());
		},

		doSplash: function() {
			this.splash = gb.create('Title', 'First', [{viewport: 'Main', layer: 'Front'}], {
  			onPlay: function() {
  				this.splash.reverse();
  			}.bind(this),
  			
  			onEdit: function() {
  				this.execute(this.EXIT);
  			}.bind(this),

  			onExitComplete: function() {
  				// Load a scene
          // Setup the scene
          playerLoader.load(JSON.parse(require('local-storage').getScene("TEST_BOSS")))
          // Get a reference to the player ship
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
  			}.bind(this)
  		});
		},

		cleanUp: function() {
			loaderContainer.remove(loaderContainer.TRANSITION, this, this.doSplash);
    	loaderContainer.remove(loaderContainer.OPEN, this, this.doSplash);

    	// Clean up jquery UI
      $(this.mainContainer).toggle();
      
      // Claim all Game Objects and clean up the pools from instances
      gb.reclaimer.clearAllObjectsFromPools();
      // Remove all update groups
      gb.groups.removeAll();
      // Remove all Viewports
      gb.viewports.removeAll();
      // Destroy the pools
      gb.reclaimer.clearAllPools();

    	this._super();
    	// Remove the editor container from the DOM
      // This should take care of any lingering references to events
      $('#main-player-container').remove();
    }
	});

	Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });

	return new ScenePlayer();
})