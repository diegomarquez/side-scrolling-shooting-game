define(["component"], function(Component) {
	var StraightLineMovementAngle = Component.extend({
		init: function() {
			this._super();
		},

		start: function(parent) {
			if (this.parent.spread) {
				this.parent.angle += this.parent.spread;
			}

    		this.vecX = Math.cos(this.parent.angle);
    		this.vecY = Math.sin(this.parent.angle);
		},

		update: function(delta) {
			this.parent.x += this.vecX * delta * this.parent.speed; 
 	 		this.parent.y += this.vecY * delta * this.parent.speed;
		}
	});

	return StraightLineMovementAngle;
});