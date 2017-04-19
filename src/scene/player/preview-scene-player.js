define(function(require) {
	var canvasContainer = require('canvas-container');

	var PreviewScenePlayer = require("game-scene-player").constructor.extend({
		init: function() {
			this._super();
		},

		decorateContainer: function (sceneData) {
			this._super(sceneData);

			document.getElementById('player-title').innerHTML = "";
			document.getElementById('player-title').appendChild(document.createTextNode('Scene Preview'));
		},

		removeContainer: function() {
			canvasContainer.detachCanvas();
			$(this.mainContainer).remove();
		},
	});

	return new PreviewScenePlayer();
})