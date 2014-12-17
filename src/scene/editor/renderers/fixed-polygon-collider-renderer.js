define(["path-renderer", "draw"], function(PathRenderer, Draw) {
	var p = null;

	var PolygonColliderRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.skipCache = true;

			this.width = 1; 
			this.height = 1;
			this.name = 'fixed-polygon-collider-renderer';

			this._super();
		},
		
		drawPath: function(context, viewport) {
			// Store current context
			context.save();
			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);			
			// Apply transformations for the current [viewport](@@viewport@@)
			viewport.transformContext(context);
			
			// Get a position from the matrix of the parent game object
			p = this.parent.matrix.transformPoint(0, 0, p);
		
			debugger;

			// Drawing code
			context.translate(p.x, p.y);
			Draw.polygon(context, 0, 0, this.parent.parentCollider.Points, null, "#00FF00", 2);

			// Restore original context
			context.restore();
		}
	});

	return PolygonColliderRenderer;
});


