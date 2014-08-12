define(function(require) {	
	var gb = require('gb');

	var pair = null;

	var ViewportOutline = require("class").extend({
		init: function() {
			this.viewportOutlines = {};
		},

		setOutline: function(viewportName, outlineGameObject, outlineGroup, outlineViewportShortcut) {
			outline = gb.add(outlineGameObject, outlineGroup, outlineViewportShortcut);
			
			this.viewportOutlines[viewportName] = {
				viewport: gb.viewports.get(viewportName),
				outline: outline
			}	
		},

		update: function(delta) {
			for (var name in this.viewportOutlines) {
				pair = this.viewportOutlines[name];

				pair.outline.x = pair.viewport.x*-1;
			}
		}
 	});

	return new ViewportOutline();
});