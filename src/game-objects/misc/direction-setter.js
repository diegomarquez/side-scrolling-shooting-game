define(function(require) {

	var DirectionSetter = require("editor-game-object-container").extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.mainViewport = Gb.viewports.get("Main");
			this.player = PlayerGetter.get();
		},

		editorUpdate: function(delta) {
			if (this.rotation == 0) {
				// Right 
				if (Math.floor(this.mainViewport.x + this.X) <= 0) {
					this.player.setDirection(0);
				}
			}

			if (this.rotation == 90) {
				// Down
				if (Math.floor(this.mainViewport.y + this.Y) <= 0) {
					this.player.setDirection(90);
				}
			}

			if (this.rotation == 180) {
				// Left
				if (Math.floor(this.mainViewport.x - this.X) >= 0) {
					this.player.setDirection(180);
				}
			}

			if (this.rotation == 270) {
				// Up				
				if (Math.floor(this.mainViewport.y - this.Y) >= 0) {
					this.player.setDirection(270);
				}
			}
		}
	});

	return DirectionSetter;
});

