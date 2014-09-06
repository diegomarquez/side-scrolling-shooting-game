define(function(require) {
  
  var gb = require('gb');
  var outlineBundle = require('outline-bundle');
  var viewportOutline = require('viewport-outline');

  var SetupViewport = require('class').extend({
    init: function() {
      this.outlines = {};
    },

    setup: function(name) {    
      var viewport = gb.viewports.add(name, gb.canvas.width, gb.canvas.height, 0, 0)
      viewport.addLayer('Front');

      return viewport;
    },

    addOutline: function(viewportName) {
      viewportOutline.add({
        viewportName: viewportName,
        gameObjectId: outlineBundle.getOutlineId(),
        updateGroup: 'First',
        viewports: [
          {
            viewport: viewportName, 
            layer: 'Front'
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