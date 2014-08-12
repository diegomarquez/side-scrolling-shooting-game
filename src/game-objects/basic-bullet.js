define(["game-object", "reclaimer"], function(GameObject, Reclaimer) {
	var BasicBullet = GameObject.extend({		
		// Contructor
		init: function() {
			this._super();
		},

		start: function() {
			this._super();

			this.life = 50;
		},

		update: function(delta) {
			this.x += 5;

			if (this.life < 0) {
				Reclaimer.claim(this);
			} else {
				this.life--;
			}
		},

		onCollide: function(other) {}
	});

	return BasicBullet;
});
