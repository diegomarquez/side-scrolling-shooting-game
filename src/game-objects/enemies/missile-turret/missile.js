define(["editor-game-object-container", "reclaimer", "timer-factory"], function(GameObject, Reclaimer, TimerFactory) {
	
	var targetDecompose = {};
	var targetMatrix = null;

	var selfDecompose = {};
	var selfMatrix = null;

	var Missile = GameObject.extend({
		init: function() {
			this._super();

			this.aiming = false;
			this.locked = false;
			this.deltaX = 0;
			this.deltaY = 0;
			this.angle = 0;
			this.target = null;
			this.rotationDirection = 1;
			this.newRotation = 0;
		},

		editorStart: function() {
			this.life = 500000;
			this.speed = 200;

			this.rotation = this.angle;

			this.aiming = false;
			this.locked = false;

			TimerFactory.get(this, 'straightMovement', 'straightMovement');
			TimerFactory.get(this, 'aimMovement', 'aimMovement');

			this.straightMovement.configure({ delay: 1500 });
			this.aimMovement.configure({ delay: 3000 });
			
			this.straightMovement.start();

			this.straightMovement.on(this.straightMovement.COMPLETE, function() {
				this.aiming = true;

				targetMatrix = this.target.getMatrix(targetMatrix);
				targetDecompose = targetMatrix.decompose(targetDecompose);

				selfMatrix = this.getMatrix(selfMatrix);
				selfDecompose = selfMatrix.decompose(selfDecompose);
				
				this.deltaX = targetDecompose.x - selfDecompose.x;
				this.deltaY = targetDecompose.y - selfDecompose.y;

				this.newRotation = (Math.atan2(this.deltaY, this.deltaX)) * (180 / Math.PI) + 180;
				this.newRotation = this.newRotation % 360;

				var newDirection = (this.newRotation - this.rotation) % 360;

				if (newDirection < 0) {
					newDirection += 360;
				}

				this.rotationDirection = newDirection > 180 ? 1 : -1;

				this.aimMovement.start();
			}, true);

			this.aimMovement.on(this.aimMovement.COMPLETE, function() {
				this.aiming = false;
				this.locked = false;
			}, true);

			this.renderer.play();
		},

		recycle: function() {
			if (this.straightMovement)
				this.straightMovement.remove();

			if (this.aimMovement)
				this.aimMovement.remove();

			this._super();
		},

		editorUpdate: function(delta) {
			if (this.aiming) {
				this.rotation += this.rotationDirection * 3;

				targetMatrix = this.target.getMatrix(targetMatrix);
				targetDecompose = targetMatrix.decompose(targetDecompose);

				selfMatrix = this.getMatrix(selfMatrix);
				selfDecompose = selfMatrix.decompose(selfDecompose);
				
				this.deltaX = targetDecompose.x - selfDecompose.x;
				this.deltaY = targetDecompose.y - selfDecompose.y;

				this.newRotation = (Math.atan2(this.deltaY, this.deltaX)) * (180 / Math.PI) + 180;
				this.newRotation = this.newRotation % 360;

				var newDirection = (this.newRotation - this.rotation) % 360;

				if (newDirection < 0) {
					newDirection += 360;
				}

				newDirection = newDirection > 180 ? 1 : -1;

				if (this.rotationDirection != newDirection) {
				 	this.aiming = false;
				 	this.locked = true;
				}
			}

			if (this.locked) {
				targetMatrix = this.target.getMatrix(targetMatrix);
				targetDecompose = targetMatrix.decompose(targetDecompose);

				selfMatrix = this.getMatrix(selfMatrix);
				selfDecompose = selfMatrix.decompose(selfDecompose);
				
				this.deltaX = targetDecompose.x - selfDecompose.x;
				this.deltaY = targetDecompose.y - selfDecompose.y;

				this.rotation = (Math.atan2(this.deltaY, this.deltaX)) * (180 / Math.PI);
			}

			this.x += Math.cos(this.rotation * (Math.PI/180)) * delta * this.speed; 
			this.y += Math.sin(this.rotation * (Math.PI/180)) * delta * this.speed;

			if (this.life > 0) {
				this.life -= this.speed;
			} else {
				Reclaimer.mark(this);
			}
		},

		onCollide: function(other) {
			Reclaimer.mark(this);
		}
	});

	return Missile;
});

