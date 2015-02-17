define(function(require) {	
	var gb = require('gb');
	var commonBundle = require('common-bundle');

	var colliderGizmo = require('collider-gizmo');
	var circleGizmoHandle = require("circle-gizmo-handle");
	var polygonGizmoHandle = require("polygon-gizmo-handle");
	var fixedPolygonGizmoHandle = require("fixed-polygon-gizmo-handle");
	var gizmoHandleRenderer = require("gizmo-handle-renderer");
	var circleColliderRenderer = require('circle-collider-renderer');
	var polygonColliderRenderer = require('polygon-collider-renderer');
	var fixedPolygonColliderRenderer = require('fixed-polygon-collider-renderer');

	var iconGizmo = require('icon-gizmo');
	var iconGizmoHandle = require('icon-gizmo-handle');

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

			this.componentPool.createPool("icon-gizmo", iconGizmo);
			this.componentPool.createConfiguration("IconGizmo", "icon-gizmo");
			this.componentPool.createConfiguration("ScrollStopperGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['FLAG.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("BossWarningGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['WARNING.PNG'],
				offset:'center'
			});

			this.gameObjectPool.createDynamicPool("CircleGizmoHandle", circleGizmoHandle);
			this.gameObjectPool.createDynamicPool("PolygonGizmoHandle", polygonGizmoHandle);
			this.gameObjectPool.createDynamicPool("FixedPolygonGizmoHandle", fixedPolygonGizmoHandle);
			this.gameObjectPool.createDynamicPool("IconGizmoHandle", iconGizmoHandle);
			
			this.gameObjectPool.createConfiguration("ScrollStopperGizmo", "IconGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('ScrollStopperGizmoRenderer');

			this.gameObjectPool.createConfiguration("BossWarningGizmo", "IconGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('BossWarningGizmoRenderer');

			this.gameObjectPool.createConfiguration(this.getCircleHandleId(), "CircleGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getPolygonHandleId(), "PolygonGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getFixedPolygonHandleId(), "FixedPolygonGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getCircleDisplayId(), commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('CircleGizmoDisplayRenderer');

			this.gameObjectPool.createConfiguration(this.getPolygonDisplayId(), commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('PolygonGizmoDisplayRenderer');

			this.gameObjectPool.createConfiguration(this.getFixedPolygonDisplayId(), commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('FixedPolygonGizmoDisplayRenderer');
		},

		getColliderGizmoId: function () { return "ColliderGizmo"; },
		getIconGizmoId: function () { return "IconGizmo"; },

		getCircleHandleId: function () { return "CircleHandle"; },
		getPolygonHandleId: function () { return "PolygonHandle"; },
		getFixedPolygonHandleId: function () { return "FixedPolygonHandle"; },
		
		getCircleDisplayId: function () { return "CircleColliderDisplay"; },
		getPolygonDisplayId: function () { return "PolygonColliderDisplay"; },
		getFixedPolygonDisplayId: function () { return "FixedPolygonColliderDisplay"; },

		getScrollStopperId: function () { return "ScrollStopperGizmo"; },
		getBossWarningId: function () { return "BossWarningGizmo"; },
	});

	return new Gizmo();
});