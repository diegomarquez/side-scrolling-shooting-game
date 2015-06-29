define(function (require) {
	
	var selfMatrix = null;
	var parentMatrix = null;
	var selfTransform = {};
	var parentTransform = {};

	var ScaleGizmoHandle = require("fixed-gizmo-handle").extend({		
		init: function() {
			this._super();
		},

		added: function() { 
			this._super();

			this.x = 0;
			this.y = 0;

			this.startDistance = 0;
			this.currentDistance = 0;

			this.startScaleX = 0;
			this.startScaleY = 0;

			this.increment = 0;

			this.on(this.MOUSE_DRAG_START, this, function(mouseData) {
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
				selfMatrix = this.getMatrix(selfMatrix);
				parentMatrix = this.parent.getMatrix(parentMatrix);

				selfTransform = selfMatrix.decompose(selfTransform);
				parentTransform = parentMatrix.decompose(parentTransform);
		
				var deltaX = (selfTransform.x - parentTransform.x);
				var deltaY = (selfTransform.y - parentTransform.y);

				this.currentDistance = Math.round(Math.sqrt(deltaX*deltaX + deltaY*deltaY));

				this.increment = (this.currentDistance - this.startDistance) * (1/100);

				this.parent.scaleX = this.startScaleX + this.increment;
				this.parent.scaleY = this.startScaleY + this.increment;
			});
		},

		start: function() {
			this._super();

			this.Dragable = true;
		},
	});

	return ScaleGizmoHandle;
});
