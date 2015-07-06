define(function(require) {
	
	var ScrollStopper = require("editor-game-object-container").extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.mainViewport = require('gb').viewports.get("Main");
			this.player = require('player-getter').get();
		},

		editorUpdate: function(delta) {
			if (Math.floor(this.mainViewport.x + this.X) <= 0) {
				this.player.stop();
				require('gb').reclaimer.mark(this);
			}
		}
	});

	return ScrollStopper;
});

