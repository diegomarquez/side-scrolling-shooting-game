define(["component", "gb", "collision-resolver"], function(Component, Gb, CollisionResolver) {
	var ColliderGizmo = Component.extend({
		init: function() {
			this._super();

			this.handles = null;
		},

		start: function() {
			this.handles = [];

			var parentCollider = this.parent.findComponents().firstWithProp('collider');
			var handle;

			if (parentCollider.colliderType == CollisionResolver.circleCollider) {
				// Add one handle for circle collider editing
				handle = Gb.addChildTo(this.parent, 'CircleHandle', [{ viewport:'Gizmo', layer:'Front' }], null, 'create');

				this.handles.push(handle);
			}

			if (parentCollider.colliderType == CollisionResolver.polygonCollider) {
				// Add as many handles as vertexes for polygon colliders		
				for (var i = 0; i < parentCollider.Points.length; i++) {
					handle = Gb.addChildTo(this.parent, 'PolygonHandle', [{ viewport:'Gizmo', layer:'Front' }], { pointIndex: i }, 'create');

					this.handles.push(handle);
				}
			}
		},

		getChanges: function() {
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			if (parentCollider.colliderType == CollisionResolver.circleCollider) {
				return parentCollider.Radius;
			}

			if (parentCollider.colliderType == CollisionResolver.polygonCollider) {
				return parentCollider.Points;
			}
		},
		
		recycle: function() {
			while(this.handles.length) {
				Gb.reclaimer.claim(this.handles.pop());	
			}

			this.handles = null;
		}
	});

	return ColliderGizmo;
});
