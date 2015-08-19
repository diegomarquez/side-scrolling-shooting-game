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

		draw: function(context, viewport) {
			if (!this.isTransformed) return;

			context.save();

			var m = this.getMatrix();

			context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
			
			if (m.alpha != 1) {
				 context.globalAlpha *= m.alpha;
			}

			if (m.alpha > 0) {
				if(this.renderer && this.renderer.isEnabled()) {
					this.renderer.draw(context, viewport);
				}
			}

			context.restore();
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
