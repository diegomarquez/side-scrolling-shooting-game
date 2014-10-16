define(function(require) {

  var wrapper = require('wrap-in-div');

  var ButtonSet = require('class').extend({
    init: function() {

    },

    create: function(options) {      
      var elements = [];

      for (var i = 0; i < options.checkboxes.length; i++) {
        var checkbox = document.createElement('input');
        var checkboxOptions = options.checkboxes[i];
        
        if (checkboxOptions.classNames) {
          for (var j = 0; j < checkboxOptions.classNames.length; j++) {
            $(checkbox).addClass(checkboxOptions.classNames[j]);
          }
        }

        var startLabel = checkboxOptions.label ? checkboxOptions.label : checkboxOptions.offLabel;

        checkbox.id = options.id + '-' + startLabel;
        checkbox.name = startLabel;
        checkbox.value = startLabel;
        checkbox.type = 'checkbox';
        checkbox.checked = checkboxOptions.state;
        checkbox.disabled = checkboxOptions.disable;

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
        }(checkboxOptions, checkbox);

        elements.push(checkbox);
        elements.push(label);
      };

      var wrapped = wrapper.wrap(elements, { id: options.id, className: options.containerClass });

      $(wrapped).buttonset();

      for (var i = 0; i < elements.length; i += 2) {
        var o = options.checkboxes[i/2];

        if (o.icons) {
          if (o.icons.on && o.icons.off) {
            if (checkboxOptions.state) {
              o.icons.primary = o.icons.off;
            } else {
              o.icons.primary = o.icons.on;
            }
          }
        }

        $(elements[i]).button(o);
      }

      return wrapped;
    }
  });

  return ButtonSet;
});