define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
	var BasicBullet = GameObject.extend({
		init: function() {
			this._super();

			this.speed = 500;
			this.life = 50;
			this.angle = 0;
		},

		editorStart: function() {
			this.life = 50;
		},

		editorUpdate: function(delta) {

			this.x += Math.cos(this.angle) * delta * this.speed;
			this.y += Math.sin(this.angle) * delta * this.speed;

			if (this.life < 0) {
				Reclaimer.claim(this);
			} else {
				this.life--;
			}
		},

		onCollide: function(other) {
			Reclaimer.mark(this);
		}
	});

	return BasicBullet;
});
