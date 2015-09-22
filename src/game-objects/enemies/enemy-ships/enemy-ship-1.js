define(["editor-game-object-container", "reclaimer", "player-getter"], function(GameObject, Reclaimer, PlayerGetter) {
	var EnemyShip_1 = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.angle = 0;
			this.speed = 0;
			this.moveTime = 0;
		},

		editorStart: function() {
			if (this.hp == 0)
				throw new Error('Enemy ship is missing hp attribute');

			if (this.speed == 0)
				throw new Error('Enemy ship is missing speed attribute');

			if (this.moveTime == 0)
				throw new Error('Enemy ship is missing moveTime attribute');

			this.renderer.play();

			this.once('finish-movement', this, function() {

				var player = PlayerGetter.get();
				var d = player.getDirection();
				var angle = 0;

				// Right - Left
				if (d == 0 || d == 180) {
					if (this.X <= player.X) {
						angle = 0;
					} else {
						angle = 180;
					}
				}

				// Up - Down
				if (d == 270 || d == 90) {
					if (this.Y <= player.Y) {
						angle = 90;
					} else {
						angle = 270;
					}
				}

				this.angle = angle * (Math.PI/180);
				this.rotation = angle;

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

