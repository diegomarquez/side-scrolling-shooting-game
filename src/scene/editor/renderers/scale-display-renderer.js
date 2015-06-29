define(["path-renderer", "draw"], function(PathRenderer, Draw) {
	var m = null;
	var t = {};

	var ScaleDisplayRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.skipCache = true;

			this.name = 'scale-display-renderer';

			this._super();
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

			m = this.parent.parent.findChildren().firstWithType("ScaleGizmoHandle").getMatrix();
			t = m.decompose(t);
			context.lineTo(t.x, t.y);
	
			context.stroke();

			// Restore original context
			context.restore();
		},

		rendererWidth: function() { 
			return 1000;
		},
		
		rendererHeight: function() { 
			return 1000;
		}
	});

	return ScaleDisplayRenderer;
});
