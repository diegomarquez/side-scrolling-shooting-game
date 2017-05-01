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

	var util = require('util');

	var ScaleGizmoHandle = require("fixed-gizmo-handle").extend({		
		init: function() {
			this._super();
		},

		added: function() { 
			this._super();

			this.x = 0;
			this.y = 50;

			this.startDistance = 0;
			this.currentDistance = 0;

			this.startScaleX = 0;
			this.startScaleY = 0;

			this.increment = 0;

			this.on(this.MOUSE_DRAG_START, this, function(mouseData) {
				stepX = Number(require("editor-config").getGridCellSize().width.toFixed(2));
				stepY = Number(require("editor-config").getGridCellSize().height.toFixed(2));

				if (require("snap-to-grid-value").get()) {
					r = this.parent.getTransform(r, m);
				 
					startOffsetX = (r.x - (r.x % stepX)) - r.x;
					startOffsetY = (r.y - (r.y % stepY)) - r.y;
				}

				selfMatrix = this.getMatrix(selfMatrix);
				parentMatrix = this.parent.getMatrix(parentMatrix);

				selfTransform = selfMatrix.decompose(selfTransform);
				parentTransform = parentMatrix.decompose(parentTransform);

				var deltaX = selfTransform.x - parentTransform.x;
				var deltaY = selfTransform.y - parentTransform.y;

				this.startDistance = Math.round(Math.sqrt(deltaX*deltaX + deltaY*deltaY));

				this.startScaleX = this.parent.scaleX;
				this.startScaleY = this.parent.scaleY;
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
		
				var deltaX = (selfTransform.x - parentTransform.x);
				var deltaY = (selfTransform.y - parentTransform.y);

				this.currentDistance = Math.round(Math.sqrt(deltaX*deltaX + deltaY*deltaY));
				this.increment = (this.currentDistance - this.startDistance);

				this.increment = util.map(this.increment, 0, this.startDistance, 0, this.startScaleX); 

				this.parent.scaleX = this.startScaleX + this.increment;
				this.parent.scaleY = this.startScaleY + this.increment;
			});
		},

		getMatrix: function() {
			parentMatrix = this.parent.getMatrix(parentMatrix);

			if (!this.Draging)
			{
				this.x = 0;
				this.y = 50;
			}
			
			this.matrix.initialize(1, 0, 0, 1, parentMatrix.tx + this.x, parentMatrix.ty + this.y);

			return this.matrix;
		},

		start: function() {
			this._super();

			this.Dragable = true;
		},
	});

	return ScaleGizmoHandle;
});
