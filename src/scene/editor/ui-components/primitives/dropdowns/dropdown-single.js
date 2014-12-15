define(function(require) {
  var DropdownSingle = require('dropdown-base').extend({
    init: function() {
      
    },

    setupUI: function(container, contentContainer, options) {

    },

    setupOptionEvents: function(optionElements, container, contentContainer, options) {
      this._super(optionElements, container, contentContainer, options);

      var mainButton = $(container).find('.main-button').find('span')[0];

      var self = this;

      for (var i = 0; i < optionElements.length; i++) {
        var option = optionElements[i];

        if (!$(option).hasClass('ui-state-default')) {
          continue;
        }

        $(option).on('click', function() {
          $(this).removeClass('ui-state-hover');

          var value = $(this).attr('value');

          mainButton.innerHTML = options.selectedMessage + " " + value;
          $(container).attr('value', value);

          self.removeMenu(contentContainer);
        });
      }
    }
  });

  return DropdownSingle;
});

