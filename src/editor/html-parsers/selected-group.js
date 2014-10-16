define(function(require) {
  var SelectedGameObject = require("class").extend({
    init: function() {},

    get: function() {
    	return $(document.querySelector('#group-selector')).attr('value');
    }
  });

  return new SelectedGameObject();
});