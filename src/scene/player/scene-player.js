define(function(require) {
	var canvasContainer = require('canvas-container');
	var buttonUI = require('button');

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

			this.button = new buttonUI().create({
        label: 'Level Editor',
        onClick: function(event) {
        	// Signal that the player is about to be destroyed
          this.execute(this.EXIT);
        }.bind(this)
      });

      $(this.button).button();

      this.mainContainer.appendChild(this.button);
		},

		cleanUp: function() {
    	// Clean up jquery UI
      $(this.mainContainer).toggle();
      $(this.button).button('destroy');
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