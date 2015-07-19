define(function(require) {  
	var gb = require("gb");

	var PlayerGetter = require("delegate").extend({
		init: function() {
			this._super();
		},

		getAsync: function(f) {
			if (this.player) {
				f(this.player);
			}
			else {
				this.once('player_created', this, function() {
					f(this.player);
				});	
			}	
		},

		get: function(x, y) {
			if (!this.player) {
				this.player = require("gb").create('player-ship', 'First', [{viewport: 'Main', layer: 'Front'}], {
					viewportOffsetX: x,
					viewportOffsetY: y
				});

				this.player.once(this.player.RECYCLE, this, function() {
					this.player = null;
				});

				this.execute('player_created');
			}

			return this.player;
		}
	});

	return new PlayerGetter();
});