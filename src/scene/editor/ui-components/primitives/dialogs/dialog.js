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

        if (Object.prototype.toString.call(field.value) == '[object Function]') {
          // Function values are assigned to the input when the dialog opens
          $(input).data('valueGetter', field.value);
        } else {
          // Regular value is assigned on initialization
          input.value = field.value;
        }

        if (field.hidden) {
          label.style.display = 'none'; 
          input.style.display = 'none'; 
        }

        $(input).addClass('ui-corner-all');

        $(fieldset).append(label);
        $(fieldset).append(input);

        // Set up getters for all the fields in the dialog.
        // This will be easily accesible in button callbacks
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
            result = validate.call(dialog, tip, options.validateOnAction[action], options.fields, fieldGetters, inputFields);

            if (result === true) {
              // Change the context of the dialog buttons callback so they point to this dialog instance
              f.call(dialog);
            }
          }
        }.call(this, buttonCallback, action);
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
      
      options.create = function (event, ui) {
        $(this).css("minWidth", options.minWidth);
      }

      options.open = function() { 
        resetFeedback(tip, inputFields, options); 

        // Set the current values as defaults to go back to them in case the close button is pressed
        for(var m in inputFields) {
          var input = $(inputFields[m]());

          // Function values are set dynamically when the dialog opens
          var valueGetter = $(input).data('valueGetter');
          if (valueGetter) {
            input[0].value = valueGetter();
          } 

          input.attr('default', fieldGetters[m]());
        }
      }

      options.resizeStop = function (event, ui) {
        $(dialog).dialog("option", "position", { my: "center", at: "center", of: window });
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

      options.setErrorFeedback = function(message) {
        setErrorTip(tip, message);
      }

      options.setInfoFeedback = function(message) {
        setInfoTip(tip, message);
      }

      // Create the jQuery ui dialog
      var dialog = $.extend($(container).dialog(options), fieldGetters);

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

  var validate = function(tip, actions, fields, fieldGetters, inputFields) {
    try {
      var self = this;

      $.each(actions, function(i, action) {
        $.each(fields, function(j, field) {

          // No validations to do
          if (!field.validations) return;

          if (field.name == action) {
            $.each(field.validations, function(k, validation) {
              var method = toMethodName(field.name);

              if (!validation.check.call(self, fieldGetters[method]())) {
                applyFeedback(tip, inputFields[method](), validation.tip);

                $(self).trigger('autoCenter');

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

  var setErrorTip = function(tipContainer, message) {
    tipContainer.toError(message);
  }

  var setInfoTip = function(tipContainer, message) {
    tipContainer.toInfo(message);
  }

  var applyFeedback = function(tipContainer, inputField, validationTipMessage) {
    $(inputField).addClass("ui-state-error");
    setErrorTip(tipContainer, validationTipMessage);
  }

  var resetFeedback = function(tipContainer, inputFields, options) {
    setInfoTip(tipContainer, options.tip);

    $.each(inputFields, function (key, value) {
      $(value()).removeClass('ui-state-error');
    });
  }

  var toMethodName = function(name) {
    return name.replace(/ /g,'');
  }

  return Dialog;
});