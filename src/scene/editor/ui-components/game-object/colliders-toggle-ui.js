define(function(require) {
  var toggle = require('toggle');
  var gb = require('gb');
  var editorConfig = require('editor-config');

  var CollidersToggle = require('ui-component').extend({
    init: function() {},

    create: function() {
    	// Hide gizmo viewport      
      var gizmoViewport = gb.viewports.get(editorConfig.getGizmoViewportName());
      gizmoViewport.hide();

      return toggle.create({
        id: 'colliders-toggle-button',
        on: 'Hide Colliders',
        off: 'Show Colliders',
        onChange: function() {
          if ($(this).prop('checked')) {
          	gb.toggleColliderDebug(true);
            gizmoViewport.show();
          } else {
            gb.toggleColliderDebug(false);
            gizmoViewport.hide();
          }
        }
      });
    }
  });

  return CollidersToggle;
});