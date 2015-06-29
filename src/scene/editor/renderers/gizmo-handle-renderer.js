define(["path-renderer", "draw"], function(PathRenderer, Draw) {
	var m = null;

	var GizmoHandleRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.skipCache = true;

			this.width = 10; 
			this.height = 10;
			this.name = 'gizmo-handle-renderer';
			this.offset = 'center';

			this._super();
		},
		
		drawPath: function(context, viewport) {
			context.save();

			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);
			// Apply transformations for the current [viewport](@@viewport@@)
			viewport.transformContext(context);
			// Get parent game object transformation matrix
			m = this.parent.getMatrix();
			// Drawing code
			context.transform(1, 0, 0, 1, m.tx, m.ty);
			context.translate(-this.rendererOffsetX() + 0.5, -this.rendererOffsetY() + 0.5);

			Draw.rectangle(context, -10, -10, 10, 10, null, '#f0ad4e', 1);
			Draw.rectangle(context, -6, -6, 2, 2, '#f0ad4e', '#f0ad4e', 1);

			context.restore();
		}
	});

	return GizmoHandleRenderer;
});


