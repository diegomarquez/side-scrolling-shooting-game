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
    	var game = document.getElementById('game');
    	var main = document.getElementById('main');

    	this.originalWidth = game.width;
    	this.originalHeight = game.height;

    	this.onResize = function() {
    		game.width = main.parentNode.parentNode.clientWidth;
    		game.height = main.parentNode.parentNode.clientHeight;
    	}

    	this.onResize();

    	window.addEventListener('resize', this.onResize, false);
    },

		destroy: function() {
    	window.removeEventListener('resize', this.onResize, false);

			document.getElementById('game').width = this.originalWidth;
    	document.getElementById('game').height = this.originalHeight;

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
