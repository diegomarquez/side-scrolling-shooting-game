define(function (require) {
	
	var center = new (require('vector-2D'))();
	var handle = new (require('vector-2D'))();
	var startOffsetX = 0;
	var startOffsetY = 0;
	var stepX = 0;
	var stepY = 0;
	var m = new (require("matrix-3x3"))();
	var r = {};

	var CircleGizmoHandle = require('fixed-gizmo-handle').extend({		
		init: function() {
			this._super();
		},

		added: function() { 
			this._super();

			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			this.x = parentCollider.collider.r;
			this.y = 0;

			this.on(this.MOUSE_DRAG_START, this, function(mouseData) {
				stepX = Number(require("editor-config").getGridCellSize().width.toFixed(2));
				stepY = Number(require("editor-config").getGridCellSize().height.toFixed(2));

				if (require("snap-to-grid-value").get()) {
					r = this.parent.getTransform(r, m);
				 
					startOffsetX = (r.x - (r.x % stepX)) - r.x;
					startOffsetY = (r.y - (r.y % stepY)) - r.y;
				}
			});

			this.on(this.MOUSE_DRAG, this, function(mouseData) {
				if (require("snap-to-grid-value").get()) {
					mouseData.go.x = startOffsetX + (stepX * Math.floor(((startOffsetX + mouseData.go.X) / stepX) + 0.5));
					mouseData.go.y = startOffsetY + (stepY * Math.floor(((startOffsetY + mouseData.go.Y) / stepY) + 0.5));
				}

				handle.x = mouseData.go.x;
				handle.y = mouseData.go.y;

				parentCollider.collider.r = center.distance(handle);
			});

			parentCollider.on(parentCollider.CHANGE_RADIUS, this, function(radius) {
				this.x = radius;
				this.y = 0;
			});
		},

		start: function() {
			this._super();

			this.Dragable = true;
		}
	});

	return CircleGizmoHandle;
});
