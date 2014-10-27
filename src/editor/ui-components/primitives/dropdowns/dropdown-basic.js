define(function(require) {
  var EditableDropdownBase = require('dropdown-base').extend({
    init: function() {
      this.selectedOptions = [];
    },

    setupUI: function(contentContainer, options) {
      var mainButton = contentContainer.parent().find('.main-button').find('span')[0];
      var container = contentContainer.parent();

      contentContainer.selectable({
      	selecting: function (event, ui) {
      		var option = $(ui.selecting);
      		var value = option.attr('value');

			this.selectedOptions.push(value);
			mainButton.innerHTML = options.selectedMessage + " " + this.selectedOptions.join(', ');

			$(container).attr('value', this.selectedOptions.join(', '));

			option.addClass('ui-state-highlight');
			option.removeClass('ui-state-default');
      	}.bind(this),
      	unselecting: function(event, ui) {
      		var option = $(ui.unselecting);
      		var value = option.attr('value');

			this.selectedOptions.splice(this.selectedOptions.indexOf(value), 1);
			mainButton.innerHTML = options.selectedMessage + " " + this.selectedOptions.join(', ');

			$(container).attr('value', this.selectedOptions.join(', '));

			option.removeClass('ui-state-highlight');
			option.addClass('ui-state-default');
      	}.bind(this)
      });
    }
  });

  return EditableDropdownBase;
});

