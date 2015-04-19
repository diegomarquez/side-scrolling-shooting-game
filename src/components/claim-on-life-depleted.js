define(["component", "gb", "util"], function(Component, Gb, Util) {
	var ClaimOnLifeDepleted = Component.extend({
		init: function() {
			this._super();
		},

		start: function(parent) {
      this._life = parent.life;
      this._speed = parent.speed;
		},

		update: function(delta) {
      if (this._life > 0) {
      	this._life -= this._speed * delta;
      } else {
      	Gb.reclaimer.mark(this.parent);
      }
		}
	});

	return ClaimOnLifeDepleted;
});