define(["path-renderer", "draw"], function(PathRenderer, Draw) {
	var m = null;

	var ObstacleRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.skipCache = true;

			this.name = 'obstacle-renderer';

			this._super();
		},
		
		drawPath: function(context, viewport) {
			m = this.parent.matrix;

			// Store current context
			context.save();
			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);			
			// Apply transformations for the current [viewport](@@viewport@@)
			viewport.transformContext(context);
			// Applying transformations of parent
			context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
			// Drawing code
			Draw.polygon(context, 0, 0, this.parent.findComponents().firstWithProp('collider').Points, null, "#FFFFFF", 2);
			// Restore original context
			context.restore();
		},

		rendererWidth: function() { 
			return getPolygonSize(this.parent.findComponents().firstWithProp('collider').Points, 'width') * this.scaleX;
		},
		
		rendererHeight: function() { 
			return getPolygonSize(this.parent.findComponents().firstWithProp('collider').Points, 'height') * this.scaleY;
		},

		rendererOffsetX: function() { 
			return getOffset(this.parent.findComponents().firstWithProp('collider').Points, 'x') * this.scaleX;
		},

		rendererOffsetY: function() { 
			return getOffset(this.parent.findComponents().firstWithProp('collider').Points, 'y') * this.scaleY;
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
		d = this.parent.matrix.decompose(d);

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

	return ObstacleRenderer;
});