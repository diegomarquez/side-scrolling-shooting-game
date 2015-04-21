define(["game-object", "matrix-3x3", "snap-to-grid-value"], function(GameObject, Matrix, SnapToGridValue) {
	
	var r = {};
	var m = new Matrix();

	var IconGizmoHandle = GameObject.extend({		
		init: function() {
			this._super();
		},

		added: function() { 
			this._super();

			var stepX = 400/12;
			var stepY = 300/12;

	    this.on(this.MOUSE_DRAG, this, function(mouseData) {
	    	if (SnapToGridValue.get()) {
	        // Snap to grid logic
	        mouseData.go.x = stepX * Math.floor((mouseData.go.x / stepX) + 0.5);
       	 	mouseData.go.y = stepY * Math.floor((mouseData.go.y / stepY) + 0.5);
	      }
      });

      this.on(this.MOUSE_DRAG_END, this, function(mouseData) {
      	r = this.getTransform(r, m);

      	this.parent.x = r.x;
      	this.parent.y = r.y;

      	this.x = 0;
      	this.y = 0;

      	console.log("STOP DRAG");
      });
		},

		start: function() {
			this._super();

			this.Dragable = true;
		}
	});

	return IconGizmoHandle;
});
