define(function (require) {
	
	var r = {};
	var m = null;
	var startOffsetX = null;
	var startOffsetY = null;
	var stepX = null;
	var stepY = null;

	var IconGizmoHandle = require("game-object").extend({		
		init: function() {
			this._super();

			m = new (require("matrix-3x3"))();
		},

		added: function() { 
			this._super();

			this.on(this.MOUSE_DRAG_START, this, function(mouseData) {
	    	stepX = require("editor-config").getGridCellSize().width;
				stepY = require("editor-config").getGridCellSize().height;

	    	if (require("snap-to-grid-value").get()) {
	    		r = this.getTransform(r, m);
	        
	        startOffsetX = (r.x - (r.x % stepX)) - r.x;
	        startOffsetY = (r.y - (r.y % stepY)) - r.y;
	      }
      });

	    this.on(this.MOUSE_DRAG, this, function(mouseData) {
				if (require("snap-to-grid-value").get()) {
					mouseData.go.x = startOffsetX + (mouseData.go.X - (mouseData.go.X % stepX));
       		mouseData.go.y = startOffsetY + (mouseData.go.Y - (mouseData.go.Y % stepY));
       	}
      });

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
