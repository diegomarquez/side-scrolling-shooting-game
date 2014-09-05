define(function(require) {
  var TwoDimentionsInput = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = options.id;
      container.className += options.containerClass; 

      var label = document.createElement('div');
      label.innerHTML = options.label;
      label.className += options.labelClass;

      var x = document.createElement('input');
	    x.type  = 'text';
	    x.className += options.inputClass;
	    x.value = options.xValue;
	    x.onchange = options.onXChange;

	    var y = document.createElement('input');
	    y.type  = 'text';
	    y.className += options.inputClass;
	    y.value = options.yValue;
	    y.onchange = options.onYChange;

	    container.appendChild(label);
      container.appendChild(x);
      container.appendChild(y);

      return container;
    }
  });

  return TwoDimentionsInput;
});