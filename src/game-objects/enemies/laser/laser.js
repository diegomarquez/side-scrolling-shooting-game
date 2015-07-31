define(["editor-game-object-container", "gb", "sat", "timer-factory"], function(GameObject, Gb, SAT, TimerFactory) {

	var step = 5;

	var Laser = GameObject.extend({
		init: function() {
			this._super();

			this.collisionPointFound = false;
			this.collisionPoint = { x: 0, y: 0 };
			this.collisionDistance = 0;

			this.dirX = 0;
			this.dirY = 0;

			this.laserHit = null;
		},

		editorStart: function() {		 	
		 	this.collisionPointFound = false;
			this.collisionDistance = 0;

			this.collisionPoint.x = 0;
			this.collisionPoint.y = 0;

			this.dirX = 0;
			this.dirY = 0;

		 	this.renderer.disable();

		 	TimerFactory.get(this, 'collisionTimer', 'collisionTimer');
		 	this.collisionTimer.configure({ delay: 50, removeOnComplete:true });

		 	this.collisionTimer.on(this.collisionTimer.COMPLETE, function() {
				if (this.collisionPointFound) {
					return;
				}

				this.collisionDistance = 1500;
				this.collisionPointFound = true;
				this.renderer.enable();
			}, true);

		 	this.collisionTimer.start();
		},

		editorUpdate: function(delta) {
			
		},

		recycle: function() {
			this.collisionPointFound = false;
			this.collisionDistance = 0;

			this.collisionPoint.x = 0;
			this.collisionPoint.y = 0;

			this.dirX = 0;
			this.dirY = 0;

			if (this.laserHit)
				Gb.reclaimer.mark(this.laserHit);
			
			if (this.collisionTimer)
				this.collisionTimer.remove();

			this.laserHit = null;

			this._super();
		},

		onCollide: function(other) {
			if (other.poolId == 'Obstacle' && !this.collisionPointFound) {
				this.collisionDistance = 0;

				// Get the initial point from which to start testing for a collision
				this.concatenateMatrix(this.getMatrix()).transformPoint(0, 0, this.collisionPoint);

				this.dirX = Math.cos(this.rotation * (Math.PI/180)) * step; 
		 		this.dirY = Math.sin(this.rotation * (Math.PI/180)) * step;

		 		var collider = other.findComponents().firstWithProp('collider').collider;

				for (var i = 0; i < this.renderer.rendererWidth()/step; i++) {

					if (SAT.pointInPolygon(this.collisionPoint, collider)) {
						this.collisionPointFound = true;
						// Activate the renderer
						this.renderer.enable();

						this.laserHit = Gb.create('LaserHit', this.getUpdateGroup(), this.getViewportList(), {
							x: this.collisionPoint.x,
							y: this.collisionPoint.y
						});

						this.laserHit.renderer.play();

						return;
					}

					this.collisionPoint.x += this.dirX;
					this.collisionPoint.y += this.dirY;

					this.collisionDistance += step;
				}
				
				return;
			}

			if (other.typeId == 'player-ship') {

			}
		}
	});

	return Laser;
});
