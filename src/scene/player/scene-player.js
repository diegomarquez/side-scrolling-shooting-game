define(function(require) {
	var gb = require('gb');
	var canvasContainer = require('canvas-container');
	var buttonUI = require('button');

	var playerLoader = require('player-scene-loader');
	var loaderContainer = require('loader-container');
	var viewportFollow = require('viewport-follow');

	require('tweenlite');

	var ScenePlayer = require("ui-component").extend({
		init: function() {
			this._super();
		},

		create: function() {
			// Setup display for splash screen
			gb.groups.add("First");
    	var mainViewport = gb.viewports.add("Main", gb.canvas.width, gb.canvas.height, 0, 0);
    	mainViewport.addLayer("Front");

    	loaderContainer.once(loaderContainer.OPEN, this, function() {
    		gb.create('Title', 'First', [{viewport: 'Main', layer: 'Front'}]);
    	});

			// Main Player container
			this.mainContainer = document.createElement('div');
			this.mainContainer.id = 'main-player-container';
			document.body.appendChild(this.mainContainer);

			this.mainContainer.appendChild(canvasContainer.getCanvasContainer());

			this.editorButton = new buttonUI().create({
        label: 'Level Editor',
        onClick: function(event) {
        	// Signal that the player is about to be destroyed
          this.execute(this.EXIT);
        }.bind(this)
      });

			$(this.editorButton).button();

      this.startButton = new buttonUI().create({
        label: 'Start Game',
        onClick: function(event) {
        	// Load a scene
          playerLoader.load({"name":"TEST","objects":[{"id":"obstacle-5","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":204,"y":32,"properties":{"args":{"x":204,"y":32},"componentArgs":{"ObstacleCollider5":[{"attributes":{"points":[{"x":31,"y":4},{"x":115.02113032590307,"y":8.180339887498949},{"x":150.75570504584945,"y":-24.18033988749895},{"x":-65.75570504584945,"y":-27.18033988749895},{"x":-53.02113032590307,"y":24.180339887498945}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-5","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":858,"y":56,"properties":{"args":{"x":858,"y":56},"componentArgs":{"ObstacleCollider5":[{"attributes":{"points":[{"x":289,"y":10},{"x":380.0211303259031,"y":-44.819660112501055},{"x":144.75570504584945,"y":-44.180339887498945},{"x":-70.75570504584945,"y":-47.180339887498945},{"x":-124.02113032590307,"y":-23.819660112501055}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-5","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":378,"y":104,"properties":{"args":{"x":378,"y":104},"componentArgs":{"ObstacleCollider5":[{"attributes":{"points":[{"x":38,"y":-33},{"x":355.0211303259031,"y":-70.81966011250105},{"x":408.7557050458495,"y":-95.18033988749895},{"x":-22.75570504584946,"y":-95.18033988749895},{"x":-62.02113032590307,"y":-63.819660112501055}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-5","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":206,"y":264,"properties":{"args":{"x":206,"y":264},"componentArgs":{"ObstacleCollider5":[{"attributes":{"points":[{"x":34,"y":50},{"x":279.0211303259031,"y":49.180339887498945},{"x":187.75570504584945,"y":-3.180339887498949},{"x":-30.75570504584946,"y":13.819660112501051},{"x":-75.02113032590307,"y":49.180339887498945}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-5","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1300,"y":150,"properties":{"args":{"x":1300,"y":150},"componentArgs":{"ObstacleCollider5":[{"attributes":{"points":[{"x":46,"y":-105},{"x":303.0211303259031,"y":-90.81966011250105},{"x":306.7557050458495,"y":-141.18033988749895},{"x":-61.75570504584946,"y":-139.18033988749895},{"x":-154.02113032590307,"y":-83.81966011250105}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-5","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1690.66667,"y":95,"properties":{"args":{"x":1690.66667,"y":95},"componentArgs":{"ObstacleCollider5":[{"attributes":{"points":[{"x":1,"y":-58},{"x":156.02113032590307,"y":-40.819660112501055},{"x":157.75570504584948,"y":-83.18033988749895},{"x":-83.75570504584945,"y":-87.18033988749895},{"x":-89.02113032590307,"y":-35.819660112501055}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-5","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":566.6666700000001,"y":150,"properties":{"args":{"x":566.6666700000001,"y":150},"componentArgs":{"ObstacleCollider5":[{"attributes":{"points":[{"x":-82,"y":163},{"x":458.0211303259031,"y":161.18033988749895},{"x":361.7557050458495,"y":121.81966011250105},{"x":-13.75570504584946,"y":128.81966011250105},{"x":-173.02113032590307,"y":110.18033988749895}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-5","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1093,"y":252,"properties":{"args":{"x":1093,"y":252},"componentArgs":{"ObstacleCollider5":[{"attributes":{"points":[{"x":216,"y":64},{"x":290.0211303259031,"y":29.18033988749895},{"x":75.75570504584947,"y":-8.180339887498949},{"x":-164.75570504584945,"y":19.81966011250105},{"x":-69.02113032590307,"y":59.180339887498945}]},"indexInParent":0}]}},"hasStructuralChanges":false},{"id":"obstacle-5","g":"First","v":[{"viewport":"Main","layer":"Front"}],"x":1529.66667,"y":260,"properties":{"args":{"x":1529.66667,"y":260},"componentArgs":{"ObstacleCollider5":[{"attributes":{"points":[{"x":298,"y":57},{"x":293.0211303259031,"y":19.18033988749895},{"x":190.75570504584948,"y":29.81966011250105},{"x":-144.75570504584945,"y":19.81966011250105},{"x":-220.02113032590307,"y":57.180339887498945}]},"indexInParent":0}]}},"hasStructuralChanges":false}],"groups":["First"],"viewports":[{"name":"Main","width":400,"height":300,"offsetX":0,"offsetY":0,"scaleX":1,"scaleY":1,"stroke":{"width":1,"color":"#4E91F0"},"worldFit":false,"layers":["Front"]}],"world":{"width":1800,"height":300}});   

          // Create the player
          var player = gb.create('player-ship', 'First', [{viewport: 'Main', layer: 'Front'}], {
          	viewportOffsetX: gb.canvas.width/2 - 300,
          	viewportOffsetY: gb.canvas.height/2 
          });

          // Block the player controls
          player.blockControls();

          TweenLite.to(player, 5, { viewportOffsetX: gb.canvas.width/2 - 150, onComplete: function() {
          	gb.create('StartMessage', 'First', [{viewport: 'Main', layer: 'Front'}], {
	          		onComplete: function() {
		          		// Unblock controls when the start message is gone
		          		player.unblockControls();

		          		// Set the main viewport to follow the player movement
		          		viewportFollow.setFollow('Main', player);
		          	}
		          });	
          }});
        }
      });

      $(this.startButton).button();
      
      this.mainContainer.appendChild(this.startButton);
      this.mainContainer.appendChild(this.editorButton);
		},

		cleanUp: function() {
    	// Clean up jquery UI
      $(this.mainContainer).toggle();
      $(this.startButton).button('destroy');
      $(this.editorButton).button('destroy');
    	// Destroy all of this objects references
    	this._super();
    	// Remove the editor container from the DOM
      // This should take care of any lingering references to events
      $('#main-player-container').remove();
    }
	});

	Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });

	return new ScenePlayer();
})