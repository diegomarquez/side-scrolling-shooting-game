define(function(require) {

  var divWrapper = require('wrap-in-div');

  require('jquery');
  require('jquery-ui');

  var OneDimentionsInput = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = options.id;

      $(container).addClass('ui-state-default');

      var label = document.createElement('div');
      label.innerHTML = options.label;
      $(label).addClass(options.labelClass);

      var input = document.createElement('input');
	    input.type  = 'text';
      input.value = options.value;
      input.className = 'value';
	    input.onchange = options.onChange;
      $(input).addClass(options.inputClass);

	    container.appendChild(label);
      container.appendChild(input);

      var wrapped = divWrapper.wrap(container);
      $(wrapped).addClass('ui-widget');
      $(wrapped).addClass(options.containerClass);

      return {
        html: wrapped,
        get Value() { 
          return input.value; 
        },
        set Value(value) { 
          input.value = value; 
        }
      };
    }
  });

  return OneDimentionsInput;
});