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

			this.laser = null;
			this.laserBurst = null;
		},

		recycle: function() {
			if (this.laser)
				Gb.reclaimer.mark(this.laser);
			
			if (this.laserBurst)
				Gb.reclaimer.mark(this.laserBurst);

			this.laser = null;
			this.laserBurst = null;

			this._super();
		},

		deActivate: function() {
			if (this.laser)
				Gb.reclaimer.mark(this.laser);
			
			if (this.laserBurst)
				Gb.reclaimer.mark(this.laserBurst);

			this.laser = null;
			this.laserBurst = null;

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

					var laserStartPosition = this.findChildren().firstWithType("LaserStartPosition");

					startPositionMatrix = laserStartPosition.getMatrix(startPositionMatrix);
					startPositionDecompose = startPositionMatrix.decompose(startPositionDecompose);

					selfMatrix = this.getMatrix(selfMatrix);
					selfDecompose = selfMatrix.decompose(selfDecompose);

					this.laser = Gb.create('Laser', this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						rotation: selfDecompose.rotation-90,
						x: startPositionDecompose.x,
						y: startPositionDecompose.y
					});

					this.laserBurst = Gb.create('LaserBurst', this.parent.getUpdateGroup(), this.parent.getViewportList(), {
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
