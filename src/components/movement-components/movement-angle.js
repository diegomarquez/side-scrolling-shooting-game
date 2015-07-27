define(["component"], function(Component) {
	var MovementAngle = Component.extend({
		init: function() {
			this._super();
		},

		start: function(parent) {
			if (this.parent.spread) {
				this.parent.angle += this.parent.spread;
			}
		},

		update: function(delta) {
			this.parent.x += Math.cos(this.parent.angle) * delta * this.parent.speed; 
      		this.parent.y += Math.sin(this.parent.angle) * delta * this.parent.speed;
		}
	});

	return MovementAngle;
});