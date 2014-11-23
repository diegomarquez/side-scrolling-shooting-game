define(function(require) {

  var gb = require('gb');
  var editorConfig = require('editor-config');

  var MainViewport = require("class").extend({
    init: function() {},

    get: function() {
      return gb.viewports.get(editorConfig.getMainViewportName());
    }
  });

  return new MainViewport();
});
