define(function(require) {

  var wrapper = require('wrap-in-div');
  var componentFactory = require('ui-component-factory');

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

      return componentFactory.getController({
        controller: function() {
          $(input).spinner.apply($(input), arguments);
        },
        destroy: function() {
          $(input).spinner('destroy');
        }
      }, wrapper.wrap(spinner.parent()[0], options));
    }
  });

  return Spinner;
});