define(["editor-component"], function(EditorComponent) {
	var StraightLineMovementAngle = EditorComponent.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			var angle = this.parent.angle;

			if (this.parent.spread) {
				angle += this.parent.spread;
			}

    	this.vecX = Math.cos(angle * (Math.PI/180));
    	this.vecY = Math.sin(angle * (Math.PI/180));	
			
			this.speed = this.parent.speed;		
		},

		editorUpdate: function(delta) {
			this.parent.x += this.vecX * delta * this.speed; 
      this.parent.y += this.vecY * delta * this.speed;
		}
	});

	return StraightLineMovementAngle;
});