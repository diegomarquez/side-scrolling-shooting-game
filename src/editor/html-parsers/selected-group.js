define(function(require) {
  require('jquery');

  var SelectedGameObject = require("class").extend({
    init: function() {},

    get: function() {
    	return $(document.querySelector('#group-selector')).attr('value');
    }
  });

  return new SelectedGameObject();
});