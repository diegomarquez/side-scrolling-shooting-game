define(function(require) {

	var DirectionSetter = require("editor-game-object-container").extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.mainViewport = require('gb').viewports.get("Main");
			this.player = require('player-getter').get();

			this.halfWidth = require('gb').canvas.width/2;
			this.halfHeight = require('gb').canvas.height/2;
		},

		editorUpdate: function(delta) {
			var d = this.player.getDirection();

			if (d == 'right') {
				if (Math.floor(this.mainViewport.x + this.X) <= this.halfWidth) {
					this.setPlayerDirection();
				}
			}

			if (d == 'left') {
				if (Math.floor(this.mainViewport.x - this.X) >= this.halfWidth) {
					this.setPlayerDirection();
				}
			}

			if (d == 'up') {
				if (Math.floor(this.mainViewport.y - this.Y) >= this.halfHeight) {
					this.setPlayerDirection();
				}
			}

			if (d == 'down') {
				if (Math.floor(this.mainViewport.y + this.Y) <= this.halfHeight) {
					this.setPlayerDirection();
				}
			}
		},

		setPlayerDirection: function() {
			if (this.rotation == 0) {
				this.player.move('right');
			}

			if (this.rotation == 90) {
				this.player.move('down');
			}

			if (this.rotation == 180) {
				this.player.move('left');
			}

			if (this.rotation == 270) {
				this.player.move('up');
			}	
		}
	});

	return DirectionSetter;
});

