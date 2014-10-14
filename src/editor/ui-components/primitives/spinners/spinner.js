define(function(require) {
  require('jquery');
  require('jquery-ui');

  var wrapper = require('wrap-in-div');

  var Spinner = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var input = document.createElement('input');

      input.value = options.value;

      options.change = options.onChange;
      options.spin = options.onSpin;

      var spinner = $(input).spinner(options);

      return wrapper.wrap(spinner.parent()[0], options);
    }
  });

  return Spinner;
});