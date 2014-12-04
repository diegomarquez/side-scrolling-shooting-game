define(function(require) {
  var gb = require('gb');

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
    	var main = document.getElementById('main');

    	this.originalWidth = gb.game.WIDTH;
    	this.originalHeight = gb.game.HEIGHT;

    	this.onResize = function() {
    		gb.game.WIDTH = main.parentNode.parentNode.clientWidth;
    		gb.game.HEIGHT = main.parentNode.parentNode.clientHeight;
    	}

    	this.onResize();

    	window.addEventListener('resize', this.onResize, false);
    },

		destroy: function() {
    	window.removeEventListener('resize', this.onResize, false);

			gb.game.WIDTH = this.originalWidth;
    	gb.game.HEIGHT = this.originalHeight;

    	this.onResize = null;
  		this.originalWidth = null;
  		this.originalHeight = null;

  		delete this['onResize'];
  		delete this['originalWidth'];
  		delete this['originalHeight'];
		}    
  });

  return FitCanvasInRegion;
});
