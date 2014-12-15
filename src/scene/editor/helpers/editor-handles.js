define(function(require) {
  var gb = require('gb');
  var util = require('util');
  
  var EditorHandles = require('class').extend({
    init: function() {
    	this.gizmoViewport = util.cache(function() {
  			var editorConfig = require('editor-config');
  			return [{ viewport:editorConfig.getGizmoViewportName(), layer:editorConfig.getDefaultLayerName() }];
  		}, this);
    },

    addCircleHandle: function(parent) {
    	var gizmoHandleBundle = require('gizmo-handle-bundle');

    	// Circle colliders only need one handle
    	return gb.addChildTo(parent, gizmoHandleBundle.getCircleHandleId(), this.gizmoViewport(), null, 'create');  
    },

    addPolygonHandle: function(parent) {
    	var gizmoHandleBundle = require('gizmo-handle-bundle');

    	var parentCollider = this.parent.findComponents().firstWithProp('collider');
    	var handles = [];

    	// Add a handle for each vertex of the polygon collider
    	for (var i = 0; i < parentCollider.Points.length; i++) {
				handles.push(gb.addChildTo(parent, gizmoHandleBundle.getPolygonHandleId(), this.gizmoViewport(), { pointIndex: i }, 'create'));
			}

			return handles;
    },

    addGizmos: function(object) {
    	var gizmoHandleBundle = require('gizmo-handle-bundle');
    	
    	// Add the Collider Gizmo to the game object if it has a collider
      if (object.findComponents().firstWithProp('collider')) {
      	gb.addComponentTo(object, gizmoHandleBundle.getColliderGizmoId());	
      }
    }
  });

  return new EditorHandles();
});
