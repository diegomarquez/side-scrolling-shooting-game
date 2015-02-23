define(["component", "gb", "editor-gizmos"], function(Component, Gb, EditorGizmos) {
	var RotationGizmo = Component.extend({
		init: function() {
			this._super();

			this.gizmoComponents = null;
		},

		start: function() {
			this.gizmoComponents = [];

			var renderer = this.parent.renderer;
			var go = this.parent;

			if (renderer) {
				this.gizmoComponents = this.gizmoComponents.concat(EditorGizmos.addRotationGizmo(go));

				go.on(go.ADD_TO_VIEWPORT, this, function(v) { 
					EditorGizmos.addGizmosToViewports(go, this.gizmoComponents, v);
				});

				go.on(go.REMOVE_FROM_VIEWPORT, this, function(v) { 
					EditorGizmos.removeGizmosFromViewports(go, this.gizmoComponents, v);
				});
			}
		},

		recycle: function() {
			while(this.gizmoComponents.length) { 
				Gb.reclaimer.claim(this.gizmoComponents.pop()); 
			}

			this.gizmoComponents = null;
		}
	});

	return RotationGizmo;
});
