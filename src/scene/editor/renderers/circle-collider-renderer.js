define(["path-renderer", "draw", "vector-2D"], function(PathRenderer, Draw, Vector2D) {
	var p = new Vector2D();

	var CircleColliderRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.skipCache = true;

			this.name = 'circle-collider-renderer';
			this.offset = 'center';

			this._super();
		},
		
		drawPath: function(context, viewport) {
			// Store current context
			context.save();
			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);			
			// Apply transformations for the current [viewport](@@viewport@@)
			viewport.transformContext(context);
			
			// Drawing code
			p = this.parent.matrix.transformPoint(0, 0, p);		
			Draw.circle(context, p.x, p.y, this.parent.parentCollider.Radius, null, "#00FF00", 2);

			// Restore original context
			context.restore();
		},

		rendererWidth: function() { 
			return (this.parent.parentCollider.Radius*2); 
		},
		
		rendererHeight: function() { 
			return (this.parent.parentCollider.Radius*2); 
		}
	});

	return CircleColliderRenderer;
});


