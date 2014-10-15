define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var world = require('world');
  var editorConfig = require('editor-config');

  var twoDimentionsSpinner = require('two-dimentions-spinner');

  var WorldEditUI = require('class').extend({
    init: function() {},

    create: function() {
      var gridCellSize = editorConfig.getGridCellSize();

      var sizeUI = new twoDimentionsSpinner().create({
        id: 'world-size-container',
        label: 'World Size',
        minX: gb.canvas.width,
        stepX: gridCellSize.width,
        valueX: world.getWidth(),
        onSpinX: function(event, ui) {
          world.setWidth(ui.value);
        },
        minY: gb.canvas.height,
        stepY: gridCellSize.height,
        valueY: world.getHeight(),
        onSpinY: function(event, ui) {
          world.setHeight(ui.value);
        }
      }); 

      return wrapper.wrap(wrapper.wrap([sizeUI], { className: 'world-edit'}));
    }
  });

  return WorldEditUI;
});