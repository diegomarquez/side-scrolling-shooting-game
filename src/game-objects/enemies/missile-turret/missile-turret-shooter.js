define(["editor-game-object-container", "gb", "player-getter"], function(GameObject, Gb, PlayerGetter) {
	var targetDecompose = {};
	var targetMatrix = null;

	var selfDecompose = {};
	var selfMatrix = null;

	var MissileTurretShooter = GameObject.extend({
		init: function() {
			this._super();

			this.aiming = false;
			this.aimDirection = 1;
			this.newRotation = 0;

			this.damaged = false;

			this.shootTimer = 0;
			this.burtsTimer = 0;

			this.bursting = false;
			this.target = null;
			this.currentBurstCount = 0;
			this.bulletCount = 0;
		},

		editorStart: function() {
			this.damaged = false;

			this.shootTimer = 0;
			this.burtsTimer = 0;

			this.bursting = false;
			this.target = PlayerGetter.get();
			this.currentBurstCount = 0;
			this.bulletCount = this.missiles;

			this.aiming = false;
			this.aimDirection = 1;

			targetMatrix = this.target.getMatrix(targetMatrix);
			targetDecompose = targetMatrix.decompose(targetDecompose);

			selfMatrix = this.getMatrix(selfMatrix);
			selfDecompose = selfMatrix.decompose(selfDecompose);
			
			var deltaX = targetDecompose.x - selfDecompose.x;
			var deltaY = targetDecompose.y - selfDecompose.y;

			this.rotation = (Math.atan2(deltaY, deltaX) - ((this.parent.rotation) * (Math.PI/180)) ) * (180 / Math.PI);
			this.rotation = this.rotation % 360;

			this.rateVariation = Math.floor(20 + (Math.random() * 50));

			this.parent.on(this.parent.DAMAGE, this, function() {
				this.damaged = true;
				this.shootTimer = 0;
				this.burtsTimer = 0;
				this.bursting = false;
				this.currentBurstCount = 0;
			});

			this.parent.on(this.parent.REPAIR, this, function() {
				this.damaged = false;
			});
		},

		editorUpdate: function(delta) {
			if (this.damaged) return;

			targetMatrix = this.target.getMatrix(targetMatrix);
			targetDecompose = targetMatrix.decompose(targetDecompose);

			selfMatrix = this.getMatrix(selfMatrix);
			selfDecompose = selfMatrix.decompose(selfDecompose);
			
			var deltaX = targetDecompose.x - selfDecompose.x;
			var deltaY = targetDecompose.y - selfDecompose.y;

			if (!this.bursting && !this.aiming) {
				this.rotation = (Math.atan2(deltaY, deltaX) - ((this.parent.rotation) * (Math.PI/180)) ) * (180 / Math.PI) + 180;
				this.rotation = this.rotation % 360;

				// Prevent update until the cannon has been started
				if (!this.parent.started) return;

				this.shootTimer++;

				if (this.shootTimer % (this.rate + this.rateVariation) == 0) {
					if (this.bulletCount > 0 || this.missiles == -1) {
						this.bursting = true;
						this.burtsTimer = 0;
					}
				}
			}

			if (this.bursting && !this.aiming) {
				this.burtsTimer++;

				if (this.burtsTimer % 10 == 0) {
					if (this.currentBurstCount < this.burstAmount) {
						// Gb.create('missile', this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						// 	angle: selfMatrix.decompose(selfDecompose).rotation,
						// 	x: this.parent.x,
						// 	y: this.parent.y
						// });

						this.currentBurstCount++;
					} else {

						this.newRotation = (Math.atan2(deltaY, deltaX) - ((this.parent.rotation) * (Math.PI/180)) ) * (180 / Math.PI) + 180;
						this.newRotation = this.newRotation % 360;
						
						var diff = (this.newRotation - this.rotation) % 360;

						if (diff < 0) {
							diff += 360;
						}

						this.aimDirection = diff > 180 ? -1 : 1;

						this.currentBurstCount = 0;
						this.shootTimer = 0;
						this.bulletCount--;

						this.aiming = true;
						this.bursting = false;
					}
				}
			}

			if (this.aiming) {
				this.rotation += this.aimDirection * 2;
				
				this.newRotation = (Math.atan2(deltaY, deltaX) - ((this.parent.rotation) * (Math.PI/180)) ) * (180 / Math.PI) + 180;
				this.newRotation = this.newRotation % 360;
				
				var newDirection = (this.newRotation - this.rotation) % 360;

				if (newDirection < 0) {
					newDirection += 360;
				}

				newDirection = newDirection > 180 ? -1 : 1;
				
				if (this.aimDirection != newDirection) {
				 	this.aiming = false;
				}
			}
		}
	});

	return MissileTurretShooter;
});
