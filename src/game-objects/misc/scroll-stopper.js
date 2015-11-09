define(function(require) {
	
	var Root = require("root");

	var ScrollStopper = require("editor-game-object-container").extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.mainViewport = require('gb').viewports.get("Main");
			this.player = require('player-getter').get();

			this.halfWidth = require('gb').canvas.width/2;
			this.halfHeight = require('gb').canvas.height/2;

			this.stopped = false;
			this.valid = true;
		},

		editorUpdate: function(delta) {
			if (!this.valid)
				return;

			if (this.stopped)
				return;

			var d = this.player.getDirection();

			if (d == 0) {
				if (Math.floor(this.mainViewport.x + this.X) <= this.halfWidth) {

					this.valid = this.isValid();

					if (!this.valid)
						return;

					this.player.stop();
					this.stopped = true;
				}
			}

			if (d == 180) {
				if (Math.floor(this.mainViewport.x + this.X) >= this.halfWidth) {

					this.valid = this.isValid();

					if (!this.valid)
						return;

					this.player.stop();
					this.stopped = true;
				}
			}

			if (d == 270) {
				if (Math.floor(this.mainViewport.y + this.Y) >= this.halfHeight) {

					this.valid = this.isValid();

					if (!this.valid)
						return;

					this.player.stop();
					this.stopped = true;
				}
			}

			if (d == 90) {
				if (Math.floor(this.mainViewport.y + this.Y) <= this.halfHeight) {

					this.valid = this.isValid();

					if (!this.valid)
						return;

					this.player.stop();
					this.stopped = true;
				}
			}
		},

		deActivate: function() {

    	},

    	isValid: function() {
    		var bosses = Root.findChildren().recurse().all(function(child) {
				return (child.typeId == "boss-1" || child.typeId == "boss-2" || child.typeId == "boss-3" || child.typeId == "boss-4") && child.getViewportVisibility('Main');
			});

			var d = this.player.getDirection();

			var directionSetters = Root.findChildren().recurse().all(function(child) {
				if ((child.poolId == "DirectionSetter" || child.poolId == "AngleDirectionSetter") && child.getViewportVisibility('Main')) {
					var cd = child.getDirection();

					// Right
					if (d == 0) {
						if (cd == 180) {
							return false;
						}
					}

					// Left
					if (d == 180) {
						if (cd == 0) {
							return false;
						}
					}

					// Up
					if (d == 270) {
						if (cd == 90) {
							return false;
						}
					}

					// Down
					if (d == 90) {
						if (cd == 270) {
							return false;
						}
					}

					return true;
				}

				return false;
			});

			return !(bosses.length == 0 && directionSetters.length == 0);
    	}

	});

	return ScrollStopper;
});

