define(function(require) {

  var spinnerUI = require('spinner');
  var wrapper = require('wrap-in-div');

  var OneDimentionSpinner = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var id = options.id;
      options.id += "-spinner";

      var spinner = new spinnerUI().create(options);

      var label = document.createElement('label');
      label.innerHTML = options.label;

      return wrapper.wrap([wrapper.wrap(label), $(spinner)[0]], {
        id: id,
        classNames: ['ui-widget', 'one-dimentional-spinner']
      });
    }
  });

  return OneDimentionSpinner;
});