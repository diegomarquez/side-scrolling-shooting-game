define(function(require) {

  var gb = require('gb');
  var keyboard = require('keyboard');
  var wordl = require('world');

  var MainViewportControl = require("class").extend({
    init: function() {},

    create: function(step) {
      var viewport = gb.viewports.get('Main');

      keyboard.onKeyUp(keyboard.UP, this, function() {
        viewport.y += world.getStep();
      });

      keyboard.onKeyUp(keyboard.DOWN, this, function() {
        viewport.y -= world.getStep();
      });

      keyboard.onKeyUp(keyboard.LEFT, this, function() {
        viewport.x += world.getStep();
      });

      keyboard.onKeyUp(keyboard.RIGHT, this, function() {
        viewport.x -= world.getStep();
      });
    }
  });

  return new MainViewportControl();
});
