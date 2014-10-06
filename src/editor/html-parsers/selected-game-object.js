define(function(require) {
  require('jquery');

  var SelectedGameObject = require("class").extend({
    init: function() {},

    get: function() {
      return $(document.querySelector('#game-object-selector')).attr('value');
    }
  });

  return new SelectedGameObject();
});
