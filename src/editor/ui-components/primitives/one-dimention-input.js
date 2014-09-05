define(function(require) {
  var OneDimentionsInput = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = options.id;
      container.className += options.containerClass; 

      var label = document.createElement('div');
      label.innerHTML = options.label;
      label.className += options.labelClass;

      var input = document.createElement('input');
	    input.type  = 'text';
	    input.className += options.inputClass;
	    input.value = options.value;
	    input.onchange = options.onChange;

	    container.appendChild(label);
      container.appendChild(input);

      return container;
    }
  });

  return OneDimentionsInput;
});