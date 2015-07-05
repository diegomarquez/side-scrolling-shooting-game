define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var world = require('world');
  var editorConfig = require('editor-config');
  var editorDelegates = require('editor-delegates');

  var twoDimentionsSpinner = require('two-dimentions-spinner');

  var WorldEditUI = require('ui-component').extend({
    init: function() {
      this.sizeUI = null;
      this.gridCellSize = null;
    },

    create: function() {
      this.gridCellSize = editorConfig.getGridCellSize();

      this.sizeUI = new twoDimentionsSpinner().create({
        id: 'world-size-container',
        label: 'World Size',
        minX: gb.canvas.width,
        stepX: this.gridCellSize.width,
        valueX: world.getWidth(),
        onStopX: function(event, ui) {
          world.setWidth($(event.target).spinner('value'));
        },
        minY: gb.canvas.height,
        stepY: this.gridCellSize.height,
        valueY: world.getHeight(),
        onStopY: function(event, ui) {
          world.setHeight($(event.target).spinner('value'));
        },
      }); 

      editorDelegates.add(world, world.CHANGE_WIDTH, this, function (width) {
        this.sizeUI.controller.X('value', width);
      });

      editorDelegates.add(world, world.CHANGE_HEIGHT, this, function (height) {
        this.sizeUI.controller.Y('value', height);
      });

      return wrapper.wrap(wrapper.wrap([this.sizeUI.html], { id: 'world-edit'}), { id: 'world-edit-wrapper'});
    }
  });

  return WorldEditUI;
});