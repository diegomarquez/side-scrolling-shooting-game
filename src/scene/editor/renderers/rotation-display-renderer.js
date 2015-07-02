define(["path-renderer", "draw", "vector-2D"], function(PathRenderer, Draw, Vector2D) {
	var m = null;
	var t = {};

	var center = new Vector2D();

	var RotationDisplayRenderer = PathRenderer.extend({
		init: function() {
			this._super();
			this.handle = null;
		},

		start: function() {
			this.skipCache = true;

			this.name = 'rotation-display-renderer';

			this._super();

			this.handle = this.parent.parent.findChildren().firstWithType("RotationGizmoHandle");
		},
		
		drawPath: function(context, viewport) {
			// Store current context
			context.save();
			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);			
			// Apply transformations for the current [viewport](@@viewport@@)
			viewport.transformContext(context);
			
			context.beginPath();
			context.strokeStyle = "#FF0000";
			context.lineWidth = 2;
			
			m = this.parent.getMatrix();
			t = m.decompose(t);
			context.moveTo(t.x, t.y);

			m = this.handle.getMatrix();		
			t = m.decompose(t);
			context.lineTo(t.x, t.y);
	
			context.stroke();

			// Restore original context
			context.restore();
		},

		rendererWidth: function() {
			return center.distance(this.handle);
		},
		
		rendererHeight: function() { 
			return 2;
		}
	});

	return RotationDisplayRenderer;
});
