define(function(require) {	
	var gb = require("gb");

	var PlayerGetter = require("class").extend({
		init: function() {
			this.viewportGameObjectPairs = {};
		},

		get: function() {
			if (!this.player) { 
				this.player = gb.create('player-ship', 'First', [{viewport: 'Main', layer: 'Front'}]);		

				this.player.once(this.player.RECYCLE, this, function() {
					this.player = null;
				});
			}

			return this.player;
		}
 	});

	return new PlayerGetter();
});