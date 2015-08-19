define(["component"], function(Component) {
	var StraightLineMovementVector = Component.extend({
		init: function() {
			this._super();
		},

		start: function(parent) {
	      	var a = Math.atan2(this.parent.vector.y, this.parent.vector.x);

			if (a < 0) {
				a += 2 * Math.PI;
			}

			if (this.parent.spread) {
				a += this.parent.spread;
			}

			this.vecX = Math.cos(a) * (this.direction || 1);
			this.vecY = Math.sin(a) * (this.direction || 1);
		},

		update: function(delta) {
			this.parent.x += this.vecX * delta * this.parent.speed; 
      		this.parent.y += this.vecY * delta * this.parent.speed;
		}
	});

	return StraightLineMovementVector;
});