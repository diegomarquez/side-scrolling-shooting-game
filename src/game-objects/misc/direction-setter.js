define(function(require) {

	var DirectionSetter = require("editor-game-object-container").extend({
		init: function() {
			this._super();
			this.angle = 0;
			this.speed = 0;

			this.type = '';
			this.amount = 0;
			this.cap = 0;

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
					var fSpeed = this.player.getMaxForwardSpeed();

					if (this.type == 'increase') {
						if (fSpeed < this.cap) {
							this.player.setMaxForwardSpeed(this.player.getMaxForwardSpeed() + this.amount);
						}	
					}

					if (this.type == 'decrease') {
						if (fSpeed > this.cap) {
							this.player.setMaxForwardSpeed(this.player.getMaxForwardSpeed() - this.amount);
						}
					}

					this.player.move(this.angle);

					this.executed = true;
				}
			}

			// Left
			if (d == 180) {
				if (Math.floor(this.mainViewport.x + this.X) >= this.halfWidth) {
					
					var fSpeed = this.player.getMaxForwardSpeed();

					if (this.type == 'increase') {
						if (fSpeed < this.cap) {
							this.player.setMaxForwardSpeed(this.player.getMaxForwardSpeed() + this.amount);
						}	
					}

					if (this.type == 'decrease') {
						if (fSpeed > this.cap) {
							this.player.setMaxForwardSpeed(this.player.getMaxForwardSpeed() - this.amount);
						}
					}

					this.player.move(this.angle);

					this.executed = true;
				}
			}

			// Up
			if (d == 270) {
				if (Math.floor(this.mainViewport.y + this.Y) >= this.halfHeight) {
						
					var fSpeed = this.player.getMaxForwardSpeed();

					if (this.type == 'increase') {
						if (fSpeed < this.cap) {
							this.player.setMaxForwardSpeed(this.player.getMaxForwardSpeed() + this.amount);
						}	
					}

					if (this.type == 'decrease') {
						if (fSpeed > this.cap) {
							this.player.setMaxForwardSpeed(this.player.getMaxForwardSpeed() - this.amount);
						}
					}

					this.player.move(this.angle);

					this.executed = true;
				}
			}

			// Down
			if (d == 90) {
				if (Math.floor(this.mainViewport.y + this.Y) <= this.halfHeight) {
					
					var fSpeed = this.player.getMaxForwardSpeed();

					if (this.type == 'increase') {
						if (fSpeed < this.cap) {
							this.player.setMaxForwardSpeed(this.player.getMaxForwardSpeed() + this.amount);
						}	
					}

					if (this.type == 'decrease') {
						if (fSpeed > this.cap) {
							this.player.setMaxForwardSpeed(this.player.getMaxForwardSpeed() - this.amount);
						}
					}

					this.player.move(this.angle);

					this.executed = true;
				}
			}
		},

		deActivate: function() {

    	},

    	getDirection: function() {
    		return this.angle;
    	}
	});

	return DirectionSetter;
});

