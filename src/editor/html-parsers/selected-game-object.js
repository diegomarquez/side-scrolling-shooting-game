define(function(require) {
  var SelectedGameObject = require("class").extend({
    init: function() {},

    get: function() {
      return $(document.querySelector('#game-object-selector')).attr('value');
    }
  });

  return new SelectedGameObject();
});
