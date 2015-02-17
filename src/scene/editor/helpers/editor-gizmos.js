define(function(require) {
  var gb = require('gb');
  var util = require('util');
  
  var EditorGizmos = require('class').extend({
    init: function() {
    	this.gizmoOptions = util.cache(function() {
  			var editorConfig = require('editor-config');
  			var gizmoBundle = require('gizmo-bundle');
  			
  			return {
  				viewports: {
  					icons: function(viewports) {
  						var result = [];

  						for (var i = 0; i < viewports.length; i++) {
  						 	var v = viewports[i];
  						 	result.push({ viewport:v.viewport, layer:editorConfig.getGizmoBackLayerName() });
  						}

  						return result;
  					},

  					colliders: function(viewports) {
  						var result = [];

  						for (var i = 0; i < viewports.length; i++) {
  						 	var v = viewports[i];
  						 	result.push({ viewport:v.viewport, layer:editorConfig.getGizmoMiddleLayerName() });
  						 }

  						 return result;
  					},

  					handles: function(viewports) {
  						var result = [];

  						for (var i = 0; i < viewports.length; i++) {
  						 	var v = viewports[i];
  						 	result.push({ viewport:v.viewport, layer:editorConfig.getGizmoFrontLayerName() });
  						}

  						return result;
  					}
  				},

  				getIconId: function(parent) {
  					if (parent.typeId == "ScrollStopper") {
  						return gizmoBundle.getScrollStopperId();
  					}

  					if (parent.typeId == "BossWarning") {
  						return gizmoBundle.getBossWarningId();
  					} 
  				},

  				ids: {
  					circleHandle: gizmoBundle.getCircleHandleId(),
  					circleDisplay: gizmoBundle.getCircleDisplayId(),
  					polygonHandle: gizmoBundle.getPolygonHandleId(),
  					polygonDisplay: gizmoBundle.getPolygonDisplayId(),
  					fixedPolygonHandle: gizmoBundle.getFixedPolygonHandleId(),
  					fixedPolygonDisplay: gizmoBundle.getFixedPolygonDisplayId(),
  					colliderGizmo: gizmoBundle.getColliderGizmoId(),
  					iconGizmo: gizmoBundle.getIconGizmoId()
  				}
  			}
  		}, this);
    },

    addIconGizmo: function(parent) {
    	var objects = [];

    	var options = this.gizmoOptions();
    	var viewports = parent.getViewportList();

    	// Add the icon gizmo
    	objects.push(gb.addChildTo(parent, options.getIconId(parent), options.viewports.icons(viewports), null, 'create'));
    	
    	return objects;
    },

    addCircleColliderGizmo: function(parent) {
    	var options = this.gizmoOptions();

    	var parentCollider = parent.findComponents().firstWithProp('collider');
    	var objects = [];

    	var viewports = parent.getViewportList();

    	// Add the circle handle for editing
    	objects.push(gb.addChildTo(parent, options.ids.circleHandle, options.viewports.handles(viewports), null, 'create'));
    	// Add the circle collider displayer 
    	objects.push(gb.addChildTo(parent, options.ids.circleDisplay, options.viewports.colliders(viewports), { parentCollider: parentCollider }, 'create'));
    	
    	return objects;  
    },

    addPolygonColliderGizmo: function(parent) {
    	var options = this.gizmoOptions();

    	var parentCollider = parent.findComponents().firstWithProp('collider');
    	var objects = [];

    	var viewports = parent.getViewportList();

    	// Add a handle for each vertex of the polygon collider
    	for (var i = 0; i < parentCollider.Points.length; i++) {
				objects.push(gb.addChildTo(parent, options.ids.polygonHandle, options.viewports.handles(viewports), { pointIndex: i }, 'create'));
			}

			// Add the polygon collider displayer
			objects.push(gb.addChildTo(parent, options.ids.polygonDisplay, options.viewports.colliders(viewports), { parentCollider: parentCollider }, 'create'));

			return objects;
    },

    addFixedPolygonColliderGizmo: function(parent) {
    	var options = this.gizmoOptions();

    	var parentCollider = parent.findComponents().firstWithProp('collider');
    	var objects = [];

    	var viewports = parent.getViewportList();

    	// Add a handle for each vertex of the polygon collider
    	for (var i = 0; i < parentCollider.Points.length; i++) {
				objects.push(gb.addChildTo(parent, options.ids.fixedPolygonHandle, options.viewports.handles(viewports), { pointIndex: i }, 'create'));
			}

			// Add the fixed polygon collider displayer
			objects.push(gb.addChildTo(parent, options.ids.fixedPolygonDisplay, options.viewports.colliders(viewports), { parentCollider: parentCollider }, 'create'));

			return objects;
    },

		addGizmosToViewports: function(go, gizmoComponents, viewports) {
			var options = this.gizmoOptions();

			for (var i = 0; i < gizmoComponents.length; i++) {
    		var go = gizmoComponents[i];

    		gb.addToViewports(go, options.viewports.handles(viewports));
    		gb.addToViewports(go, options.viewports.colliders(viewports));
    	}
		},

		removeGizmosFromViewports: function(go, gizmoComponents, viewports) {
			var options = this.gizmoOptions();
			
    	for (var i = 0; i < gizmoComponents.length; i++) {
    		var go = gizmoComponents[i];

    		gb.removeFromViewports(go, options.viewports.handles(viewports));
    		gb.removeFromViewports(go, options.viewports.colliders(viewports));
    	}
    },

    addGizmos: function(object) {
    	var options = this.gizmoOptions();

    	// Add the Collider Gizmo to the game object if it has a collider
      if (object.findComponents().firstWithProp('collider')) {
      	gb.addComponentTo(object, options.ids.colliderGizmo);	
      }

      // Add the Icon Gizmo if the game object has no renderer
      if (!object.renderer) {
      	gb.addComponentTo(object, options.ids.iconGizmo);	
      }
    }
  });

  return new EditorGizmos();
});
