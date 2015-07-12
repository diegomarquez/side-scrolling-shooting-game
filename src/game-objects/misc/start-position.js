define(function(require) {

	var reclaimer = require('reclaimer');

	var StartPosition = require("editor-game-object-container").extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.player = require("player-getter").get();

			this.player.x = this.x;
			this.player.y = this.y;

			var mainViewport = require('viewports').get('Main');

			mainViewport.x = -this.x;
			mainViewport.y = -this.y;
		},

		editorUpdate: function(delta) {
			reclaimer.mark(this);
		}
	});

	return StartPosition;
});

