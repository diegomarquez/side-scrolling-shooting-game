define(function(require) {
  
  var gb = require('gb');
  var editorConfig = require('editor-config');
  var outlineBundle = require('outline-bundle');
  var viewportOutline = require('viewport-outline');

  var SetupViewport = require('class').extend({
    init: function() {},

    setup: function(viewportName) {      
      var viewport = gb.viewports.get(viewportName);

      viewport.addLayer(editorConfig.getDefaultLayerName());
      viewport.addLayer(editorConfig.getOutlineLayerName());
      
      viewport.addLayer(editorConfig.getGizmoFarBackLayerName());
      viewport.addLayer(editorConfig.getGizmoBackLayerName());
      viewport.addLayer(editorConfig.getGizmoMiddleLayerName());
      viewport.addLayer(editorConfig.getGizmoFrontLayerName());
      viewport.addLayer(editorConfig.getGizmoCloseFrontLayerName());

      viewport.hideLayer(editorConfig.getGizmoMiddleLayerName());
      viewport.hideLayer(editorConfig.getGizmoFrontLayerName());
      viewport.hideLayer(editorConfig.getGizmoCloseFrontLayerName());
      viewport.hideLayer(editorConfig.getGizmoFarBackLayerName());

      return viewport;
    },

    addOutline: function(viewportName) {
      viewportOutline.add({
        viewportName: viewportName,
        gameObjectId: outlineBundle.getOutlineId(),
        updateGroup: editorConfig.getDefaultGroupName(),
        viewports: [
          {
            viewport: viewportName, 
            layer: editorConfig.getOutlineLayerName()
          }
        ],
        gameObjectArguments: {
          viewport: gb.viewports.get(viewportName)
        } 
      });
    },

    removeOutline: function(viewportName) {
      viewportOutline.remove(viewportName);
    }
  });

  return new SetupViewport;
});