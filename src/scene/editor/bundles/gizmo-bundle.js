define(function(require) {	
	var gb = require('gb');

	var gameObject = require('game-object');
	var colliderGizmo = require('collider-gizmo');
	var circleGizmoHandle = require("circle-gizmo-handle");
	var polygonGizmoHandle = require("polygon-gizmo-handle");
	var fixedPolygonGizmoHandle = require("fixed-polygon-gizmo-handle");
	
	var gizmoHandleRenderer = require("gizmo-handle-renderer");
	var circleColliderRenderer = require('circle-collider-renderer');
	var polygonColliderRenderer = require('polygon-collider-renderer');
	var fixedPolygonColliderRenderer = require('fixed-polygon-collider-renderer');

	var Gizmo = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("collider-gizmo", colliderGizmo);
			this.componentPool.createPool("gizmo-handle-renderer", gizmoHandleRenderer);
			this.componentPool.createPool("circle-collider-renderer", circleColliderRenderer);
			this.componentPool.createPool("polygon-collider-renderer", polygonColliderRenderer);
			this.componentPool.createPool("fixed-polygon-collider-renderer", fixedPolygonColliderRenderer);
			
			this.componentPool.createConfiguration("ColliderGizmo", "collider-gizmo");
			this.componentPool.createConfiguration("GizmoHandleRenderer", "gizmo-handle-renderer");
			this.componentPool.createConfiguration("CircleGizmoDisplayRenderer", "circle-collider-renderer");
			this.componentPool.createConfiguration("PolygonGizmoDisplayRenderer", "polygon-collider-renderer");
			this.componentPool.createConfiguration("FixedPolygonGizmoDisplayRenderer", "fixed-polygon-collider-renderer");

			this.gameObjectPool.createDynamicPool("CircleGizmoHandle", circleGizmoHandle);
			this.gameObjectPool.createDynamicPool("PolygonGizmoHandle", polygonGizmoHandle);
			this.gameObjectPool.createDynamicPool("FixedPolygonGizmoHandle", fixedPolygonGizmoHandle);
			this.gameObjectPool.createDynamicPool("ColliderGizmoDisplay", gameObject);

			this.gameObjectPool.createConfiguration(this.getCircleHandleId(), "CircleGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getPolygonHandleId(), "PolygonGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getFixedPolygonHandleId(), "FixedPolygonGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getCircleDisplayId(), "ColliderGizmoDisplay")
				.args( { skipDebug: true } )
				.setRenderer('CircleGizmoDisplayRenderer');

			this.gameObjectPool.createConfiguration(this.getPolygonDisplayId(), "ColliderGizmoDisplay")
				.args( { skipDebug: true } )
				.setRenderer('PolygonGizmoDisplayRenderer');

			this.gameObjectPool.createConfiguration(this.getFixedPolygonDisplayId(), "ColliderGizmoDisplay")
				.args( { skipDebug: true } )
				.setRenderer('FixedPolygonGizmoDisplayRenderer');
		},

		getCircleHandleId: function () {
			return "CircleHandle";
		},

		getPolygonHandleId: function () {
			return "PolygonHandle";
		},

		getFixedPolygonHandleId: function () {
			return "FixedPolygonHandle";
		},

		getColliderGizmoId: function () {
			return "ColliderGizmo";
		},

		getCircleDisplayId: function () {
			return "CircleColliderDisplay";
		},

		getPolygonDisplayId: function () {
			return "PolygonColliderDisplay";
		},

		getFixedPolygonDisplayId: function () {
			return "FixedPolygonColliderDisplay";
		},
	});

	return new Gizmo();
});