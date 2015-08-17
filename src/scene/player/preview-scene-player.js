define(function(require) {
	var canvasContainer = require('canvas-container');

	var PreviewScenePlayer = require("game-scene-player").constructor.extend({
		init: function() {
			this._super();
		},

		decorateContainer: function () {
			this._super();

			document.getElementById('player-title').appendChild(document.createTextNode('Scene Preview'));
		},

		removeContainer: function() {		
    		canvasContainer.detachCanvas();	
     	 	$(this.mainContainer).remove();
		},
	});

	return new PreviewScenePlayer();
})