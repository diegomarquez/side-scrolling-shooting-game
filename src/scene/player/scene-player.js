define(function(require) {
	var gb = require('gb');
	var canvasContainer = require('canvas-container');

	var playerLoader = require('player-scene-loader');
	var loaderContainer = require('loader-container');
	var viewportFollow = require('viewport-follow');
	var playerGetter = require('player-getter')

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
          // playerLoader.load({"name":"TEST","objects":[{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":248,"y":34,"properties":{"args":{"x":248,"y":34},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":41,"y":-1.0000000000000038},{"x":13.000000000000002,"y":-36},{"x":636,"y":-53},{"x":563,"y":-24}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":264,"y":266,"properties":{"args":{"x":264,"y":266},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":28,"y":9.999999999999996},{"x":592,"y":13},{"x":671,"y":48},{"x":3,"y":49}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1651,"y":79,"properties":{"args":{"x":1651,"y":79},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-48,"y":-69},{"x":-5.999999999999997,"y":-101},{"x":151,"y":-87},{"x":136,"y":-47}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":957,"y":37,"properties":{"args":{"x":957,"y":37},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-144,"y":-27.000000000000004},{"x":-70,"y":-55},{"x":689,"y":-59},{"x":646,"y":-27}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1857.33333,"y":33,"properties":{"args":{"x":1857.33333,"y":33},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-71,"y":-1.0000000000000038},{"x":-57,"y":-40},{"x":376,"y":-63},{"x":282,"y":-27}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2275,"y":0,"properties":{"args":{"x":2275,"y":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-136,"y":5.9999999999999964},{"x":-42,"y":-30},{"x":86,"y":-22},{"x":-5,"y":19}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":991.3333299999999,"y":281,"properties":{"args":{"x":991.3333299999999,"y":281},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-135,"y":-1.0000000000000038},{"x":391,"y":-54},{"x":225,"y":29},{"x":-56,"y":34}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1473.66667,"y":281,"properties":{"args":{"x":1473.66667,"y":281},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-258,"y":28.999999999999996},{"x":-91,"y":-54},{"x":584,"y":5.000000000000001},{"x":406,"y":28}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2122.66667,"y":301,"properties":{"args":{"x":2122.66667,"y":301},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-241,"y":9},{"x":-65,"y":-15},{"x":140,"y":-35},{"x":231,"y":7}]},"indexInParent":0}]}},"hasStructuralChanges":false}],"groups":["First"],"viewports":[{"name":"Main","width":400,"height":300,"offsetX":0,"offsetY":0,"scaleX":1,"scaleY":1,"stroke":{"width":1,"color":"#4E91F0"},"worldFit":false,"layers":["Front"]}],"world":{"width":2500,"height":300}});

          playerLoader.load({"name":"TEST_STOPPER","objects":[{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":248,"y":34,"properties":{"args":{"x":248,"y":34},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":41,"y":-1.0000000000000038},{"x":13.000000000000002,"y":-36},{"x":636,"y":-53},{"x":563,"y":-24}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":264,"y":266,"properties":{"args":{"x":264,"y":266},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":28,"y":9.999999999999996},{"x":592,"y":13},{"x":671,"y":48},{"x":3,"y":49}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1651,"y":79,"properties":{"args":{"x":1651,"y":79},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-48,"y":-69},{"x":-5.999999999999997,"y":-101},{"x":151,"y":-87},{"x":136,"y":-47}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":957,"y":37,"properties":{"args":{"x":957,"y":37},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-144,"y":-27.000000000000004},{"x":-70,"y":-55},{"x":689,"y":-59},{"x":646,"y":-27}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1857.33333,"y":33,"properties":{"args":{"x":1857.33333,"y":33},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-71,"y":-1.0000000000000038},{"x":-57,"y":-40},{"x":376,"y":-63},{"x":282,"y":-27}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2275,"y":0,"properties":{"args":{"x":2275,"y":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-136,"y":5.9999999999999964},{"x":-42,"y":-30},{"x":86,"y":-22},{"x":-5,"y":19}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":991.3333299999999,"y":281,"properties":{"args":{"x":991.3333299999999,"y":281},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-135,"y":-1.0000000000000038},{"x":391,"y":-54},{"x":225,"y":29},{"x":-56,"y":34}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1473.66667,"y":281,"properties":{"args":{"x":1473.66667,"y":281},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-258,"y":28.999999999999996},{"x":-91,"y":-54},{"x":584,"y":5.000000000000001},{"x":406,"y":28}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2122.66667,"y":301,"properties":{"args":{"x":2122.66667,"y":301},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-241,"y":9},{"x":-65,"y":-15},{"x":140,"y":-35},{"x":231,"y":7}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"ScrollStopper","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":951,"y":143,"properties":{"args":{"x":951,"y":143}},"hasStructuralChanges":false}],"groups":["First"],"viewports":[{"name":"Main","width":400,"height":300,"offsetX":0,"offsetY":0,"scaleX":1,"scaleY":1,"stroke":{"width":1,"color":"#4E91F0"},"worldFit":false,"layers":["Front"]}],"world":{"width":2500,"height":300}})

          // Get a reference to the player ship
  				var player = playerGetter.get(gb.canvas.width/2 - 300, gb.canvas.height/2);
  				// Block the player controls
          player.blockControls();


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

			gb.reclaimer.claim(this.splash);

    	// Clean up jquery UI
      $(this.mainContainer).toggle();
      // $(this.startButton).button('destroy');
      // $(this.editorButton).button('destroy');
    	// Destroy all of this objects references
    	this._super();
    	// Remove the editor container from the DOM
      // This should take care of any lingering references to events
      $('#main-player-container').remove();

      this.splash = null;
    }
	});

	Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });

	return new ScenePlayer();
})