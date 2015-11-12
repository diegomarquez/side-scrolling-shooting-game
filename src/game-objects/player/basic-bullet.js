define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
	var BasicBullet = GameObject.extend({
		init: function() {
			this._super();

			this.speed = 800;
			this.life = 100;
			this.angle = 0;
			this.playerSpeed = 0;
		},

		editorStart: function() {
			this.life = 50;
			this.renderer.play();
		},

		editorUpdate: function(delta) {

			this.x += Math.cos(this.angle) * delta * (this.speed + this.playerSpeed/4);
			this.y += Math.sin(this.angle) * delta * (this.speed + this.playerSpeed/4);

			if (this.life < 0) {
				Reclaimer.mark(this);
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
