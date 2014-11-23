define(function(require) {
  var ScenePlayer = require("ui-component").extend({
    init: function() {
      this._super();
    }
  });

  Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });

  return new ScenePlayer();
})