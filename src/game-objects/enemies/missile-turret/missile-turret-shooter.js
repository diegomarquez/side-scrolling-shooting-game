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
			this.missileType = '';

			this.firePositions = null;
			this.firePositionIndex = 0;
			this.firePositionDecompose = {};
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

			this.firePositions = this.findChildren().allWithType("FirePosition").map(function(go) { return go.getMatrix() });
			this.firePositionIndex = 0;

			this.parent.on(this.parent.DAMAGE, this, function() {
				this.damaged = true;
				this.shootTimer = 0;
				this.burtsTimer = 0;
				this.bursting = false;
				this.currentBurstCount = 0;

				targetMatrix = this.target.getMatrix(targetMatrix);
				targetDecompose = targetMatrix.decompose(targetDecompose);

				selfMatrix = this.getMatrix(selfMatrix);
				selfDecompose = selfMatrix.decompose(selfDecompose);
				
				var deltaX = targetDecompose.x - selfDecompose.x;
				var deltaY = targetDecompose.y - selfDecompose.y;

				this.aiming = true;
				this.newRotation = (Math.atan2(deltaY, deltaX) - ((this.parent.rotation) * (Math.PI/180)) ) * (180 / Math.PI) + 180;
				this.newRotation = this.newRotation % 360;
				
				var diff = (this.newRotation - this.rotation) % 360;

				if (diff < 0) {
					diff += 360;
				}

				this.aimDirection = diff > 180 ? -1 : 1;
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

				if (this.burtsTimer % 30 == 0) {
					if (this.currentBurstCount < this.burstAmount) {

						this.execute("launch");

						var firePosition = this.firePositions[this.firePositionIndex];
						this.firePositionDecompose = firePosition.decompose(this.firePositionDecompose);

						var missile = Gb.create(this.missileType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: selfMatrix.decompose(selfDecompose).rotation - 180,
							x: this.firePositionDecompose.x,
							y: this.firePositionDecompose.y,
							target: this.target
						});

						if (this.firePositionIndex < this.firePositions.length - 1) {
							this.firePositionIndex++;
						}
						else {
							this.firePositionIndex = 0;
						}

						var viewportList = missile.getViewportList();

						for (var i = 0; i < viewportList.length; i++) {
							Gb.viewports.get(viewportList[i].viewport).getLayer(viewportList[i].layer).moveGameObjectToBack(missile);
						}

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
