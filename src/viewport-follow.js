define(function(require) {	

	var Matrix = require('matrix-3x3');

	var getMatrixOptions = {
		noViewportOffsets: true	
	};

	var p = {}
	var m = new Matrix();
	var pair;

	var ViewportFollow = require("class").extend({
		init: function() {
			this.viewportGameObjectPairs = {};
		},

		setFollow: function(viewportName, go) {
			this.viewportGameObjectPairs[viewportName] = {
				viewport: require("viewports").get(viewportName),
				go: go
			};
		},

		update: function(delta) {
			for (var viewportName in this.viewportGameObjectPairs) {
				pair = this.viewportGameObjectPairs[viewportName];

				p = pair.go.getTransform(p, m, getMatrixOptions);

				pair.viewport.x = -p.x;
				pair.viewport.y = -p.y;
			}
		}
 	});

	return new ViewportFollow();
});