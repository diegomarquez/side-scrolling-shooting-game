define(function (require) {
	
	var matrix = null;
	var transform = {};
	var stepX = null;
	var stepY = null;
	var startOffsetX = null;
	var startOffsetY = null;

	var FixedPolygonGizmoHandle = require("game-object").extend({		
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
  			stepX = require("editor-config").getGridCellSize().width;
				stepY = require("editor-config").getGridCellSize().height;

  			if (require("snap-to-grid-value").get()) {
	    		r = this.parent.getTransform(r, m);

	        startOffsetX = (r.x - (r.x % stepX)) - r.x;
	        startOffsetY = (r.y - (r.y % stepY)) - r.y;
	      }

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

      	if (require("snap-to-grid-value").get()) {
       		mouseData.go.x = startOffsetX + (stepX * Math.round(((startOffsetX + mouseData.go.X) / stepX) + 0.5));
       		mouseData.go.y = startOffsetY + (stepY * Math.round(((startOffsetY + mouseData.go.Y) / stepY) + 0.5));
       	}
      });

      this.on(this.MOUSE_DRAG_END, this, function(mouseData) {
      	var polik = require("polik");

      	var convertedPoints = polik.convertCoordinates(parentCollider.Points);

      	if (!polik.IsConvex(convertedPoints) || !polik.IsSimple(convertedPoints)) {
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
