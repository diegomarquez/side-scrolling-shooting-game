define(["editor-component"], function(EditorComponent) {
	var StraightLineMovementVector = EditorComponent.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
      var a = Math.atan2(this.parent.vector.y, this.parent.vector.x) * (180/Math.PI);

    	a = (a + 360) % 360;

    	if (this.parent.spread) {
				a += this.parent.spread;
			}

    	this.vecX = Math.cos(a * (Math.PI/180)) * (this.direction || 1);
    	this.vecY = Math.sin(a * (Math.PI/180)) * (this.direction || 1);
				
			this.speed = this.parent.speed;		
		},

		editorUpdate: function(delta) {
			this.parent.x += this.vecX * delta * this.speed; 
      this.parent.y += this.vecY * delta * this.speed;
		}
	});

	return StraightLineMovementVector;
});