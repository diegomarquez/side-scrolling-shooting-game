define(function(require) {

	var DirectionSetter = require("editor-game-object-container").extend({
		init: function() {
			this._super();
			this.angle = 0;
		},

		editorStart: function() {
			this.mainViewport = require('gb').viewports.get("Main");
			this.player = require('player-getter').get();

			this.halfWidth = require('gb').canvas.width/2;
			this.halfHeight = require('gb').canvas.height/2;
		},

		editorUpdate: function(delta) {
			var d = this.player.getDirection();

			// Right
			if (d == 0) {
				if (Math.floor(this.mainViewport.x + this.X) <= this.halfWidth) {
					this.player.move(this.angle);
				}
			}

			// Left
			if (d == 180) {
				if (Math.floor(this.mainViewport.x + this.X) >= this.halfWidth) {
					this.player.move(this.angle);
				}
			}

			// Up
			if (d == 270) {
				if (Math.floor(this.mainViewport.y + this.Y) >= this.halfHeight) {
					this.player.move(this.angle);
				}
			}

			// Down
			if (d == 90) {
				if (Math.floor(this.mainViewport.y + this.Y) <= this.halfHeight) {
					this.player.move(this.angle);
				}
			}
		},

		deActivate: function() {

    	}
	});

	return DirectionSetter;
});

