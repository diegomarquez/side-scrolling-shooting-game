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
        onStopX: function(event, ui) {
          world.setWidth($(event.target).spinner('value'));
        },
        minY: gb.canvas.height,
        stepY: gridCellSize.height,
        valueY: world.getHeight(),
        onStopY: function(event, ui) {
          world.setHeight($(event.target).spinner('value'));
        },
      }); 

      world.on(world.CHANGE_WIDTH, this, function(width) {
        sizeUI.controller.X('value', width);
      });

      world.on(world.CHANGE_HEIGHT, this, function(height) {
        sizeUI.controller.Y('value', height);
      });

      return wrapper.wrap(wrapper.wrap([sizeUI.html], { id: 'world-edit'}));
    }
  });

  return WorldEditUI;
});