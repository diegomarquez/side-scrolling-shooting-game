define(function(require) {
	var gb = require('gb');
	
	var playerLoader = require('player-scene-loader');
	var viewportFollow = require('viewport-follow');
	var playerGetter = require('player-getter');

	require('tweenlite');

	var ScenePlayer = require("ui-component").extend({
		init: function() {
			this._super();
		},

		create: function() {
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

      // TODO Listener para indicar que el nivel fue completado
      // player.once(player.EXIT, this, function() {
      // 		this.execute(this.EXIT);
      // });
		}
	});

	Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });

	return new ScenePlayer();
})