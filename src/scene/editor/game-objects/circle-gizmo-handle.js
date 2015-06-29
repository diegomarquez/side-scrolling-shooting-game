define(["fixed-gizmo-handle", "gb", "vector-2D"], function(GizmoHandle, Gb, Vector2D) {
	
	var center = new Vector2D();
	var handle = new Vector2D();

	var CircleGizmoHandle = GizmoHandle.extend({		
		init: function() {
			this._super();
		},

		added: function() { 
			this._super();

			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			this.x = parentCollider.collider.r;
			this.y = 0;

			this.on(this.MOUSE_DRAG, this, function(mouseData) {
				center.x = 0;
				center.y = 0;

				handle.x = mouseData.go.x;
				handle.y = mouseData.go.y;

				parentCollider.collider.r = center.distance(handle);
			});

			parentCollider.on(parentCollider.CHANGE_RADIUS, this, function(radius) {
				this.x = radius;
				this.y = 0;
			});
		},

		start: function() {
			this._super();

			this.Dragable = true;
		}
	});

	return CircleGizmoHandle;
});
