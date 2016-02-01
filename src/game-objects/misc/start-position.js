define(function(require) {

	var reclaimer = require('reclaimer');
	var gb = require('gb');

	var StartPosition = require("editor-game-object-container").extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.player = require("player-getter").get();

			this.player.x = gb.canvas.width * Math.floor(this.x/gb.canvas.width);
			this.player.y = gb.canvas.height * Math.floor(this.y/gb.canvas.height);

			var mainViewport = require('viewports').get('Main');
			
			mainViewport.x = -gb.canvas.width * Math.floor(this.x/gb.canvas.width);;
			mainViewport.y = -gb.canvas.height * Math.floor(this.y/gb.canvas.height);;
		},

		editorUpdate: function(delta) {
			
		},

		deActivate: function() {

    	}
	});

	return StartPosition;
});

