define(["path-renderer", "draw"], function(PathRenderer, Draw) {
	var m = null;

	var ObstacleRenderer = PathRenderer.extend({
		init: function() {
			this._super();

			this.parentColliderPoints = null;
		},

		start: function() {
			this.skipCache = true;

			this.name = 'obstacle-renderer';
			this.parentColliderPoints = null;

			this._super();
		},
		
		drawPath: function(context, viewport) {
			m = this.parent.getMatrix();

			if (!this.parentColliderPoints)
				this.parentColliderPoints = this.parent.findComponents().firstWithProp('collider').Points;

			// Store current context
			context.save();
			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);     
			// Apply transformations for the current [viewport](@@viewport@@)
			viewport.transformContext(context);
			// Applying transformations of parent
			context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
			// Drawing code
			Draw.polygon(context, 0, 0, this.parentColliderPoints, null, "#FFFFFF", 2/this.parent.scaleX);
			// Restore original context
			context.restore();
		},

		rendererWidth: function() { 
			if (!this.parentColliderPoints)
				this.parentColliderPoints = this.parent.findComponents().firstWithProp('collider').Points;

			return getPolygonSize(this.parentColliderPoints, 'width');
		},
		
		rendererHeight: function() { 
			if (!this.parentColliderPoints)
				this.parentColliderPoints = this.parent.findComponents().firstWithProp('collider').Points;

			return getPolygonSize(this.parentColliderPoints, 'height');
		},

		rendererOffsetX: function() { 
			if (!this.parentColliderPoints)
				this.parentColliderPoints = this.parent.findComponents().firstWithProp('collider').Points;

			return getOffset(this.parentColliderPoints, 'x');
		},

		rendererOffsetY: function() { 
			if (!this.parentColliderPoints)
				this.parentColliderPoints = this.parent.findComponents().firstWithProp('collider').Points;

			return getOffset(this.parentColliderPoints, 'y');
		},

		debug_draw: function(context, viewport, draw, gb) {
			if (!gb.rendererDebug) return;

			context.save();
			context.beginPath();
			
			context.strokeStyle = this.debugColor;
			context.lineWidth = 1;

			m = this.parent.matrix;
			// Applying transformations of parent
			context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
			context.translate(-0.5, -0.5);

			// Top Left 
			drawLineAndPoint.call(this, context, this.rendererOffsetX(), this.rendererOffsetY(), 'moveTo');
			// Top Right
			drawLineAndPoint.call(this, context, this.rendererOffsetX() + this.rendererWidth(), this.rendererOffsetY(), 'lineTo');
			// Bottom Right
			drawLineAndPoint.call(this, context, this.rendererOffsetX() + this.rendererWidth(), this.rendererOffsetY() + this.rendererHeight(), 'lineTo');
			// Bottom Left
			drawLineAndPoint.call(this, context, this.rendererOffsetX(), this.rendererOffsetY() + this.rendererHeight(), 'lineTo');

			context.closePath();

			context.stroke();
			context.restore();
		}
	});

	var drawLineAndPoint = function(context, offsetX, offsetY, lineMethod) {
		context.save();
		context[lineMethod](Math.round(offsetX), Math.round(offsetY));
		context.restore();
	}

	var getOffset = function (points, axis) {
		var min = points[0][axis];

		for (var i=1; i < points.length; i++) {
			min = Math.min(min, points[i][axis]);
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