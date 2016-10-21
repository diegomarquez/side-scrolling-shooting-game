define(["component", "gb", "collision-resolver", "editor-gizmos"], function(Component, Gb, CollisionResolver, EditorGizmos) {
	var ColliderGizmo = Component.extend({
		init: function() {
			this._super();

			this.gizmoComponents = null;
		},

		start: function() {
			this.gizmoComponents = [];

			var parentCollider = this.getColliderComponent();
			var go = this.parent;

			// Add the components to edit a circle collider
			if (parentCollider.colliderType == CollisionResolver.circleCollider) {
				this.gizmoComponents = this.gizmoComponents.concat(EditorGizmos.addCircleColliderGizmo(go));
			}

			// Add the components to edit a polygon collider
			if (parentCollider.colliderType == CollisionResolver.polygonCollider) {
				this.gizmoComponents = this.gizmoComponents.concat(EditorGizmos.addPolygonColliderGizmo(go));
			}

			// Add the components to edit a fixed polygon collider
			if (parentCollider.colliderType == CollisionResolver.fixedPolygonCollider) {
				this.gizmoComponents = this.gizmoComponents.concat(EditorGizmos.addFixedPolygonColliderGizmo(go));
			}

			// When ever the parent game object is added to a new viewport 
			// add the things the component created to the required viewports 
			go.on(go.ADD_TO_VIEWPORT, this, function(v) { 
				EditorGizmos.addGizmosToViewports(go, this.gizmoComponents, v);
			}, false, false, false, 'collider-gizmo');

			// When ever the parent game object is removed from a new viewport 
			// remove the things the component created from the required viewports 
			go.on(go.REMOVE_FROM_VIEWPORT, this, function(v) { 
				EditorGizmos.removeGizmosFromViewports(go, this.gizmoComponents, v);
			}, false, false, false, 'collider-gizmo');
		},

		applyChanges: function(changes) {
			var parentCollider = this.getColliderComponent();

			if (parentCollider.colliderType == CollisionResolver.circleCollider) { parentCollider.Radius = changes; }
			if (parentCollider.colliderType == CollisionResolver.polygonCollider) { parentCollider.Points = changes; }
			if (parentCollider.colliderType == CollisionResolver.fixedPolygonCollider) { parentCollider.Points = changes; }
		},

		getChanges: function() {
			var parentCollider = this.getColliderComponent();

			if (parentCollider.colliderType == CollisionResolver.circleCollider) { return parentCollider.Radius; }
			if (parentCollider.colliderType == CollisionResolver.polygonCollider) { return parentCollider.Points; }
			if (parentCollider.colliderType == CollisionResolver.fixedPolygonCollider) { return parentCollider.Points; }
		},

		getColliderComponent: function() {
			return this.parent.findComponents().firstWithProp('collider');
		},
		
		recycle: function (parent) {
			parent.levelCleanUp('collider-gizmo');

			while(this.gizmoComponents.length) { 
				Gb.reclaimer.claim(this.gizmoComponents.pop()); 
			}

			this.gizmoComponents = null;
		}
	});

	return ColliderGizmo;
});
