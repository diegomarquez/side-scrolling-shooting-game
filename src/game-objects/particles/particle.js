define(["game-object", "util"], function(GameObject, Util) {
	var Particle = GameObject.extend({
		init: function() {
			this._super();

			this.angle = null;
			this.speed = null;
			this.spread = null;
			this.life = null;
			this.vector = null;

			this.angleRange = null;
			this.speedRange = null;
			this.spreadRange = null;
			this.lifeRange = null;
		},

		start: function() {
			this.speed = Util.rand_f(this.speedRange.min, this.speedRange.max);
			this.life = Util.rand_f(this.lifeRange.min, this.lifeRange.max);

			if (this.angleRange) {
				this.angle = Util.rand_i(this.angleRange.min, this.angleRange.max) * (Math.PI/180); 
			}

			if (this.spreadRange) {
				this.spread = Util.rand_i(this.spreadRange.min, this.spreadRange.max) * (Math.PI/180);  
			}

			this._super();
		},

		recycle: function() {
			this.angle = null;
			this.speed = null;
			this.spread = null;
			this.life = null;
			this.vector = null;

			this.angleRange = null;
			this.speedRange = null;
			this.spreadRange = null;
			this.lifeRange = null;

			this._super();
		}
	});

	return Particle;
});
