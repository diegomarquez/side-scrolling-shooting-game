define(function(require) {
  var toggle = require('toggle');
  var gb = require('gb');
  var editorConfig = require('editor-config');

  var RotationToggle = require('ui-component').extend({
    init: function() {},

    create: function() {      
      return toggle.create({
        id: 'rotations-toggle-button',
        on: 'Hide Rotation Handles',
        off: 'Show Rotation Handles',
        onChange: function() {
        	var checked = $(this).prop('checked');
        	var viewports = editorConfig.getViewports();

        	for (var i = 0; i < viewports.length; i++) {
        		var viewport = viewports[i];

        		if (checked) { 
        			viewport.showLayer(editorConfig.getGizmoFarBackLayerName());
        			viewport.showLayer(editorConfig.getGizmoCloseFrontLayerName());
        		} else {
        			viewport.hideLayer(editorConfig.getGizmoFarBackLayerName());
        			viewport.hideLayer(editorConfig.getGizmoCloseFrontLayerName());
        		}
        	}     
        }
      });
    }
  });

  return RotationToggle;
});