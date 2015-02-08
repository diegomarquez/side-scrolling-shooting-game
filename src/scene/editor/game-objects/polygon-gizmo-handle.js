define(["game-object", "gb", "vector-2D", "polik"], function(GameObject, Gb, Vector2D, Polik) {

	var PolygonGizmoHandle = GameObject.extend({		
		init: function() {
			this._super();

			this.pointIndex = null;
		},

		added: function() {
			this._super();
		 
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			this.x = parentCollider.Points[this.pointIndex].x;
   		this.y = parentCollider.Points[this.pointIndex].y;
   		
   		var startX, startY;

  		this.on(this.MOUSE_DRAG_START, this, function(mouseData) {
    		startX = parentCollider.Points[this.pointIndex].x;
    		startY = parentCollider.Points[this.pointIndex].y;
      });

      this.on(this.MOUSE_DRAG, this, function(mouseData) {
    		parentCollider.Points[this.pointIndex].x = mouseData.go.x;
    		parentCollider.Points[this.pointIndex].y = mouseData.go.y;
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

	return PolygonGizmoHandle;
});
