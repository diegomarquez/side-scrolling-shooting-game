define(function(require) {

  var gb = require('gb');

  var MainViewport = require("class").extend({
    init: function() {},

    get: function() {
      return gb.viewports.get('Main');
    }
  });

  return new MainViewport();
});
