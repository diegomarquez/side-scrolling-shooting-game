define(function(require) {

	var ScrollStopper = require("editor-game-object-container").extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.mainViewport = require('gb').viewports.get("Main");
			this.player = require('player-getter').get();

			this.halfWidth = require('gb').canvas.width/2;
			this.halfHeight = require('gb').canvas.height/2;

			this.stopped = false;
		},

		editorUpdate: function(delta) {
			if (this.stopped)
				return;

			var d = this.player.getDirection();

			if (d == 0) {
				if (Math.floor(this.mainViewport.x + this.X) <= this.halfWidth) {
					this.player.stop();
					this.stopped = true;
				}
			}

			if (d == 180) {
				if (Math.floor(this.mainViewport.x + this.X) >= this.halfWidth) {
					this.player.stop();
					this.stopped = true;
				}
			}

			if (d == 270) {
				if (Math.floor(this.mainViewport.y + this.Y) >= this.halfHeight) {
					this.player.stop();
					this.stopped = true;
				}
			}

			if (d == 90) {
				if (Math.floor(this.mainViewport.y + this.Y) <= this.halfHeight) {
					this.player.stop();
					this.stopped = true;
				}
			}
		},

		deActivate: function() {

    	},

	});

	return ScrollStopper;
});

