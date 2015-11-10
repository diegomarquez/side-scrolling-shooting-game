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

			this.collidingObstacles = [];
			
			this.shortestDistance = -1;
			this.shortestCollisionPointX = 0;
			this.shortestCollisionPointY = 0;
		},

		editorStart: function() {		 	
		 	this.collisionPointFound = false;
			this.collisionDistance = 0;

			this.collisionPoint.x = 0;
			this.collisionPoint.y = 0;

			this.shortestDistance = -1;

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
			this.collidingObstacles.length = 0;

			this._super();
		},

		onCollide: function(other) {
			if (other.poolId == 'Obstacle' && !this.collisionPointFound) {
				
				if (this.collidingObstacles.indexOf(other) == -1) {
					// Push each new obstacle that the laser is colliding against
					this.collidingObstacles.push(other);	
				} else {

					// Once a repeated obstacle is collided agaist, find the closest one of the collection
				 
					this.dirX = Math.cos(this.rotation * (Math.PI/180)) * step; 
				 	this.dirY = Math.sin(this.rotation * (Math.PI/180)) * step;

					obstacles: for (var j = 0; j < this.collidingObstacles.length; j++) {
						
						var obstacle = this.collidingObstacles[j];
						var collisionDistance = 0;

						// Get the initial point from which to start testing for a collision
						this.concatenateMatrix(this.getMatrix()).transformPoint(0, 0, this.collisionPoint);

				 		var collider = obstacle.findComponents().firstWithProp('collider').collider;

						for (var i = 0; i < this.renderer.rendererWidth()/step; i++) {

							if (SAT.pointInPolygon(this.collisionPoint, collider)) {
								if (this.shortestDistance != -1 && collisionDistance < this.shortestDistance) {
									this.shortestDistance = collisionDistance;

									this.shortestCollisionPointX = this.collisionPoint.x;
									this.shortestCollisionPointY = this.collisionPoint.y;
								} else if (this.shortestDistance == -1) {
									this.shortestDistance = collisionDistance;

									this.shortestCollisionPointX = this.collisionPoint.x;
									this.shortestCollisionPointY = this.collisionPoint.y;
								}

								// Test the next obstacle in the collection
								continue obstacles;
							} else {
								// Move the collision point along the path of the laser
								this.collisionPoint.x += this.dirX;
								this.collisionPoint.y += this.dirY;
								// Increase the distance
								collisionDistance += step;	
							}
						}
					}

					// Once all distances have been calculated, find the smallest one
					this.collisionDistance = this.shortestDistance;
					// Mark that a collision point has been found
					this.collisionPointFound = true;
					
					// Activate the laser renderer
					this.renderer.enable();

					// Create the laser hit game object
					this.laserHit = Gb.create('LaserHit', this.getUpdateGroup(), this.getViewportList(), {
						x: this.shortestCollisionPointX,
						y: this.shortestCollisionPointY
					});

					// Start playing the animation of the laser hit game object
					this.laserHit.renderer.play();

				}

				// Exit the handler
				return;
			}

			if (other.typeId == 'player-ship') {

				// Exit the handler
				return;
			}
		}
	});

	return Laser;
});
