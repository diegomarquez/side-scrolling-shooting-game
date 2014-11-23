define(function(require) {
  var EditableDropdownMulti = require('dropdown-base').extend({
    init: function() {
      this.selectedOptions = [];
    },

    setupUI: function(container, contentContainer, options) {
      var mainButton = container.find('.main-button').find('span')[0];
      
      this.selectedOptions = [];

      contentContainer.find('ul').selectable({
        selecting: function (event, ui) {
          var option = $(ui.selecting);
          var value = option.attr('value');

          this.selectedOptions.push(value);

          option.addClass('ui-state-highlight');
          option.removeClass('ui-state-default');          
        }.bind(this),
        unselecting: function (event, ui) {
          var option = $(ui.unselecting);
          var value = option.attr('value');

          this.selectedOptions.splice(this.selectedOptions.indexOf(value), 1);

          option.removeClass('ui-state-highlight');
          option.addClass('ui-state-default');

        }.bind(this),
        stop: function (event, ui) {
          mainButton.innerHTML = options.selectedMessage + " " + this.selectedOptions.join(', ');
          container.attr('value', this.selectedOptions.join(', '));

          this.removeMenu(contentContainer);
        }.bind(this)
      });

      this.uiContentController = this.getComponentController({
        destroy: function() {
          $(this.html).selectable('destroy');
        }
      }, contentContainer.find('ul')[0]);
    }
  });

  return EditableDropdownMulti;
});

