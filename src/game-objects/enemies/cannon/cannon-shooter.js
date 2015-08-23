define(["editor-game-object-container", "gb", "player-getter"], function(GameObject, Gb, PlayerGetter) {
	var targetDecompose = {};
	var targetMatrix = null;

	var selfDecompose = {};
	var selfMatrix = null;

	var Cannon = GameObject.extend({
		init: function() {
			this._super();

			this.bulletType = '';
		},

		editorStart: function() {
			this.damaged = false;

			this.shootTimer = 0;
			this.burtsTimer = 0;

			this.bursting = false;
			this.target = PlayerGetter.get();
			this.currentBurstCount = 0;
			this.bulletCount = this.bullets;

			this.firePosition = this.findChildren().firstWithType('FirePosition');

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

			this.rotation = (Math.atan2(deltaY, deltaX) - ((this.parent.rotation) * (Math.PI/180)) ) * (180 / Math.PI);
			this.rotation = this.rotation % 360;

			if (!this.bursting) {
				// Prevent update until the cannon has been started
				if (!this.parent.started) return;

				this.shootTimer++;

				if (this.shootTimer % (this.rate + this.rateVariation) == 0) {
					if (this.bulletCount > 0 || this.bullets == -1) {
						this.bursting = true;
						this.burtsTimer = 0;
					}
				}
			}

			if (this.bursting) {
				this.burtsTimer++;

				if (this.burtsTimer % 10 == 0) {
					if (this.currentBurstCount < this.burstAmount) {
						selfDecompose = this.firePosition.getMatrix().decompose(selfDecompose);
						
						Gb.create(this.bulletType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: selfDecompose.rotation,
							x: selfDecompose.x,
							y: selfDecompose.y
						});

						this.currentBurstCount++;
					} else {
						this.currentBurstCount = 0;
						this.shootTimer = 0;
						this.bursting = false;
						this.bulletCount--;
					}
				}
			}
		}
	});

	return Cannon;
});
