define(["path-renderer", "draw", "vector-2D"], function(PathRenderer, Draw, Vector2D) {
	var p = new Vector2D();

	var PolygonColliderRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.skipCache = true;

			this.name = 'fixed-polygon-collider-renderer';

			this._super();
		},
		
		drawPath: function(context, viewport) {
			// Store current context
			context.save();
			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);
			
			viewport.transformContext(context);
			
			console.log("FIXED POLYGON");
			
			// Get a position from the matrix of the parent game object
			p = this.parent.matrix.transformPoint(0, 0, p);

			// Drawing code
			context.translate(p.x, p.y);
			Draw.polygon(context, 0, 0, this.parent.parentCollider.Points, null, "#00FF00", 2);

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
		},

		debug_draw: function(context, viewport, draw, gb) {
			if (!gb.rendererDebug) return;

			context.save();
			context.beginPath();
			
			context.strokeStyle = this.debugColor;
			context.lineWidth = 1;

			// Top Left 
			drawLineAndPoint.call(this, context, this.rendererOffsetX(), this.rendererOffsetY(), draw, 'moveTo');
			// Top Right
			drawLineAndPoint.call(this, context, this.rendererOffsetX() + this.rendererWidth(), this.rendererOffsetY(), draw, 'lineTo');
			// Bottom Right
			drawLineAndPoint.call(this, context, this.rendererOffsetX() + this.rendererWidth(), this.rendererOffsetY() + this.rendererHeight(), draw, 'lineTo');
			// Bottom Left
			drawLineAndPoint.call(this, context, this.rendererOffsetX(), this.rendererOffsetY() + this.rendererHeight(), draw, 'lineTo');

			context.closePath();

			context.stroke();
			context.restore();
		}
	});

	var d = null;

	var drawLineAndPoint = function(context, offsetX, offsetY, draw, lineMethod) {
		d = this.parent.getMatrix().decompose(d);

		context.save();
		context.translate(d.x, d.y)
		context[lineMethod](offsetX, offsetY);
		context.restore();
	}

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


