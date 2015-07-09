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
		},

		editorUpdate: function(delta) {
			var d = this.player.getDirection();

			if (d == 'right') {
				if (Math.floor(this.mainViewport.x + this.X) <= this.halfWidth) {
					this.player.stop();
					require('gb').reclaimer.mark(this);
				}
			}

			if (d == 'left') {
				if (Math.floor(this.mainViewport.x + this.X) >= this.halfWidth) {
					this.player.stop();
					require('gb').reclaimer.mark(this);
				}
			}

			if (d == 'up') {
				if (Math.floor(this.mainViewport.y + this.Y) >= this.halfHeight) {
					this.player.stop();
					require('gb').reclaimer.mark(this);
				}
			}

			if (d == 'down') {
				if (Math.floor(this.mainViewport.y + this.Y) <= this.halfHeight) {
					this.player.stop();
					require('gb').reclaimer.mark(this);	
				}
			}
		}
	});

	return ScrollStopper;
});

