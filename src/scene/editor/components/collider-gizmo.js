define(["component", "gb", "collision-resolver", "editor-handles"], function(Component, Gb, CollisionResolver, EditorHandles) {
	var ColliderGizmo = Component.extend({
		init: function() {
			this._super();

			this.handles = null;
		},

		start: function() {
			this.handles = [];

			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			if (parentCollider.colliderType == CollisionResolver.circleCollider) {
				// Add one handle for circle collider editing
				this.handles.push(EditorHandles.addCircleHandle(this.parent));
			}

			if (parentCollider.colliderType == CollisionResolver.polygonCollider) {
				// Add as many handles as vertexes for polygon colliders
				this.handles = this.handles.concat(EditorHandles.addPolygonHandle(this.parent));
			}

			if (parentCollider.colliderType == CollisionResolver.fixedPolygonCollider) {
				// Add as many handles as vertexes for polygon colliders
				this.handles = this.handles.concat(EditorHandles.addFixedPolygonHandle(this.parent));
			}
		},

		applyChanges: function(changes) {
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			if (parentCollider.colliderType == CollisionResolver.circleCollider) {
				parentCollider.Radius = changes;
			}

			if (parentCollider.colliderType == CollisionResolver.polygonCollider) {
				parentCollider.Points = changes;
			}

			if (parentCollider.colliderType == CollisionResolver.fixedPolygonCollider) {
				parentCollider.Points = changes;
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

			if (parentCollider.colliderType == CollisionResolver.fixedPolygonCollider) {
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
