define(["game-object", "gb", "vector-2D"], function(GameObject, Gb, Vector2D) {
	
	var center = new Vector2D();
	var handle = new Vector2D();

	var PolygonGizmoHandle = GameObject.extend({		
		init: function() {
			this._super();

			this.pointIndex = null;
		},

		added: function() { 
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			this.x = parentCollider.Points[this.pointIndex].x;
   		this.y = parentCollider.Points[this.pointIndex].y;

      this.on(this.MOUSE_DRAG, this, function(mouseData) {
    		parentCollider.Points[this.pointIndex].x = mouseData.go.x;
    		parentCollider.Points[this.pointIndex].y = mouseData.go.y;
      });
		},

		start: function() {
			this._super();

			this.Dragable = true;
		},

		destroy: function() {
			this._super();
		}
	});

	return PolygonGizmoHandle;
});
