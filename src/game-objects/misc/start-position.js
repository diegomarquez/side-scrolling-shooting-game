define(function(require) {

	var reclaimer = require('reclaimer');
	var gb = require('gb');

	var StartPosition = require('editor-game-object-container').extend({
		init: function() {
			this._super();

			this.type = "";
			this.player = null;
		},

		editorStart: function() {
			this.player = require('player-getter').get();
			
			var mainViewport = require('viewports').get('Main');

			var x;
			var y;

			if (this.type === 'left' || this.type === 'right') {

				// Vertical centering

				x = gb.canvas.width * Math.floor(this.x / gb.canvas.width);
				y = this.y - (gb.canvas.height / 2);
			}

			if (this.type === 'up' || this.type === 'down') {

				// Horizontal centering
				
				x = this.x - (gb.canvas.width / 2);
				y = gb.canvas.height * Math.floor(this.y / gb.canvas.height);
			}

			if (x < 0)
				x = 0;

			if (y < 0)
				y = 0;

			this.player.x = x;
			this.player.y = y;

			mainViewport.x = -x;
			mainViewport.y = -y;
		},

		editorUpdate: function(delta) {
			
		},

		deActivate: function() {

    	}
	});

	return StartPosition;
});

