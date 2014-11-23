define(function(require) {

  var gb = require('gb');

  var SceneName = require("class").extend({
    init: function() {},

    set: function(sceneName) {
      document.querySelector('.side-menu-scene-title').innerHTML = sceneName;
    },

    get: function() {
      return document.querySelector('.side-menu-scene-title').innerHTML;
    }
  });

  return new SceneName();
});
