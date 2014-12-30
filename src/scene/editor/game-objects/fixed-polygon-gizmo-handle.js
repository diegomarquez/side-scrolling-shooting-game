define(["game-object", "gb", "vector-2D"], function(GameObject, Gb, Vector2D) {
	
	var matrix = null;
	var transform = {};

	var FixedPolygonGizmoHandle = GameObject.extend({		
		init: function() {
			this._super();

			this.pointIndex = null;
		},

		added: function() { 
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			adjustForRotation(
				this.parent, 
				parentCollider.Points[this.pointIndex].x, 
				parentCollider.Points[this.pointIndex].y,
				this,
				-1
			);

      this.on(this.MOUSE_DRAG, this, function(mouseData) {
      	adjustForRotation(
      		this.parent,
      		mouseData.go.x,
					mouseData.go.y,
					parentCollider.Points[this.pointIndex],
					1
      	);
      });

      parentCollider.on(parentCollider.CHANGE_POINTS, this, function(points) {
      	this.x = points[this.pointIndex].x;
   			this.y = points[this.pointIndex].y;
			});
		},

		start: function() {
			this._super();

			this.Dragable = true;
		}
	});

	var adjustForRotation = function(go, x, y, r, sign) {
		matrix = go.getMatrix(matrix);

		var rotation = (matrix.decompose(transform).rotation * sign) * (Math.PI / 180);
		var cosAngle = Math.cos(rotation);
		var sinAngle = Math.sin(rotation);

		r.x = (x * cosAngle) - (y * sinAngle);
		r.y = (x * sinAngle) + (y * cosAngle);
	}

	return FixedPolygonGizmoHandle;
});