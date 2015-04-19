define(["component"], function(Component) {

	var AngleModifier = Component.extend({
		init: function() {
			this._super();

			this.step = null;
		},

		update: function(delta) {
			this.parent.angle += this.step;
		}
	});

	return AngleModifier;
});