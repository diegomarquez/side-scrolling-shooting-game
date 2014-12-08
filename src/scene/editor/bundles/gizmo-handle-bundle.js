define(function(require) {	
	var gb = require('gb');
	var editorConfig = require('editor-config');

	var colliderGizmo = require('collider-gizmo');
	var gizmoHandle = require("gizmo-handle");
	var gizmoHandleRenderer = require("gizmo-handle-renderer");

	var GizmoHandle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("collider-gizmo", colliderGizmo);
			this.componentPool.createPool("gizmo-handle-renderer", gizmoHandleRenderer);
			
			this.componentPool.createConfiguration("ColliderGizmo", "collider-gizmo");
			this.componentPool.createConfiguration("GizmoHandleRenderer", "gizmo-handle-renderer");

			this.gameObjectPool.createDynamicPool("GizmoHandle", gizmoHandle);
			
			this.gameObjectPool.createConfiguration("Handle", "GizmoHandle")
				.args( { skipDebug: false } )
				.setRenderer('GizmoHandleRenderer');
		}
	});

	return new GizmoHandle();
});