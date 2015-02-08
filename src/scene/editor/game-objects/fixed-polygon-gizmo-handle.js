define(["game-object", "gb", "vector-2D", "polik"], function(GameObject, Gb, Vector2D, Polik) {
	
	var matrix = null;
	var transform = {};

	var FixedPolygonGizmoHandle = GameObject.extend({		
		init: function() {
			this._super();

			this.pointIndex = null;
		},

		added: function() { 
			this._super();
			
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			adjustForRotation(
				this.parent, 
				parentCollider.Points[this.pointIndex].x, 
				parentCollider.Points[this.pointIndex].y,
				this,
				-1
			);

			var startX, startY;

  		this.on(this.MOUSE_DRAG_START, this, function(mouseData) {
    		startX = parentCollider.Points[this.pointIndex].x;
    		startY = parentCollider.Points[this.pointIndex].y;
      });

      this.on(this.MOUSE_DRAG, this, function(mouseData) {
      	adjustForRotation(
      		this.parent,
      		mouseData.go.x,
					mouseData.go.y,
					parentCollider.Points[this.pointIndex],
					1
      	);
      });

      this.on(this.MOUSE_DRAG_END, this, function(mouseData) {
      	var convertedPoints = Polik.convertCoordinates(parentCollider.Points);

      	if (!Polik.IsConvex(convertedPoints) || !Polik.IsSimple(convertedPoints)) {
      		parentCollider.Points[this.pointIndex].x = startX;
 	   			parentCollider.Points[this.pointIndex].y = startY;

 	   			this.x = startX;
 	   			this.y = startY;

 	   			Gb.game.get_extension(require('logger')).error("Collider polygon is not valid");
      	}
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
