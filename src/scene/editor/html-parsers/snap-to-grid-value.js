define(function(require) {
  var SnapToGridValue = require("class").extend({
    init: function() {},

    get: function() {
    	return $('#snap-to-grid-toggle-button').find('input').prop('checked');
    }
  });

  return new SnapToGridValue();
});