define(function(require) {
  var gb = require('gb');
  var toggle = require('toggle');
  var editorConfig = require('editor-config');
  
  var GridToggle = require('ui-component').extend({
    init: function() {},

    create: function() {
      
      return toggle.create({
        id: 'grid-toggle-button',
        on: 'Turn Grid Off',
        off: 'Turn Grid On',
        onChange: function() {
      		var gridViewport = gb.viewports.get(editorConfig.getGridViewportName());
          
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