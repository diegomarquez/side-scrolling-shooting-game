define(["path-renderer", "draw"], function(PathRenderer, Draw) {
	var p = null;
	var m = null;

	var PolygonColliderRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.skipCache = true;

			this.name = 'polygon-collider-renderer';

			this._super();
		},
		
		drawPath: function(context, viewport) {
			// Get parent game object transformation matrix
			m = this.parent.getMatrix();
			
			// Store current context
			context.save();
			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);
			viewport.transformContext(context);
			// Drawing code
			context.save()
			context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
			Draw.polygon(context, 0, 0, this.parent.parentCollider.Points);
			context.restore()
			context.lineWidth = 2;
			context.strokeStyle = "#00FF00";
			context.stroke();
			
			// Restore original context
			context.restore();
		},

		rendererWidth: function() {
			return getPolygonSize(this.parent.parentCollider.Points, 'width');
		},
		
		rendererHeight: function() {
			return getPolygonSize(this.parent.parentCollider.Points, 'height');
		},

		rendererOffsetX: function() {
			return getOffset(this.parent.parentCollider.Points, 'x');
		},

		rendererOffsetY: function() {
			return getOffset(this.parent.parentCollider.Points, 'y');
		}
	});

	var getOffset = function (points, axis) {
		var min = points[0][axis];
    	var max = points[0][axis];

	    for (var i=1; i < points.length; i++) {
			min = Math.min(min, points[i][axis]);
			max = Math.max(max, points[i][axis]);
	    }

    	return min;
	}

	var getPolygonSize = function (points, axis) {
		axis = axis == 'width' ? 'x' : 'y';

	  	var min = points[0][axis];
    	var max = points[0][axis];

	    for (var i=1; i < points.length; i++) {
			min = Math.min(min, points[i][axis]);
			max = Math.max(max, points[i][axis]);
	    }

    	return max - min;
	}

	return PolygonColliderRenderer;
});
