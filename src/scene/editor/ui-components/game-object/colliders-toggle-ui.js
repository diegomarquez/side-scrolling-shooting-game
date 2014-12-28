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
      		var gizmoViewport = gb.viewports.get(editorConfig.getGizmoViewportName());
          
          $(this).prop('checked') ? gizmoViewport.show() : gizmoViewport.hide();
        }
      });
    }
  });

  return CollidersToggle;
});