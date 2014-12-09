define(["component", "gb", "collision-resolver"], function(Component, Gb, CollisionResolver) {
	var ColliderGizmo = Component.extend({
		// Called after the start method of the parent is called
		start: function() {
			this._super();

			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			if (parentCollider.colliderType == CollisionResolver.circleCollider) {
				// Add one handle for circle collider editing
				Gb.addChildTo(this.parent, 'CircleHandle', null, 'create');
			}

			if (parentCollider.colliderType == CollisionResolver.polygonCollider) {
				// Add as many handles as vertexes for polygon colliders		
				for (var i = 0; i < parentCollider.Points.length; i++) {
					Gb.addChildTo(this.parent, 'PolygonHandle', { pointIndex: i }, 'create');
				}
			}
		},
		
		// Called before the component is sent back to its pool for reuse
		destroy: function() {
			this._super();
		},
	});

	return ColliderGizmo;
});
