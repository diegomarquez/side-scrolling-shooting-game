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
  					handles: [{ viewport:editorConfig.getGizmoViewportName(), layer:editorConfig.getDefaultFrontLayerName() }],
  					colliders: [{ viewport:editorConfig.getGizmoViewportName(), layer:editorConfig.getDefaultBackLayerName() }]	
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

    	// Add the circle handle for editing
    	objects.push(gb.addChildTo(parent, options.ids.circleHandle, options.viewports.handles, null, 'create'));
    	// Add the circle collider displayer 
    	objects.push(gb.addChildTo(parent, options.ids.circleDisplay, options.viewports.colliders, { parentCollider: parentCollider }, 'create'));
    	
    	return objects;  
    },

    addPolygonColliderGizmo: function(parent) {
    	var options = this.gizmoOptions();

    	var parentCollider = parent.findComponents().firstWithProp('collider');
    	var objects = [];

    	// Add a handle for each vertex of the polygon collider
    	for (var i = 0; i < parentCollider.Points.length; i++) {
				objects.push(gb.addChildTo(parent, options.ids.polygonHandle, options.viewports.handles, { pointIndex: i }, 'create'));
			}

			// Add the polygon collider displayer
			objects.push(gb.addChildTo(parent, options.ids.polygonDisplay, options.viewports.colliders, { parentCollider: parentCollider }, 'create'));

			return objects;
    },

    addFixedPolygonColliderGizmo: function(parent) {
    	var options = this.gizmoOptions();

    	var parentCollider = parent.findComponents().firstWithProp('collider');
    	var objects = [];

    	// Add a handle for each vertex of the polygon collider
    	for (var i = 0; i < parentCollider.Points.length; i++) {
				objects.push(gb.addChildTo(parent, options.ids.fixedPolygonHandle, options.viewports.handles, { pointIndex: i }, 'create'));
			}

			// Add the fixed polygon collider displayer
			objects.push(gb.addChildTo(parent, options.ids.fixedPolygonDisplay, options.viewports.colliders, { parentCollider: parentCollider }, 'create'));

			return objects;
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
