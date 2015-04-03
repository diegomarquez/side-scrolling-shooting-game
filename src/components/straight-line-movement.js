define(["editor-component", "gb"], function(EditorComponent, Gb) {
	var StraightLineMovement = EditorComponent.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			var angle = this.parent.angle();

      this.vecX = Math.cos(angle);
      this.vecY = Math.sin(angle);
		},

		editorUpdate: function(delta) {
			this.parent.x += this.vecX * delta * this.parent.speed; 
      this.parent.y += this.vecY * delta * this.parent.speed;
		}
	});

	return StraightLineMovement;
});