define(function(require) {
  var wrapper = require('wrap-in-div');

  var gb = require('gb');
  var editorConfig = require('editor-config');
  var gridBundle = require('grid-bundle');

  var GridToggle = require('class').extend({
    init: function() {},

    create: function() {
      // Add Grid
      gb.add(gridBundle.getGridId(), editorConfig.getDefaultGroupName(), [{viewport:editorConfig.getGridViewportName(), layer:editorConfig.getGridLayerName()}]);
      // Hide grid viewport      
      var gridViewport = gb.viewports.get(editorConfig.getGridViewportName());
      gridViewport.hide();

      var input = document.createElement('input');
      input.type = 'checkbox';
      $(input).attr('editor-toggle', '');

      $(input).attr('data-on', 'Turn Grid Off');
      $(input).attr('data-off', 'Turn Grid On');
      
      $(input).change(function() {
        if ($(this).prop('checked')) {
          gridViewport.show();
        } else {
          gridViewport.hide();
        }     
      });
      
      return wrapper.wrap(input, {
        id: 'grid-toggle-button'
      });
    }
  });

  return GridToggle;
});