define(["component", "gb"], function(Component, Gb) {
	var ClaimOnOutOfScreenBounds = Component.extend({
		init: function() {
			this._super();
		},

		start: function(parent) {
      		this._super(parent);

      		this.parent.on('out-of-screen-bounds', this, function() {
      			Gb.reclaimer.mark(this.parent);
      		});
		}
	});

	return ClaimOnOutOfScreenBounds;
});