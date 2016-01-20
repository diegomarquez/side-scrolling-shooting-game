define(function(require) {

	var TwoWayDirectionSetter = require("editor-game-object-container").extend({
		init: function() {
			this._super();
			this.angle = 0;
			this.speed = 0;

			this.type = "";

			this.executed = false;
		},

		editorStart: function() {
			this.mainViewport = require('gb').viewports.get("Main");
			this.player = require('player-getter').get();

			this.halfWidth = require('gb').canvas.width/2;
			this.halfHeight = require('gb').canvas.height/2;

			this.executed = false;
		},

		editorUpdate: function(delta) {
			if (this.executed)
				return;

			var d = this.player.getDirection();

			// Right
			if (d == 0) {
				if (Math.floor(this.mainViewport.x + this.X) <= this.halfWidth) {
					
					switch (this.type) {
						case "up-left":
							this.player.move(270);
							break;
						case "up-right":
							this.player.move(270);
							break;
						case "down-left":
							this.player.move(90);
							break;
						case "down-right":
							this.player.move(90);
							break;
					}

					this.executed = true;
				}
			}

			// Left
			if (d == 180) {
				if (Math.floor(this.mainViewport.x + this.X) >= this.halfWidth) {
					
					switch (this.type) {
						case "up-left":
							this.player.move(270);
							break;
						case "up-right":
							this.player.move(270);
							break;
						case "down-left":
							this.player.move(90);
							break;
						case "down-right":
							this.player.move(90);
							break;
					}

					this.executed = true;
				}
			}

			// Up
			if (d == 270) {
				if (Math.floor(this.mainViewport.y + this.Y) >= this.halfHeight) {
					
					switch (this.type) {
						case "up-left":
							this.player.move(180);
							break;
						case "up-right":
							this.player.move(0);
							break;
						case "down-left":
							this.player.move(180);
							break;
						case "down-right":
							this.player.move(0);
							break;
					}

					this.executed = true;
				}
			}

			// Down
			if (d == 90) {
				if (Math.floor(this.mainViewport.y + this.Y) <= this.halfHeight) {
					
					switch (this.type) {
						case "up-left":
							this.player.move(180);
							break;
						case "up-right":
							this.player.move(0);
							break;
						case "down-left":
							this.player.move(180);
							break;
						case "down-right":
							this.player.move(0);
							break;
					}

					this.executed = true;
				}
			}
		},

		deActivate: function() {

    	}

	});

	return TwoWayDirectionSetter;
});

