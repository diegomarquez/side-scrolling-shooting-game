define(function(require) {	
	var gb = require('gb');
	var editorConfig = require('editor-config');

	var colliderGizmo = require('collider-gizmo');
	var circleGizmoHandle = require("circle-gizmo-handle");
	var polygonGizmoHandle = require("polygon-gizmo-handle");
	var gizmoHandleRenderer = require("gizmo-handle-renderer");

	var GizmoHandle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("collider-gizmo", colliderGizmo);
			this.componentPool.createPool("gizmo-handle-renderer", gizmoHandleRenderer);
			
			this.componentPool.createConfiguration("ColliderGizmo", "collider-gizmo");
			this.componentPool.createConfiguration("GizmoHandleRenderer", "gizmo-handle-renderer");

			this.gameObjectPool.createDynamicPool("CircleGizmoHandle", circleGizmoHandle);
			this.gameObjectPool.createDynamicPool("PolygonGizmoHandle", polygonGizmoHandle);
			
			this.gameObjectPool.createConfiguration("CircleHandle", "CircleGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration("PolygonHandle", "PolygonGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');
		}
	});

	return new GizmoHandle();
});