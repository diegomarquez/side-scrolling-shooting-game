define(function(require) {

  var wrapper = require('wrap-in-div');

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
	    x.className = 'xValue';
      x.onchange = options.onXChange;
            
      $(x).addClass('ui-corner-all');
      $(x).addClass(options.inputClass);

	    var y = document.createElement('input');
      y.type  = 'text';
	    y.value = options.yValue;
	    y.className = 'yValue';
      y.onchange = options.onYChange;
      
      $(y).addClass('ui-corner-all');
      $(y).addClass(options.inputClass);

	    container.appendChild(label);
      container.appendChild(y);
      container.appendChild(x);

      var wrapped = wrapper.wrap(container);
      $(wrapped).addClass('ui-widget');
      $(wrapped).addClass(options.containerClass);

      return {
        html: wrapped,
        disable: function () {
          
        },
        enable: function () {

        },
        get X() { 
          return x.value; 
        },
        set X(value) { 
          x.value = value; 
        },
        get Y() { 
          return y.value; 
        },
        set Y(value) { 
          y.value = value; 
        }
      };
    }    
  });


  return TwoDimentionsInput;
});