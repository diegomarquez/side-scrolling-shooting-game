define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
	var CannonBullet = GameObject.extend({
		init: function() {
			this._super();

			this.speed = 0;
			this.life = 100000;
		},

		editorStart: function() {
			this.life = 100000;
			this.rotation = this.angle;
		},

		editorUpdate: function(delta) {
			this.x += Math.cos(this.angle * (Math.PI/180)) * delta * this.speed; 
			this.y += Math.sin(this.angle * (Math.PI/180)) * delta * this.speed; 

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

	return CannonBullet;
});
