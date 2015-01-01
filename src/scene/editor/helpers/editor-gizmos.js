define(function(require) {
  var gb = require('gb');
  var util = require('util');
  
  var EditorGizmos = require('class').extend({
    init: function() {
    	this.gizmoOptions = util.cache(function() {
  			var editorConfig = require('editor-config');
  			var gizmoHandleBundle = require('gizmo-bundle');
  			
  			return {
  				viewports: {
  					handles: function(viewports) {
  						var result = [];

  						for (var i = 0; i < viewports.length; i++) {
  						 	var v = viewports[i];
  						 	result.push({ viewport:v.viewport, layer:editorConfig.getGizmoFrontLayerName() });
  						}

  						return result;
  					},

  					colliders: function(viewports) {
  						var result = [];

  						for (var i = 0; i < viewports.length; i++) {
  						 	var v = viewports[i];
  						 	result.push({ viewport:v.viewport, layer:editorConfig.getGizmoBackLayerName() });
  						 }

  						 return result;
  					}
  				},
  				ids: {
  					circleHandle: gizmoHandleBundle.getCircleHandleId(),
  					circleDisplay: gizmoHandleBundle.getCircleDisplayId(),
  					polygonHandle: gizmoHandleBundle.getPolygonHandleId(),
  					polygonDisplay: gizmoHandleBundle.getPolygonDisplayId(),
  					fixedPolygonHandle: gizmoHandleBundle.getFixedPolygonHandleId(),
  					fixedPolygonDisplay: gizmoHandleBundle.getFixedPolygonDisplayId(),
  					colliderGizmo: gizmoHandleBundle.getColliderGizmoId()
  				}
  			}
  		}, this);
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
    }
  });

  return new EditorGizmos();
});
