define(function(require) {

	var StartPosition = require("editor-game-object-container").extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			// this.mainViewport = Gb.viewports.get("Main");
			// this.player = PlayerGetter.get();
		},

		// draw: function(context, viewport) {
		// 	this._super(context, viewport);
		// },

		editorUpdate: function(delta) {
			// if (Math.floor(this.mainViewport.x + this.X) <= 0) {
			//  this.player.stop();
			//  Gb.reclaimer.mark(this);
			// }
		}
	});

	return StartPosition;
});

