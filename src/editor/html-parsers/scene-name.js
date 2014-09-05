define(function(require) {

  var gb = require('gb');

  var SceneName = require("class").extend({
    init: function() {},

    set: function(sceneName) {
      document.querySelector('#scene-name').value = sceneName;
    },

    get: function() {
      return document.querySelector('#scene-name').value;
    }
  });

  return new SceneName();
});
