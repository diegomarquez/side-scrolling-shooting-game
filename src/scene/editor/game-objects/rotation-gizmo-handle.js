define(function (require) {
	
	var selfMatrix = null;
	var parentMatrix = null;
	var selfTransform = {};
	var parentTransform = {};

	var startOffsetX = 0;
	var startOffsetY = 0;
	var stepX = 0;
	var stepY = 0;
	var m = new (require("matrix-3x3"))();
	var r = {};

	var RotationGizmoHandle = require("fixed-gizmo-handle").extend({		
		init: function() {
			this._super();
		},

		added: function() { 
			this._super();

			this.x = 50;
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
				
				selfMatrix = this.getMatrix(selfMatrix);
				parentMatrix = this.parent.getMatrix(parentMatrix);

				selfTransform = selfMatrix.decompose(selfTransform);
				parentTransform = parentMatrix.decompose(parentTransform);
		
				this.parent.rotation = Math.atan2(selfTransform.y - parentTransform.y, selfTransform.x - parentTransform.x) * (180 / Math.PI);   	
			});
		},

		start: function() {
			this._super();

			this.Dragable = true;
		},
	});

	return RotationGizmoHandle;
});
