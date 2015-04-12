define(["component"], function(Component) {

	var SineAngleModifier = Component.extend({
		init: function() {
			this._super();
		
			this.counter = 0;
			this.amplitude = 1;
			this.period = 1;
		},

		start: function() {
			this.counter = Math.random() * 360;
			this.angleOffset = this.angleOffset || 90;
			this.angleOffset = (Math.PI/180) * this.angleOffset;
			this.step = (Math.PI/180) / this.amplitude;
		},

		update: function (delta) {
			this.counter += this.step;
			this.parent.angle = Math.cos(this.counter * this.period) - this.angleOffset;
		}
	});

	return SineAngleModifier;
});



   