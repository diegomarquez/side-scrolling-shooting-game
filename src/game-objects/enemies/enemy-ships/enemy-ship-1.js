define(["editor-game-object-container", "reclaimer", "player-getter"], function(GameObject, Reclaimer, PlayerGetter) {
	var EnemyShip_1 = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.angle = 0;
			this.speed = 0;
			this.wayPoints = null;
		},

		editorStart: function() {
			if (this.hp == 0)
				throw new Error('Enemy ship is missing hp attribute');

			if (this.speed == 0)
				throw new Error('Enemy ship is missing speed attribute');

			if (this.moveTime == 0)
				throw new Error('Enemy ship is missing moveTime attribute');

			this.renderer.play();

			this.findComponents().firstWithType('AngleMovement').disable();

			this.once('finish-movement', this, function() {

				this.angle = this.rotation * (Math.PI/180);

				this.findComponents().firstWithType('AngleMovement').enable();
			});
		},

		deActivate: function() {
			Reclaimer.mark(this);
		},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			if (other.poolId == 'Obstacle') {
				this.hp = 0;
			}

			if (other.typeId == 'player-ship') {
				this.hp = 0;
			}
		}
	});

	return EnemyShip_1;
});

