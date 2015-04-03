define(["editor-component", "gb"], function(EditorComponent, Gb) {
	var ClaimOnLifeDepleted = EditorComponent.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
      
		},

		editorUpdate: function(delta) {
      if (this.parent.life > 0) {
      	this.parent.life -= this.parent.speed * delta;
      } else {
      	Gb.reclaimer.mark(this.parent);
      }
		}
	});

	return ClaimOnLifeDepleted;
});