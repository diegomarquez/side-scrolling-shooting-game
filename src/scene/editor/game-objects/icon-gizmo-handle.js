define(["game-object", "gb", "matrix-3x3"], function(GameObject, Gb, Matrix) {
	
	var r = {};
	var m = new Matrix();

	var IconGizmoHandle = GameObject.extend({		
		init: function() {
			this._super();
		},

		added: function() { 
			this._super();

      this.on(this.MOUSE_DRAG_END, this, function(mouseData) {
      	r = this.getTransform(r, m);

      	this.parent.x = r.x;
      	this.parent.y = r.y;

      	this.x = 0;
      	this.y = 0;
      });
		},

		start: function() {
			this._super();

			this.Dragable = true;
		}
	});

	return IconGizmoHandle;
});
