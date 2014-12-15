define(function(require) {
	var wrapper = require('wrap-in-div');
  var buttonUI = require('button');

  var DropdownSingleRemove = require('dropdown-single').extend({
    init: function() {
      
    },

    setupUI: function(container, contentContainer, options) {

    },

    createOptions: function(options) {
		  var optionElements = [];

		  var data = options.data();

		  for (var i = 0; i < data.length; i++) {
		    var option = $(document.createElement('li'));
		    
		    this.setOptionState(option, data[i], options);

		    var value = $(document.createElement('div'));
		    var button = $(document.createElement('button'))
		    
		    value.html(data[i]);
		    value.addClass('handle');
		    
		    button.attr('value', data[i]);
		    button.html('Remove');

		    option.addClass('ui-corner-all');
		    option.attr('value', data[i]);

		    option.append(value);
		    
		    if (options.canBeRemoved) {
		    	if (options.canBeRemoved(data[i])) {
			    	option.append(wrapper.wrap(button[0]));
			    }	
		    } else {
		    	option.append(wrapper.wrap(button[0]));
		    }
		    
		    optionElements.push(option[0]);
		  }

		  return optionElements;
		},

    setupOptionEvents: function(optionElements, container, contentContainer, options) {
      this._super(optionElements, container, contentContainer, options);

      for (var i = 0; i < optionElements.length; i++) {
        var option = $(optionElements[i]);

        if (!$(option).hasClass('ui-state-default')) {
          continue;
        }

        var button = option.find('button').button();

        button.click(function (option) {
          return function (event) {
            if (options.onRemove) {
              var value = $(event.target).closest('[value]').first().attr('value');
              options.onRemove(value);

              option.remove();
              $(contentContainer).remove();
            }
          } 
        }(option));        
      }
    }
  });

  return DropdownSingleRemove;
});

