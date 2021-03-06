define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
	
	var selfDecompose = {};
	var selfMatrix = null;

	var startPositionDecompose = {};
	var startPositionMatrix = null;

	var LaserShooter = GameObject.extend({
		init: function() {
			this._super();

			this.damaged = false;
			this.bursting = false;

			this.shootTimer = 0;
			this.burstTimer = 0;
			
			this.shootTime = 0;
			this.burstTime = 0;

			this.laserObjectId = "";
			this.burstObjectId = "";

			this.laser = null;
			this.laserBurst = null;
		},

		recycle: function() {
			this.execute("end-laser-attack");

			if (this.laser)
				Gb.reclaimer.mark(this.laser);
			
			if (this.laserBurst)
				Gb.reclaimer.mark(this.laserBurst);

			this.laser = null;
			this.laserBurst = null;

			this._super();
		},

		deActivate: function() {

			if (this.laser) {
				setTimeout(function() {
					this.execute("end-laser-attack");
					
					Gb.reclaimer.mark(this.laser);
					this.laser = null;
				}.bind(this), 1000);
			}
			
			if (this.laserBurst) {
				setTimeout(function() {
					Gb.reclaimer.mark(this.laserBurst);
					this.laserBurst = null;
				}.bind(this), 1000);
			}
			
			this.damaged = false;
			this.bursting = false;

			this.shootTimer = 0;
			this.burstTimer = 0;
		},

		editorStart: function() {
			this.damaged = false;
			this.bursting = false;

			this.shootTimer = 0;
			this.burstTimer = 0;
			
			this.parent.on(this.parent.DAMAGE, this, function() {
				this.damaged = true;
				this.bursting = false;

				this.shootTimer = 0;
				this.burstTimer = 0;
				
				this.execute("end-laser-attack");

				if (this.laser)
					Gb.reclaimer.mark(this.laser);
				
				if (this.laserBurst)
					Gb.reclaimer.mark(this.laserBurst);

				this.laser = null;
				this.laserBurst = null;
			});

			this.parent.on(this.parent.REPAIR, this, function() {
				this.damaged = false;
			});
		},

		editorUpdate: function(delta) {
			if (this.damaged) return;

			if (!this.bursting) {

				// Prevent update until the cannon has been started
				if (!this.parent.started) return;

				this.shootTimer++;

				if (this.shootTimer % this.shootTime == 0) {
					this.bursting = true;
					this.burtsTimer = 0;

					this.execute("laser-attack");

					var laserStartPosition = this.findChildren().firstWithType("FirePosition");

					startPositionMatrix = laserStartPosition.getMatrix(startPositionMatrix);
					startPositionDecompose = startPositionMatrix.decompose(startPositionDecompose);

					selfMatrix = this.getMatrix(selfMatrix);
					selfDecompose = selfMatrix.decompose(selfDecompose);

					this.laser = Gb.create(this.laserObjectId, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						rotation: selfDecompose.rotation-90,
						x: startPositionDecompose.x,
						y: startPositionDecompose.y
					});

					this.laserBurst = Gb.create(this.burstObjectId, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						rotation: selfDecompose.rotation,
						x: startPositionDecompose.x,
						y: startPositionDecompose.y
					});

					this.laserBurst.renderer.play();
				}
			}

			if (this.bursting) {
				this.burtsTimer++;

				if (this.burtsTimer % this.burstTime == 0) {
					this.bursting = false;
					this.shootTimer = 0;

					this.execute("end-laser-attack");

					if (this.laser)
						Gb.reclaimer.mark(this.laser);
					
					if (this.laserBurst)
						Gb.reclaimer.mark(this.laserBurst);

					this.laser = null;
					this.laserBurst = null;
				}
			}
		}
	});

	return LaserShooter;
});
