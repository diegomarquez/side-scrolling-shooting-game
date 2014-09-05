define(function(require) {

  var Option = require("class").extend({
    init: function() {},

    create: function(name, value) {
		var option = document.createElement("option");

		option.text = name;
		option.value = value;

		return option;
    }
  });

  return new Option();
});