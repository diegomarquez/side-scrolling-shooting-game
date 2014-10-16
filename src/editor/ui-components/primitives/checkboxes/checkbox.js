define(function(require) {

  var wrapper = require('wrap-in-div');

  var ButtonSet = require('class').extend({
    init: function() {

    },

    create: function(options) {      
      var checkbox = document.createElement('input');
      
      var startLabel = options.label ? options.label : options.offLabel;
      
      checkbox.id = options.id + '-' + startLabel;
      checkbox.name = startLabel;
      checkbox.value = startLabel;
      checkbox.type = 'checkbox';
      checkbox.checked = options.state;
      checkbox.disabled = options.disable;
        
      if (options.classNames) {
        for (var i = 0; i < options.classNames.length; i++) {
          $(checkbox).addClass(options.classNames[i]);
        }
      }

      var label = document.createElement('label');
      label.setAttribute('for', checkbox.id);
      label.innerHTML = startLabel;

      checkbox.onchange = function (checkboxOptions, checkbox) {
        return function (event) {
          if (checkboxOptions.onChange) {
            if (!checkboxOptions.label) {
              if (event.target.checked) {
                $(event.target).next('label').find("span").text(checkboxOptions.onLabel);
              } else {
                $(event.target).next('label').find("span").text(checkboxOptions.offLabel);
              }
            }

            if (checkboxOptions.icons) {
              if (checkboxOptions.icons.on && checkboxOptions.icons.off) {
                if (checkboxOptions.icons.primary == checkboxOptions.icons.on){
                  checkboxOptions.icons.primary = checkboxOptions.icons.off;
                }
                else {
                  checkboxOptions.icons.primary = checkboxOptions.icons.on;
                }

                $(checkbox).button(checkboxOptions);
              }
            }

            checkboxOptions.onChange(event);
          }
        }
      }(options, checkbox);

      var wrapped = wrapper.wrap([checkbox, label], { 
        id: options.id, 
        className: options.containerClass 
      });

      $(wrapped).find('input').button(options);

      return wrapped;
    }
  });

  return ButtonSet;
});