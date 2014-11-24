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

			var button = new buttonUI().create({
        label: 'Level Editor',
        onClick: function(event) {
        	// Hide the player container
        	$(this.mainContainer).toggle();

          $(button).button('destroy');

          // Destroy everything
          this.cleanUp();

        	// Signal that the player has been destroyed
          this.execute(this.EXIT);
          
          // Remove the player container
          $('#main-player-container').remove();
        }.bind(this)
      });

      $(button).button();

      this.mainContainer.appendChild(button);
		}
	});

	Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });

	return new ScenePlayer();
})