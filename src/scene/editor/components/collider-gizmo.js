define(["component", "gb", "collision-resolver", "editor-gizmos"], function(Component, Gb, CollisionResolver, EditorGizmos) {
	var ColliderGizmo = Component.extend({
		init: function() {
			this._super();

			this.gizmoComponents = null;
		},

		start: function() {
			this.gizmoComponents = [];

			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			// Add the components to edit a circle collider
			if (parentCollider.colliderType == CollisionResolver.circleCollider) {
				this.gizmoComponents = this.gizmoComponents.concat(EditorGizmos.addCircleColliderGizmo(this.parent));
			}

			// Add the components to edit a polygon collider
			if (parentCollider.colliderType == CollisionResolver.polygonCollider) {
				this.gizmoComponents = this.gizmoComponents.concat(EditorGizmos.addPolygonColliderGizmo(this.parent));
			}

			// Add the components to edit a fixed polygon collider
			if (parentCollider.colliderType == CollisionResolver.fixedPolygonCollider) {	
				this.gizmoComponents = this.gizmoComponents.concat(EditorGizmos.addFixedPolygonColliderGizmo(this.parent));
			}
		},

		applyChanges: function(changes) {
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			if (parentCollider.colliderType == CollisionResolver.circleCollider) { parentCollider.Radius = changes; }
			if (parentCollider.colliderType == CollisionResolver.polygonCollider) { parentCollider.Points = changes; }
			if (parentCollider.colliderType == CollisionResolver.fixedPolygonCollider) { parentCollider.Points = changes; }
		},

		getChanges: function() {
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			if (parentCollider.colliderType == CollisionResolver.circleCollider) { return parentCollider.Radius; }
			if (parentCollider.colliderType == CollisionResolver.polygonCollider) { return parentCollider.Points; }
			if (parentCollider.colliderType == CollisionResolver.fixedPolygonCollider) { return parentCollider.Points; }
		},
		
		recycle: function() {
			while(this.gizmoComponents.length) { Gb.reclaimer.claim(this.gizmoComponents.pop()); }

			this.gizmoComponents = null;
		}
	});

	return ColliderGizmo;
});
