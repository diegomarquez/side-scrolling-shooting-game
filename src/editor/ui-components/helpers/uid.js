define(function(require) {
  var id = -1;

  var Uid = require("class").extend({
    init: function() {},

    get: function() {
      id++;

      return id;
    }
  });

  return new Uid();
});