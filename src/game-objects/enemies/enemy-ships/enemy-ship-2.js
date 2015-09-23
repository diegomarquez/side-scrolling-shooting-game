define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
	var EnemyShip_2 = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.speed = 0;
			this.angle = 0;
		},

		editorStart: function() {
			if (this.hp == 0)
				throw new Error('Enemy ship is missing hp attribute');

			if (this.speed == 0)
				throw new Error('Enemy ship is missing speed attribute');

			this.renderer.play();

			this.angle = this.rotation * (Math.PI/180);
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

	return EnemyShip_2;
});

