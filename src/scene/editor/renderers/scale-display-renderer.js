define(["path-renderer", "draw", "vector-2D"], function(PathRenderer, Draw, Vector2D) {
	var m = null;
	var t = {};

	var center = new Vector2D();

	var ScaleDisplayRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.skipCache = true;

			this.name = 'scale-display-renderer';

			this._super();

			this.handle = this.parent.parent.findChildren().firstWithType("ScaleGizmoHandle");
		},
		
		drawPath: function(context, viewport) {
			// Store current context
			context.save();
			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);			
			// Apply transformations for the current [viewport](@@viewport@@)
			viewport.transformContext(context);
			
			context.beginPath();
			context.strokeStyle = "#0000FF";
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
			return this.handle.x / this.handle.parent.getMatrix().decompose(t).scaleX;
		},
		
		rendererHeight: function() { 
			return this.handle.y / this.handle.parent.getMatrix().decompose(t).scaleY;
		}
	});

	return ScaleDisplayRenderer;
});
