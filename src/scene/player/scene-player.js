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
          // Setup the scene
          playerLoader.load({"name":"TEST_BOSS","objects":[{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":248,"y":34,"properties":{"args":{"x":248,"y":34,"rotation":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":41,"y":-1.0000000000000038},{"x":13.000000000000002,"y":-36},{"x":636,"y":-53},{"x":563,"y":-24}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":264,"y":266,"properties":{"args":{"x":264,"y":266,"rotation":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":28,"y":9.999999999999996},{"x":592,"y":13},{"x":671,"y":48},{"x":3,"y":49}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1651,"y":79,"properties":{"args":{"x":1651,"y":79,"rotation":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-48,"y":-69},{"x":-5.999999999999997,"y":-101},{"x":151,"y":-87},{"x":136,"y":-47}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":957,"y":37,"properties":{"args":{"x":957,"y":37,"rotation":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-144,"y":-27.000000000000004},{"x":-70,"y":-55},{"x":689,"y":-59},{"x":646,"y":-27}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1857.33333,"y":33,"properties":{"args":{"x":1857.33333,"y":33,"rotation":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-71,"y":-1.0000000000000038},{"x":-57,"y":-40},{"x":376,"y":-63},{"x":282,"y":-27}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2275,"y":0,"properties":{"args":{"x":2275,"y":0,"rotation":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-136,"y":5.9999999999999964},{"x":-42,"y":-30},{"x":322,"y":-47},{"x":342,"y":25}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":991.3333299999999,"y":281,"properties":{"args":{"x":991.3333299999999,"y":281,"rotation":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-135,"y":-1.0000000000000038},{"x":391,"y":-54},{"x":225,"y":29},{"x":-56,"y":34}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1473.66667,"y":281,"properties":{"args":{"x":1473.66667,"y":281,"rotation":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-258,"y":28.999999999999996},{"x":-91,"y":-54},{"x":584,"y":5.000000000000001},{"x":406,"y":28}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-4","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2122.66667,"y":301,"properties":{"args":{"x":2122.66667,"y":301,"rotation":0},"componentArgs":{"ObstacleCollider4":[{"attributes":{"points":[{"x":-241,"y":9},{"x":-65,"y":-15},{"x":498,"y":-13},{"x":489,"y":13}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"ScrollStopper","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2053,"y":160,"properties":{"args":{"x":2053,"y":160,"rotation":0}},"hasStructuralChanges":false},{"id":"BossWarning","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1530,"y":147,"properties":{"args":{"x":1530,"y":147,"rotation":0}},"hasStructuralChanges":false},{"id":"boss-1","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2397,"y":150,"properties":{"args":{"x":2397,"y":150,"rotation":0},"componentArgs":{"Boss_1_Collider":[{"attributes":{"points":[{"x":-20,"y":-3.673940397442059e-15},{"x":2.4492935982947065e-15,"y":-20},{"x":20,"y":1.2246467991473533e-15},{"x":0,"y":20}]},"indexInParent":1}]},"children":{"boss-1-cables":[{"args":{"x":-32,"y":-110,"rotation":0},"componentArgs":{"Boss_1_Cables_Collider":[{"attributes":{"points":[{"x":-10,"y":42.99999999999999},{"x":-19.999999999999996,"y":-29},{"x":10,"y":-30},{"x":12,"y":43}]},"indexInParent":0}]},"indexInParent":0,"hasStructuralChanges":false},{"args":{"x":35,"y":-111,"rotation":0},"componentArgs":{"Boss_1_Cables_Collider":[{"attributes":{"points":[{"x":-16,"y":-22.000000000000004},{"x":13.000000000000002,"y":-25},{"x":12,"y":38},{"x":-13,"y":38}]},"indexInParent":0}]},"indexInParent":1,"hasStructuralChanges":false},{"args":{"x":2,"y":-110,"rotation":0},"componentArgs":{"Boss_1_Cables_Collider":[{"attributes":{"points":[{"x":-16,"y":38.99999999999999},{"x":-19.999999999999996,"y":-24},{"x":10,"y":-28},{"x":11,"y":40}]},"indexInParent":0}]},"indexInParent":2,"hasStructuralChanges":false},{"args":{"x":-33,"y":110,"rotation":180},"componentArgs":{"Boss_1_Cables_Collider":[{"attributes":{"points":[{"x":-21.000000000000004,"y":39},{"x":-18.999999999999996,"y":-31.000000000000004},{"x":8.000000000000004,"y":-31},{"x":12.999999999999996,"y":39}]},"indexInParent":0}]},"indexInParent":3,"hasStructuralChanges":false},{"args":{"x":34,"y":110,"rotation":180},"componentArgs":{"Boss_1_Cables_Collider":[{"attributes":{"points":[{"x":-15.000000000000005,"y":40},{"x":-22.999999999999996,"y":-29.000000000000004},{"x":10.000000000000004,"y":-30},{"x":11.999999999999996,"y":39}]},"indexInParent":0}]},"indexInParent":4,"hasStructuralChanges":false},{"args":{"x":0,"y":110,"rotation":180},"componentArgs":{"Boss_1_Cables_Collider":[{"attributes":{"points":[{"x":-25.999999999999996,"y":-28.000000000000004},{"x":11.000000000000004,"y":-28},{"x":16.999999999999996,"y":40},{"x":-13.000000000000004,"y":42}]},"indexInParent":0}]},"indexInParent":5,"hasStructuralChanges":false}],"biohazard-icon":[{"args":{"x":23,"y":23,"rotation":0},"indexInParent":6,"hasStructuralChanges":false}]}},"hasStructuralChanges":false},{"id":"boss-cannon","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2249,"y":22,"properties":{"args":{"x":2249,"y":22,"rotation":-176.76029970389789},"children":{"boss-cannon-shooter":[{"args":{"x":0,"y":0,"rotation":0.7440592028887094},"indexInParent":0,"hasStructuralChanges":false}]}},"hasStructuralChanges":false},{"id":"boss-cannon","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2303,"y":24,"properties":{"args":{"x":2303,"y":24,"rotation":-175.97173633351485},"children":{"boss-cannon-shooter":[{"args":{"x":0,"y":0,"rotation":21.80140948635181},"indexInParent":0,"hasStructuralChanges":false}]}},"hasStructuralChanges":false},{"id":"boss-cannon","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2233,"y":275,"properties":{"args":{"x":2233,"y":275,"rotation":0},"children":{"boss-cannon-shooter":[{"args":{"x":0,"y":0,"rotation":-21.80140948635181},"indexInParent":0,"hasStructuralChanges":false}]}},"hasStructuralChanges":false},{"id":"boss-cannon","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":2292,"y":275,"properties":{"args":{"x":2292,"y":275,"rotation":0},"children":{"boss-cannon-shooter":[{"args":{"x":0,"y":0,"rotation":0},"indexInParent":0,"hasStructuralChanges":false}]}},"hasStructuralChanges":false}],"groups":["First"],"viewports":[{"name":"Main","width":400,"height":300,"offsetX":0,"offsetY":0,"scaleX":1,"scaleY":1,"stroke":{"width":1,"color":"#4E91F0"},"worldFit":false,"layers":["Front"]},{"name":"Messages","width":400,"height":300,"offsetX":0,"offsetY":0,"scaleX":1,"scaleY":1,"stroke":{"width":"none","color":"none"},"worldFit":false,"layers":["Front"]}],"world":{"width":2500,"height":300}})
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