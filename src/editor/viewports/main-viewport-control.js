define(function(require) {

  var gb = require('gb');
  var keyboard = require('keyboard');
  var editorConfig = require('editor-config');

  var MainViewportControl = require("class").extend({
    init: function() {},

    create: function(step) {
      var viewport = gb.viewports.get(editorConfig.getMainViewportName());
      var gridCellSize = editorConfig.getGridCellSize();

      keyboard.onKeyUp(keyboard.UP, this, function() {
        viewport.y += gridCellSize.height;
      });

      keyboard.onKeyUp(keyboard.DOWN, this, function() {
        viewport.y -= gridCellSize.height;
      });

      keyboard.onKeyUp(keyboard.LEFT, this, function() {
        viewport.x += gridCellSize.width;
      });

      keyboard.onKeyUp(keyboard.RIGHT, this, function() {
        viewport.x -= gridCellSize.width;
      });
    }
  });

  return new MainViewportControl();
});
