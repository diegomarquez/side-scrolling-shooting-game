define(function(require) {
  var toggle = require('toggle');
  var gb = require('gb');
  var editorConfig = require('editor-config');

  var CollidersToggle = require('ui-component').extend({
    init: function() {},

    create: function() {      
      return toggle.create({
        id: 'colliders-toggle-button',
        on: 'Hide Colliders',
        off: 'Show Colliders',
        onChange: function() {
        	var checked = $(this).prop('checked');
        	var viewports = editorConfig.getViewports();

        	for (var i = 0; i < viewports.length; i++) {
        		var viewport = viewports[i];

        		if (checked) { 
        			viewport.showLayer(editorConfig.getGizmoFrontLayerName());
        			viewport.showLayer(editorConfig.getGizmoBackLayerName());
        		} else {
        			viewport.hideLayer(editorConfig.getGizmoFrontLayerName());
        			viewport.hideLayer(editorConfig.getGizmoBackLayerName());
        		}
        	}     
        }
      });
    }
  });

  return CollidersToggle;
});