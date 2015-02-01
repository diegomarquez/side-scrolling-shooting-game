define(function(require) {
	var canvasContainer = require('canvas-container');
	var buttonUI = require('button');

	var playerLoader = require('player-scene-loader');

	var ScenePlayer = require("ui-component").extend({
		init: function() {
			this._super();
		},

		create: function() {
			// Create all the objects needed

			// Add everything to the DOM

			// Main Editor container
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
        	// Signal that the player is about to be destroyed
          // this.execute(this.EXIT);
          playerLoader.load({"name": "TEST","objects": [{"id": "player-ship","g": "First","v": [{"viewport": "Main","layer": "Front"}],"x": 312,"y": 185,"properties": {"args": {"x": 312,"y": 185},"componentArgs": {"ShipColliderCircle": [{"attributes": {"radius": 43.34029246747468},"indexInParent": 0}]}},"hasStructuralChanges": false}],"groups": ["First"],"viewports": [{"name": "Main","width": 400,"height": 300,"offsetX": 0,"offsetY": 0,"scaleX": 1,"scaleY": 1,"stroke": {"width": 1,"color": "#4E91F0"},"worldFit": false,"layers": ["Front"]}],"world": {"width": 400,"height": 300}});   
        }.bind(this)
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