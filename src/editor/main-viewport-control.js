define(function(require) {

  var gb = require('gb');
  var keyboard = require('keyboard');

  var MainViewportControl = require("class").extend({
    init: function() {},

    create: function(main, step) {
      var viewport = gb.viewports.get(main);

      keyboard.onKeyUp(keyboard.UP, this, function() {
        viewport.y += step;
      });

      keyboard.onKeyUp(keyboard.DOWN, this, function() {
        viewport.y -= step;
      });

      keyboard.onKeyUp(keyboard.LEFT, this, function() {
        viewport.x += step;
      });

      keyboard.onKeyUp(keyboard.RIGHT, this, function() {
        viewport.x -= step;
      });
    }
  });

  return new MainViewportControl();
});
