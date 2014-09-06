define(function(require) {	
	var gb = require('gb');

	var pair = null;

	var ViewportOutline = require("class").extend({
		init: function() {
			this.viewportOutlines = {};

			gb.game.on(gb.game.UPDATE, this, function() {
				for (var name in this.viewportOutlines) {
					pair = this.viewportOutlines[name];

					pair.outline.x = pair.viewport.x * -1;
					pair.outline.y = pair.viewport.y * -1;
				}
			});
		},

		add: function(args) {			
			this.viewportOutlines[args.viewportName] = {
				viewport: gb.viewports.get('Main'),
				outline: gb.create(args.gameObjectId, args.updateGroup, args.viewports, args.gameObjectArguments)
			}
		},

		remove: function(viewportName) {
			gb.reclaimer.claim(this.viewportOutlines[viewportName].outline);

			this.viewportOutlines[viewportName] = null;
			delete this.viewportOutlines[viewportName];
		}
 	});

	return new ViewportOutline();
});