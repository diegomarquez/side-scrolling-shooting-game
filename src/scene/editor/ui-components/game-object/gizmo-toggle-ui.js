define(function(require) {
  var gb = require('gb');
  var toggle = require('toggle');
  var editorConfig = require('editor-config');
  var gridBundle = require('grid-bundle');

  var GridToggle = require('ui-component').extend({
    init: function() {},

    create: function() { 
      // Hide gizmo viewport      
      var gizmoViewport = gb.viewports.get(editorConfig.getGizmoViewportName());
      gizmoViewport.hide();

      return toggle.create({
        id: 'gizmo-toggle-button',
        on: 'Hide Gizmos',
        off: 'Show Gizmos',
        onChange: function() {
          if ($(this).prop('checked')) {
            gizmoViewport.show();
          } else {
            gizmoViewport.hide();
          }
        }
      });
    }
  });

  return GridToggle;
});