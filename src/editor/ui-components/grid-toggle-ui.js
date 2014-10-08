define(function(require) {
  var wrapper = require('wrap-in-div');
  var checkbox = require('checkbox');

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

      var gridToogleUI = new checkbox().create({
        id: 'grid-toggle-button',
        onLabel: 'Hide Grid',
        offLabel: 'Show Grid',
        onChange: function(event) {
          if (event.target.checked) {
            gridViewport.show();
          } else {
            gridViewport.hide();
          }
        } 
      });
      
      return gridToogleUI;
    }
  });

  return GridToggle;
});