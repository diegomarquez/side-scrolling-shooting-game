define(function(require) {
	var gb = require('gb');
	var util = require('util');
  
	var EditorGizmos = require('class').extend({
		init: function() {
	    	this.gizmoOptions = util.cache(function() {
	  			var editorConfig = require('editor-config');
	  			var gizmoBundle = require('gizmo-bundle');
	  			
	  			var getViewports = function(viewports, layer) {
	  				var result = [];

						for (var i = 0; i < viewports.length; i++) {
						 	var v = viewports[i];
						 	result.push({ viewport: v.viewport, layer: layer });
						}

						return result;
	  			}

	  			return {
	  				viewports: {
	  					icons: function(viewports) { return getViewports(viewports, editorConfig.getGizmoIconFrontLayerName()); },
	  					
	  					colliderDisplayers: function(viewports) { return getViewports(viewports, editorConfig.getGizmoCollidersBackLayerName()); },
	  					colliderHandles: function(viewports) { return getViewports(viewports, editorConfig.getGizmoCollidersFrontLayerName()); },
	  					
	  					rotationDisplayers: function(viewports) { return getViewports(viewports, editorConfig.getGizmoRotationBackLayerName()); },
	  					rotationHandles: function(viewports) { return getViewports(viewports, editorConfig.getGizmoRotationFrontLayerName()); },

	  					scaleDisplayers: function(viewports) { return getViewports(viewports, editorConfig.getGizmoScaleBackLayerName()); },
	  					scaleHandles: function(viewports) { return getViewports(viewports, editorConfig.getGizmoScaleFrontLayerName()); }
	  				},

	  				getIconId: function(parent) {

	  					if (parent.typeId == 'scroll-stopper') { 
	  						return gizmoBundle.getScrollStopperId(); 
	  					}
	  					
	  					if (parent.typeId == 'boss-warning') { 
	  						return gizmoBundle.getBossWarningId(); 
	  					}

	  					if (parent.typeId == 'direction-right') { 
	  						return gizmoBundle.getRightDirectionId(); 
	  					}
	  					
	  					if (parent.typeId == 'direction-up') { 
	  						return gizmoBundle.getUpDirectionId(); 
	  					}
	  					
	  					if (parent.typeId == 'direction-left') { 
	  						return gizmoBundle.getLeftDirectionId(); 
	  					}
	  					
	  					if (parent.typeId == 'direction-down') { 
	  						return gizmoBundle.getDownDirectionId(); 
	  					}

	  					if (parent.typeId == 'fast-direction-right') { 
	  						return gizmoBundle.getFastRightDirectionId(); 
	  					}
	  					
	  					if (parent.typeId == 'fast-direction-up') { 
	  						return gizmoBundle.getFastUpDirectionId(); 
	  					}
	  					
	  					if (parent.typeId == 'fast-direction-left') { 
	  						return gizmoBundle.getFastLeftDirectionId(); 
	  					}
	  					
	  					if (parent.typeId == 'fast-direction-down') { 
	  						return gizmoBundle.getFastDownDirectionId(); 
	  					}

	  					if (parent.typeId == 'start-position-right') { 
	  						return gizmoBundle.getStartPositionRightId(); 
	  					}

	  					if (parent.typeId == 'start-position-left') { 
	  						return gizmoBundle.getStartPositionLeftId(); 
	  					}

	  					if (parent.typeId == 'start-position-up') { 
	  						return gizmoBundle.getStartPositionUpId(); 
	  					}

	  					if (parent.typeId == 'start-position-down') { 
	  						return gizmoBundle.getStartPositionDownId(); 
	  					}
	  				},

	  				ids: {
	  					colliderGizmo: gizmoBundle.getColliderGizmoId(),
	  					iconGizmo: gizmoBundle.getIconGizmoId(),
	  					rotationGizmo: gizmoBundle.getRotationGizmoId(),
	  					scaleGizmo: gizmoBundle.getScaleGizmoId(),

	  					circleHandle: gizmoBundle.getCircleHandleId(),
	  					circleDisplay: gizmoBundle.getCircleDisplayId(),
	  					
	  					polygonHandle: gizmoBundle.getPolygonHandleId(),
	  					polygonDisplay: gizmoBundle.getPolygonDisplayId(),
	  					
	  					fixedPolygonHandle: gizmoBundle.getFixedPolygonHandleId(),
	  					fixedPolygonDisplay: gizmoBundle.getFixedPolygonDisplayId(),
	  						  					
	  					rotationHandle: gizmoBundle.getRotationHandleId(),
	  					rotationDisplay: gizmoBundle.getRotationDisplayId(),

	  					scaleHandle: gizmoBundle.getScaleHandleId(),
	  					scaleDisplay: gizmoBundle.getScaleDisplayId()
	  				}
	  			}
	  		}, this);
	    },

	    addScaleGizmo: function(parent) {
	    	var options = this.gizmoOptions();
	    	var objects = [];

	    	var viewports = parent.getViewportList();

			var handle = gb.addChildTo(parent, options.ids.scaleHandle, options.viewports.scaleHandles(viewports), null, 'create');
			var display = gb.addChildTo(parent, options.ids.scaleDisplay, options.viewports.scaleDisplayers(viewports), null, 'create');

			handle.gizmoType = "ScaleHandle";
			display.gizmoType = "ScaleDisplay";
			
			handle.hide();
			display.hide();

			objects.push(handle);
			objects.push(display);

			return objects;
	    },

	    addIconGizmo: function(parent) {
	    	var objects = [];

	    	var options = this.gizmoOptions();
	    	var viewports = parent.getViewportList();

	    	var go = gb.addChildTo(parent, options.getIconId(parent), options.viewports.icons(viewports), null, 'create');
	    	go.gizmoType = "Icon";

	    	objects.push(go);
	    	
	    	return objects;
	    },

	    addRotationGizmo: function(parent) {
	    	var objects = [];

	    	var options = this.gizmoOptions();
	    	var viewports = parent.getViewportList();

	    	var handle = gb.addChildTo(parent, options.ids.rotationHandle, options.viewports.rotationHandles(viewports), null, 'create');
	    	var display = gb.addChildTo(parent, options.ids.rotationDisplay, options.viewports.rotationDisplayers(viewports), null, 'create'); 

	    	handle.gizmoType = "RotationHandle";
	    	display.gizmoType = "RotationDisplay"; 

	    	handle.hide();
	    	display.hide();

	    	objects.push(handle);
	    	objects.push(display);
	    	
	    	return objects;
	    },

	    addCircleColliderGizmo: function(parent) {
	    	var options = this.gizmoOptions();

	    	var parentCollider = parent.findComponents().firstWithProp('collider');
	    	var objects = [];

	    	var viewports = parent.getViewportList();

	    	var handle = gb.addChildTo(parent, options.ids.circleHandle, options.viewports.colliderHandles(viewports), null, 'create');
	    	var display = gb.addChildTo(parent, options.ids.circleDisplay, options.viewports.colliderDisplayers(viewports), { parentCollider: parentCollider }, 'create'); 

	    	handle.gizmoType = "ColliderHandle";
	    	display.gizmoType = "ColliderDisplay";

	    	handle.hide();
	    	display.hide();

	    	objects.push(handle);
	    	objects.push(display);
	    	
	    	return objects;  
	    },

	    addPolygonColliderGizmo: function(parent) {
	    	var options = this.gizmoOptions();

	    	var parentCollider = parent.findComponents().firstWithProp('collider');
	    	var objects = [];

	    	var viewports = parent.getViewportList();

	    	// Add a handle for each vertex of the polygon collider
	    	for (var i = 0; i < parentCollider.Points.length; i++) {
				var handle = gb.addChildTo(parent, options.ids.polygonHandle, options.viewports.colliderHandles(viewports), { pointIndex: i }, 'create');
				handle.gizmoType = "ColliderHandle";
				handle.hide();

				objects.push(handle);
			}

			// Add the polygon collider displayer
			var display = gb.addChildTo(parent, options.ids.polygonDisplay, options.viewports.colliderDisplayers(viewports), { parentCollider: parentCollider }, 'create');
			display.gizmoType = "ColliderDisplay";
			display.hide();

			objects.push(display);

			return objects;
	    },

	    addFixedPolygonColliderGizmo: function(parent) {
	    	var options = this.gizmoOptions();

	    	var parentCollider = parent.findComponents().firstWithProp('collider');
	    	var objects = [];

	    	var viewports = parent.getViewportList();

	    	// Add a handle for each vertex of the polygon collider
	    	for (var i = 0; i < parentCollider.Points.length; i++) {
				var handle = gb.addChildTo(parent, options.ids.fixedPolygonHandle, options.viewports.colliderHandles(viewports), { pointIndex: i }, 'create');
				handle.gizmoType = "ColliderHandle";
				handle.hide();

				objects.push(handle);
			}

			// Add the fixed polygon collider displayer
			var display = gb.addChildTo(parent, options.ids.fixedPolygonDisplay, options.viewports.colliderDisplayers(viewports), { parentCollider: parentCollider }, 'create'); 
			display.gizmoType = "ColliderDisplay";
			display.hide();

			objects.push(display);

			return objects;
	    },

		addGizmosToViewports: function(go, gizmoComponents, viewports) {
			var options = this.gizmoOptions();

			for (var i = 0; i < gizmoComponents.length; i++) {
				var go = gizmoComponents[i];

				if (go.gizmoType == "ColliderHandle") {
					gb.addToViewports(go, options.viewports.colliderHandles(viewports));
				}

				if (go.gizmoType == "ColliderDisplay") {
					gb.addToViewports(go, options.viewports.colliderDisplayers(viewports));
				}

				if (go.gizmoType == "RotationHandle") {
					gb.addToViewports(go, options.viewports.rotationHandles(viewports));
				}

				if (go.gizmoType == "RotationDisplay") {
					gb.addToViewports(go, options.viewports.rotationDisplayers(viewports));
				}

				if (go.gizmoType == "ScaleHandle") {
					gb.addToViewports(go, options.viewports.scaleHandles(viewports));
				}

				if (go.gizmoType == "ScaleDisplay") {
					gb.addToViewports(go, options.viewports.scaleDisplayers(viewports));
				}

				if (go.gizmoType == "Icon") {
					gb.addToViewports(go, options.viewports.icons(viewports));
				}
			}
		},

		removeGizmosFromViewports: function(go, gizmoComponents, viewports) {
			var options = this.gizmoOptions();
				
	    	for (var i = 0; i < gizmoComponents.length; i++) {
	    		var go = gizmoComponents[i];

	    		if (go.gizmoType == "ColliderHandle") {
	    			gb.removeFromViewports(go, options.viewports.colliderHandles(viewports));
	    		}

	    		if (go.gizmoType == "ColliderDisplay") {
	    			gb.removeFromViewports(go, options.viewports.colliderDisplayers(viewports));
	    		}

	    		if (go.gizmoType == "RotationHandle") {
	    			gb.removeFromViewports(go, options.viewports.rotationHandles(viewports));
	    		}

	    		if (go.gizmoType == "RotationDisplay") {
	    			gb.removeFromViewports(go, options.viewports.rotationDisplayers(viewports));
	    		}

	    		if (go.gizmoType == "ScaleHandle") {
					gb.removeFromViewports(go, options.viewports.scaleHandles(viewports));
				}

				if (go.gizmoType == "ScaleDisplay") {
					gb.removeFromViewports(go, options.viewports.scaleDisplayers(viewports));
				}

	    		if (go.gizmoType == "Icon") {
	    			gb.removeFromViewports(go, options.viewports.icons(viewports));
	    		}
	    	}
	    },

	    addGizmos: function(object) {
			var options = this.gizmoOptions();

			// Objects with out mouse support are skipped
			if (!gb.goPool.getConfigurationObject(object.typeId).hasMouseSupport()) {
				return;
			}

			// Editor only objects are skipped
			if (require('editor-config').isEditorGameObject(object.typeId)) {
				return;
			}

			// Non container objects are skipped
			if (!object.isContainer()) {
				return;
			}

			// Add the Collider Gizmo to the game object if it has a collider
			if (object.findComponents().firstWithProp('collider')) {
				gb.addComponentTo(object, options.ids.colliderGizmo);	
			}

			// Add the Icon Gizmo if the game object has no renderer
			if (!object.renderer) {
				gb.addComponentTo(object, options.ids.iconGizmo);	
			}

			// Add the Rotation Gizmo if the game object has a renderer
			if (object.renderer) {
				gb.addComponentTo(object, options.ids.rotationGizmo);	
			}

			// Add the Scale Gizmo if the game object has a renderer
			if (object.renderer) {
				gb.addComponentTo(object, options.ids.scaleGizmo);	
			}
		}

	});

	return new EditorGizmos();
});
