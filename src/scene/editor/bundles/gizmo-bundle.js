define(function(require) {	
	var gb = require('gb');
	var commonBundle = require('common-bundle');

	var Gizmo = require("bundle").extend({
		create: function(args) {	
			// Handles
			this.componentPool.createPool("gizmo-handle-renderer", require("gizmo-handle-renderer"));
			this.componentPool.createConfiguration("GizmoHandleRenderer", "gizmo-handle-renderer");

			// Colliders
			this.componentPool.createPool("collider-gizmo", require('collider-gizmo'));
			this.componentPool.createPool("circle-collider-renderer", require('circle-collider-renderer'));
			this.componentPool.createPool("polygon-collider-renderer", require('polygon-collider-renderer'));
			this.componentPool.createPool("fixed-polygon-collider-renderer", require('fixed-polygon-collider-renderer'));
			
			this.componentPool.createConfiguration(this.getColliderGizmoId(), "collider-gizmo");
			this.componentPool.createConfiguration("CircleGizmoDisplayRenderer", "circle-collider-renderer");
			this.componentPool.createConfiguration("PolygonGizmoDisplayRenderer", "polygon-collider-renderer");
			this.componentPool.createConfiguration("FixedPolygonGizmoDisplayRenderer", "fixed-polygon-collider-renderer");

			// Icons
			this.componentPool.createPool("icon-gizmo", require('icon-gizmo'));
			this.componentPool.createConfiguration(this.getIconGizmoId(), "icon-gizmo");
			this.componentPool.createConfiguration("ScrollStopperGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['FLAG.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("BossWarningGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['WARNING.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("RightDirectionGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['RIGHTARROW.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("LeftDirectionGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['LEFTARROW.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("UpDirectionGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['UPARROW.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("DownDirectionGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['DOWNARROW.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("FastRightDirectionGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['FASTRIGHTARROW.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("FastLeftDirectionGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['FASTLEFTARROW.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("FastUpDirectionGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['FASTUPARROW.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("FastDownDirectionGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['FASTDOWNARROW.PNG'],
				offset:'center'
			});

			this.componentPool.createConfiguration("StartPositionGizmoRenderer", commonBundle.getBitmapRendererPoolId()).args({
				path: gb.assetMap()['CHECKEREDFLAG.PNG'],
				offset:'center'
			});

			// Rotation
			this.componentPool.createPool("rotation-gizmo", require('rotation-gizmo'));
			this.componentPool.createPool("rotation-display-renderer", require('rotation-display-renderer'));
			
			this.componentPool.createConfiguration(this.getRotationGizmoId(), "rotation-gizmo");
			this.componentPool.createConfiguration("RotationDisplayRenderer", "rotation-display-renderer");

			// Scale
			this.componentPool.createPool("scale-gizmo", require('scale-gizmo'));
			this.componentPool.createPool("scale-display-renderer", require('scale-display-renderer'));
			
			this.componentPool.createConfiguration(this.getScaleGizmoId(), "scale-gizmo");
			this.componentPool.createConfiguration("ScaleDisplayRenderer", "scale-display-renderer");

			// Handle Game Objects pools
			this.gameObjectPool.createDynamicPool("CircleGizmoHandle", require("circle-gizmo-handle"));
			this.gameObjectPool.createDynamicPool("PolygonGizmoHandle", require("polygon-gizmo-handle"));
			this.gameObjectPool.createDynamicPool("FixedPolygonGizmoHandle", require("fixed-polygon-gizmo-handle"));
			this.gameObjectPool.createDynamicPool("IconGizmoHandle", require('icon-gizmo-handle'));
			this.gameObjectPool.createDynamicPool("RotationGizmoHandle", require('rotation-gizmo-handle'));
			this.gameObjectPool.createDynamicPool("ScaleGizmoHandle", require('scale-gizmo-handle'));
			
			// Icon Configurations
			this.gameObjectPool.createConfiguration("ScrollStopperGizmo", "IconGizmoHandle")
				.setRenderer('ScrollStopperGizmoRenderer');

			this.gameObjectPool.createConfiguration("BossWarningGizmo", "IconGizmoHandle")
				.setRenderer('BossWarningGizmoRenderer');

			this.gameObjectPool.createConfiguration("RightDirectionGizmo", "IconGizmoHandle")
				.setRenderer('RightDirectionGizmoRenderer');

			this.gameObjectPool.createConfiguration("LeftDirectionGizmo", "IconGizmoHandle")
				.setRenderer('LeftDirectionGizmoRenderer');

			this.gameObjectPool.createConfiguration("UpDirectionGizmo", "IconGizmoHandle")
				.setRenderer('UpDirectionGizmoRenderer');

			this.gameObjectPool.createConfiguration("DownDirectionGizmo", "IconGizmoHandle")
				.setRenderer('DownDirectionGizmoRenderer');

			this.gameObjectPool.createConfiguration("FastRightDirectionGizmo", "IconGizmoHandle")
				.setRenderer('FastRightDirectionGizmoRenderer');

			this.gameObjectPool.createConfiguration("FastLeftDirectionGizmo", "IconGizmoHandle")
				.setRenderer('FastLeftDirectionGizmoRenderer');

			this.gameObjectPool.createConfiguration("FastUpDirectionGizmo", "IconGizmoHandle")
				.setRenderer('FastUpDirectionGizmoRenderer');

			this.gameObjectPool.createConfiguration("FastDownDirectionGizmo", "IconGizmoHandle")
				.setRenderer('FastDownDirectionGizmoRenderer');

			this.gameObjectPool.createConfiguration("StartPositionGizmo", "IconGizmoHandle")
				.setRenderer('StartPositionGizmoRenderer');

			// Handle configurations
			this.gameObjectPool.createConfiguration(this.getCircleHandleId(), "CircleGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getPolygonHandleId(), "PolygonGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getFixedPolygonHandleId(), "FixedPolygonGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getRotationHandleId(), "RotationGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			this.gameObjectPool.createConfiguration(this.getScaleHandleId(), "ScaleGizmoHandle")
				.args( { skipDebug: true } )
				.setRenderer('GizmoHandleRenderer');

			// Gizmo display configurations
			this.gameObjectPool.createConfiguration(this.getCircleDisplayId(), commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('CircleGizmoDisplayRenderer');

			this.gameObjectPool.createConfiguration(this.getPolygonDisplayId(), commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('PolygonGizmoDisplayRenderer');

			this.gameObjectPool.createConfiguration(this.getFixedPolygonDisplayId(), commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('FixedPolygonGizmoDisplayRenderer');

			this.gameObjectPool.createConfiguration(this.getRotationDisplayId(), commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('RotationDisplayRenderer');

			this.gameObjectPool.createConfiguration(this.getScaleDisplayId(), commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('ScaleDisplayRenderer');
		},

		getColliderGizmoId: function () { return "ColliderGizmo"; },
		getIconGizmoId: function () { return "IconGizmo"; },
		getRotationGizmoId: function () { return "RotationGizmo"; },
		getScaleGizmoId: function () { return "ScaleGizmo"; },

		getCircleHandleId: function () { return "CircleHandle"; },
		getPolygonHandleId: function () { return "PolygonHandle"; },
		getFixedPolygonHandleId: function () { return "FixedPolygonHandle"; },
		getRotationHandleId: function () { return "RotationHandle"; },
		getScaleHandleId: function () { return "ScaleHandle"; },
		
		getCircleDisplayId: function () { return "CircleColliderDisplay"; },
		getPolygonDisplayId: function () { return "PolygonColliderDisplay"; },
		getFixedPolygonDisplayId: function () { return "FixedPolygonColliderDisplay"; },
		getRotationDisplayId: function () { return "RotationDisplay"; },
		getScaleDisplayId: function () { return "ScaleDisplay"; },

		getScrollStopperId: function () { return "ScrollStopperGizmo"; },
		getBossWarningId: function () { return "BossWarningGizmo"; },
		
		getRightDirectionId: function () { return "RightDirectionGizmo"; },
		getLeftDirectionId: function () { return "LeftDirectionGizmo"; },
		getUpDirectionId: function () { return "UpDirectionGizmo"; },
		getDownDirectionId: function () { return "DownDirectionGizmo"; },
		getFastRightDirectionId: function () { return "FastRightDirectionGizmo"; },
		getFastLeftDirectionId: function () { return "FastLeftDirectionGizmo"; },
		getFastUpDirectionId: function () { return "FastUpDirectionGizmo"; },
		getFastDownDirectionId: function () { return "FastDownDirectionGizmo"; },
		getStartPositionId: function () { return "StartPositionGizmo"; }
		
	});

	return new Gizmo();
});