define(function(require) {
  var SelectedGameObject = require("class").extend({
    init: function() {},

    get: function() {
    	return 'First';
    }
  });

  return new SelectedGameObject();
});