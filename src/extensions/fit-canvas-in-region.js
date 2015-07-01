define(function(require) {
	var gb = require('gb');

	var main = document.getElementById('main');

	var FitCanvasInRegion = require('extension').extend({
		init: function() {
			this.onResize = null;
			this.originalWidth = null;
			this.originalHeight = null;
		},

		type: function() {
			return gb.game.CREATE;
		},

		execute: function() { 
			this.originalWidth = gb.game.WIDTH;
			this.originalHeight = gb.game.HEIGHT;

			this.fit();

			window.addEventListener('resize', this.fit, false);
		},

		fit: function() {
			gb.game.WIDTH = gb.canvas.parentNode.clientWidth;
			gb.game.HEIGHT = gb.canvas.parentNode.clientHeight;
		},

		destroy: function() {
			window.removeEventListener('resize', this.fit, false);

			gb.game.WIDTH = this.originalWidth;
			gb.game.HEIGHT = this.originalHeight;

			this.originalWidth = null;
			this.originalHeight = null;

			delete this['onResize'];
			delete this['originalWidth'];
			delete this['originalHeight'];
		}    
	});

	return FitCanvasInRegion;
});
