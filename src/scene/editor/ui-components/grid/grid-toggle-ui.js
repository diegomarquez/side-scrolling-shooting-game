define(function(require) {
  var gb = require('gb');
  var toggle = require('toggle');
  var editorConfig = require('editor-config');
  var gridBundle = require('grid-bundle');

  var GridToggle = require('ui-component').extend({
    init: function() {},

    create: function() {
      // Add Grid
      gb.add(gridBundle.getGridId(), editorConfig.getDefaultGroupName(), [{viewport:editorConfig.getGridViewportName(), layer:editorConfig.getDefaultLayerName()}]);
      // Hide grid viewport      
      var gridViewport = gb.viewports.get(editorConfig.getGridViewportName());
      gridViewport.hide();

      return toggle.create({
        id: 'grid-toggle-button',
        on: 'Turn Grid Off',
        off: 'Turn Grid On',
        onChange: function() {
          if ($(this).prop('checked')) {
            gridViewport.show();
          } else {
            gridViewport.hide();
          }
        }
      });
    }
  });

  return GridToggle;
});