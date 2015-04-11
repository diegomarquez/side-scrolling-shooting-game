define(["component", "gb", "util"], function(Component, Gb, Util) {
	var ClaimOnLifeDepleted = Component.extend({
		init: function() {
			this._super();
		},

		start: function(parent) {
      this.pLife = parent.life;
      this.pSpeed = this.parent.speed;
		},

		update: function(delta) {
      if (this.pLife > 0) {
      	this.pLife -= this.pSpeed * delta;
      } else {
      	Gb.reclaimer.mark(this.parent);
      }
		}
	});

	return ClaimOnLifeDepleted;
});