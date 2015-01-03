define(function(require) {

  var statusMessage = require('create-status-message'); 

  var Dialog = require('ui-component').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = options.id;
      $(container).addClass('dialog');

      var tip = statusMessage.createInfoMessage(options.tip);
      
      var form = document.createElement('form');
      var fieldset = document.createElement('fieldset');
      
      tip.appendTo(container);

      $(container).append(form);
      $(form).append(fieldset);

      var fieldObjects = {};

      $.each(options.fields, function(index, field) {
      	// Create the HTML corresponding for each field
      	field.create();
      	
      	$(field.html()).css({
      		'padding-bottom': '5px'
      	});

      	fieldObjects[toMethodName(field.name())] = field;

      	// Append the HTML fragment created by the field object it to the fieldset property of the dialog
      	$(fieldset).append(field.html());
      });

      $.each(options.buttons, function(action, buttonCallback) {
      	options.buttons[action] = function(f, action) {
          return function () {
            // Remove any feedback styling
            resetFeedback(tip, options.fields, options);

            // Validate the fields corresponding to this action
            result = validate.call(dialog, tip, options.validateOnAction[action], options.fields);

            if (result === true) {
              // Change the context of the dialog buttons callback so they point to this dialog instance
              f.call(dialog);
            }
          }
        }.call(this, buttonCallback, action);
      });

      options.close = function() {          
        var title = $(arguments[0].currentTarget).attr('title');

        $.each(options.fields, function(index, field) {
        	if (options.resetOnClose) {
	          if (title == 'Close') {
	          	field.reset();    
	          } 
	        } else {
	        	field.reset();
	        }
      	});
      }
      
      options.open = function() { 
      	resetFeedback(tip, options.fields, options); 
      	
      	$.each(options.fields, function(index, field) {
      		field.open();
      	});
      }
      
      options.create = function (event, ui) {
        $(this).css("minWidth", options.minWidth);
      }

      options.resizeStop = function (event, ui) {
        $(dialog).dialog("option", "position", { my: "center", at: "center", of: window });
      }

      options.updateField = function(name, value) {
        fieldObjects[toMethodName(name)].update(value);
      }

      // Build the object with all the getters for each field
      var valueGetters = {};
      $.each(options.fields, function(index, field) {
      	valueGetters[toMethodName(field.name())] = field.valueGetter();
      });

      // Create the jQuery ui dialog
      var dialog = $.extend($(container).dialog(options), valueGetters);

      // Prevent form submition
      $(dialog).submit( function(e) {
        e.preventDefault();
      });

      // Center the dialog when width changes
      $(dialog).on('autoCenter', function() {
        $(dialog).dialog("option", "position", { my: "center", at: "center", of: window });
      });

      this.dialog = dialog;
      this.tip = tip;

      return dialog;
    },

    destroy: function() {
      $(dialog).dialog('destroy').remove();
    }
  });

  var validate = function(tip, actions, fields) {
    try {
      var self = this;

      $.each(actions, function(i, action) {
        $.each(fields, function(j, field) {

        	var validations = field.validations();
        	var valueGetter = field.valueGetter();

          // No validations to do
          if (!validations) 
          	return;

          if (field.name() == action) {
            $.each(validations, function(k, validation) {     
              if (!validation.check.call(self, valueGetter())) {
                // Apply the feedback for the failed validation
                applyFeedback(tip, field, validation.tip);
                // Trigger event to center the dialog if needed
                $(self).trigger('autoCenter');
                // Hack to exit the nested for loop with validation error
                throw new Error(validation.tip);
              }
            });
          }
        });
      });
    } catch (e) {
      return e.message;
    }

    return true;
  }

  var applyFeedback = function(tipContainer, fieldObject, validationTipMessage) {
    tipContainer.toError(validationTipMessage);
    fieldObject.applyFeedback();
  }

  var resetFeedback = function(tipContainer, fieldObjects, options) {
    tipContainer.toInfo(options.tip);

    $.each(fieldObjects, function (key, field) {
    	field.resetFeedback();
    });
  }

  var toMethodName = function(name) {
    return name.replace(/ /g,'');
  }

  return Dialog;
});