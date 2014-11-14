define(function(require) {

  var wrapper = require('wrap-in-div');

  var Spinner = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var input = document.createElement('input');

      input.value = options.value;

      options.change = options.onChange;
      options.spin = options.onSpin;
      options.stop = options.onStop;

      var spinner = $(input).spinner(options);

      return {
        html: wrapper.wrap(spinner.parent()[0], options),
        controller: function() {
          $(input).spinner.apply($(input), arguments);
        }
      }
    }
  });

  return Spinner;
});