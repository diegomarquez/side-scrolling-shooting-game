define(function(require) {
  var wrapper = require('wrap-in-div');

  var EditableDropdownRemove = require('editable-dropdown-basic').extend({
    init: function() {

    },

    setupUI: function(element, options) {
      var oldIndex;
      var newIndex;

      element.sortable({
        placeholder: 'ui-state-highlight',
        items: 'li:not(.ui-state-disabled)',
        cursor: 'move', 
        handle: '.handle',
        delay: 15,

        start: function (event, ui) {
          oldIndex = ui.item.index();
          ui.placeholder.height(ui.item.height());
        },

        update: function (event, ui) {
          if (options.onEdit) {
            newIndex = ui.item.index();
            options.onEdit(ui.item.attr('value'), newIndex, oldIndex);
          }
        }
      }).disableSelection();
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
        option.append(wrapper.wrap(button[0]));

        optionElements.push(option[0]);
      }

      return optionElements;
    },

    setupOptionEvents: function(optionElements, container, contentContainer, options) {
      this._super(optionElements, container, contentContainer, options);

      for (var i = 0; i < optionElements.length; i++) {
        var option = $(optionElements[i]);
        var button = option.find('button').button();

        button.click(function (option) {
          return function (event) {
            if (options.onRemove) {
              options.onRemove($(event.target).parent().attr('value'));

              option.remove();
              $(contentContainer).remove();
            }
          } 
        }(option));        
      }
    } 
  });

  return EditableDropdownRemove;
});

