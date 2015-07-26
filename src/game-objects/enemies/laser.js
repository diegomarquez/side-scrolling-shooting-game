define(["editor-game-object-container", "reclaimer", "sat"], function(GameObject, Reclaimer, SAT) {

	var step = 5;

	var Laser = GameObject.extend({
		init: function() {
			this._super();

			this.collisionPointFound = false;
			this.collisionPoint = { x: 0, y: 0 };
			this.collisionDistance = 0;

			this.dirX = 0;
			this.dirY = 0;
		},

		editorStart: function() {		 	
		 	this.renderer.disable();
		},

		editorUpdate: function(delta) {
			
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
