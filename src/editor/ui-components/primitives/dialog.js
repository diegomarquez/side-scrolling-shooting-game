define(function(require) {

  var Dialog = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = options.id;
      $(container).addClass('dialog');

      var tip = document.createElement('p');
      tip.innerHTML = options.tip;
      $(tip).addClass('tip');

      var form = document.createElement('form');
      var fieldset = document.createElement('fieldset');
      
      $(container).append(tip);
      $(container).append(form);
      $(form).append(fieldset);

      var fieldGetters = {};
      var inputFields = {};
      var fieldLabels = {};

      $.each(options.fields, function(index, field) {
        var lowerCaseName = field.name.toLowerCase();

        var label = document.createElement('label');
        label.innerHTML = field.name;
        $(label).attr('for', lowerCaseName);

        var input = document.createElement('input');
        input.type = 'text';
        input.name = lowerCaseName;
        input.id = lowerCaseName;
        input.value = field.value;

        $(input).addClass('ui-widget-content');
        $(input).addClass('ui-corner-all');

        $(fieldset).append(label);
        $(fieldset).append(input);

        // Set up getters for all the fields in the dialog.
        // This will be easy accesible in button callbacks
        fieldGetters[toMethodName(field.name)] = function(input) { 
          return function() { 
            return input.value; 
          } 
        }(input);

        fieldLabels[toMethodName(field.name)] = function(label) {
          return function() {
            return label; 
          }
        }(label);

        inputFields[toMethodName(field.name)] = function(input) {
          return function() {
            return input; 
          }
        }(input);
      });

      $.each(options.buttons, function(action, buttonCallback) {
        options.buttons[action] = function(f, action) {
          return function () {
            // Remove any feedback styling
            resetFeedback(tip, inputFields, options);

            // Validate the fields corresponding to this action
            result = validate(tip, options.validateOnAction[action], options.fields, fieldGetters, inputFields);

            if (result === true) {
              // Change the context of the dialog buttons callback so they point to this dialog instance
              f.call(dialog);
            }
          }
        }(buttonCallback, action);
      });

      options.close = function() {          
        if (options.resetOnClose) {
          // If the close butoon was pressed ...
          if ($(arguments[0].currentTarget).attr('title') == 'Close') {
            // Set all the values to the ones set when the dialog was opened
            for (var m in inputFields) {
              var input = inputFields[m]();
              input.value = $(input).attr('default');
            } 
          } 
        } else {
          // Set all the values to the ones set when the dialog was opened
          for (var m in inputFields) {
            var input = inputFields[m]();
            input.value = $(input).attr('default');
          }
        }
      }
      
      options.open = function() { 
        resetFeedback(tip, inputFields, options); 

        // Set the current values as defaults to go back to them in case the close button is pressed
        for(var m in inputFields) {
          var input = $(inputFields[m]());
          input.attr('default', fieldGetters[m]());
        }
      }

      options.disableField = function(name) {
        var label = $(fieldLabels[toMethodName(name)]());
        var input = $(inputFields[toMethodName(name)]());

        label.addClass('ui-state-disabled');
        input.addClass('ui-state-disabled');

        input.attr('disabled', true);
      }

      options.enableField = function(name) {
        var label = $(fieldLabels[toMethodName(name)]());
        var input = $(inputFields[toMethodName(name)]());

        label.removeClass('ui-state-disabled');
        input.removeClass('ui-state-disabled');

        input.attr('disabled', false);
      }

      options.setField = function(name, value) {
        var input = inputFields[toMethodName(name)]();
        
        input.value = value;
      }

      // Create the jQuery ui dialog
      var dialog = $.extend($(container).dialog(options), fieldGetters);

      return dialog;
    }
  });

  var validate = function(tip, actions, fields, fieldGetters, inputFields) {
    try {
      $.each(actions, function(i, action) {
        $.each(fields, function(j, field) {

          // No validations to do
          if (!field.validations) return;

          if (field.name == action) {
            $.each(field.validations, function(k, validation) {
              var method = toMethodName(field.name);

              if (!validation.check(fieldGetters[method]())) {
                applyFeedback(tip, inputFields[method](), validation.tip);
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

  var applyFeedback = function(tipContainer, inputField, validationTipMessage) {
    $(inputField).addClass("ui-state-error");
    $(tipContainer).addClass("ui-state-error");
    $(tipContainer).html(validationTipMessage);
  }

  var resetFeedback = function(tipContainer, inputFields, options) {
    $(tipContainer).html(options.tip);
    $(tipContainer).removeClass("ui-state-error");

    $.each(inputFields, function (key, value) {
      $(value()).removeClass('ui-state-error');
    });
  }

  var toMethodName = function(name) {
    return name.replace(/ /g,'');
  }

  return Dialog;
});