define(["editor-component", "gb", "util"], function(EditorComponent, Gb, Util) {
	var ClaimOnLifeDepleted = EditorComponent.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
      this.pLife = parent.life;
		},

		editorUpdate: function(delta) {
      if (this.pLife > 0) {
      	this.pLife -= this.parent.speed * delta;
      } else {
      	Gb.reclaimer.mark(this.parent);
      }
		}
	});

	return ClaimOnLifeDepleted;
});