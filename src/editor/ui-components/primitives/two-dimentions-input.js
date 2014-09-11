define(function(require) {

  var divWrapper = require('wrap-in-div');

  require('jquery');
  require('jquery-ui');

  var TwoDimentionsInput = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = options.id;
      
      $(container).addClass('ui-state-default');
      $(container).addClass('ui-corner-all');
      
      var label = document.createElement('div');
      label.innerHTML = options.label;
      $(label).addClass(options.labelClass);

      var x = document.createElement('input');
	    x.type  = 'text';
	    x.value = options.xValue;
	    x.onchange = options.onXChange;
            
      $(x).addClass('ui-corner-all');
      $(x).addClass(options.inputClass);

	    var y = document.createElement('input');
      y.type  = 'text';
	    y.value = options.yValue;
	    y.onchange = options.onYChange;
      
      $(y).addClass('ui-corner-all');
      $(y).addClass(options.inputClass);

	    container.appendChild(label);
      container.appendChild(x);
      container.appendChild(y);

      var wrapped = divWrapper.wrap(container);
      $(wrapped).addClass('ui-widget');
      $(wrapped).addClass(options.containerClass);

      return wrapped;
    }
  });

  return TwoDimentionsInput;
});