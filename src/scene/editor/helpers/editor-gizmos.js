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
  					icons: function(viewports) { return getViewports(viewports, editorConfig.getGizmoBackLayerName()); },
  					colliderDisplayers: function(viewports) { return getViewports(viewports, editorConfig.getGizmoMiddleLayerName()); },
  					colliderHandles: function(viewports) { return getViewports(viewports, editorConfig.getGizmoFrontLayerName()); },
  					rotationDisplayers: function(viewports) { return getViewports(viewports, editorConfig.getGizmoFarBackLayerName()); },
  					rotationHandles: function(viewports) { return getViewports(viewports, editorConfig.getGizmoCloseFrontLayerName()); }
  				},

  				getIconId: function(parent) {
  					if (parent.typeId == "ScrollStopper") { return gizmoBundle.getScrollStopperId(); }
  					if (parent.typeId == "BossWarning") { return gizmoBundle.getBossWarningId(); } 
  				},

  				ids: {
  					circleHandle: gizmoBundle.getCircleHandleId(),
  					circleDisplay: gizmoBundle.getCircleDisplayId(),
  					polygonHandle: gizmoBundle.getPolygonHandleId(),
  					polygonDisplay: gizmoBundle.getPolygonDisplayId(),
  					fixedPolygonHandle: gizmoBundle.getFixedPolygonHandleId(),
  					fixedPolygonDisplay: gizmoBundle.getFixedPolygonDisplayId(),
  					colliderGizmo: gizmoBundle.getColliderGizmoId(),
  					iconGizmo: gizmoBundle.getIconGizmoId(),
  					rotationGizmo: gizmoBundle.getRotationGizmoId(),
  					rotationHandle: gizmoBundle.getRotationHandleId(),
  					rotationDisplay: gizmoBundle.getRotationDisplayId()
  				}
  			}
  		}, this);
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
				objects.push(handle);
			}

			// Add the polygon collider displayer
			var display = gb.addChildTo(parent, options.ids.polygonDisplay, options.viewports.colliderDisplayers(viewports), { parentCollider: parentCollider }, 'create');
			display.gizmoType = "ColliderDisplay";
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
				objects.push(handle);
			}

			// Add the fixed polygon collider displayer
			var display = gb.addChildTo(parent, options.ids.fixedPolygonDisplay, options.viewports.colliderDisplayers(viewports), { parentCollider: parentCollider }, 'create'); 
			display.gizmoType = "ColliderDisplay";
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

    		if (go.gizmoType == "Icon") {
    			gb.removeFromViewports(go, options.viewports.icons(viewports));
    		}
    	}
    },

    addGizmos: function(object) {
    	var options = this.gizmoOptions();

    	// Editor only objects are skipped
    	if (require('editor-config').isEditorGameObject(object.typeId)) {
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
    }
  });

  return new EditorGizmos();
});
