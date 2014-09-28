define(function(require) {
  var EditableDropdownRemove = require('editable-dropdown-base').extend({
    init: function() {

    },

    setupSortable: function(element, options) {
      var oldIndex;
      var newIndex;

      element.sortable({
        placeholder: 'ui-state-highlight',
        items: 'tr:not(.ui-state-disabled)',
        cursor: 'move', 
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

    createContentContainer: function() {
      var table = document.createElement('table');
      $(table).append(document.createElement('tbody'));

      return $(table)[0];
    },

    appendContentToContainer: function(contentContainer, contentElements) {
      $(contentContainer).find('tbody').append(contentElements);
    },

    createOptions: function(options) {
      var optionElements = [];

      for (var i = 0; i < options.data.length; i++) {
        var option = $(document.createElement('tr'));        
        var value = $(document.createElement('td'));
        
        var remove = $(document.createElement('td'));
        var button = $(document.createElement('button'))

        value.html(options.data[i]);
        button.html('Remove');
        remove.append(button);

        if (options.disabledItems.indexOf(options.data[i]) == -1) {
          option.addClass('ui-state-default');
        } else {
          option.addClass('ui-state-disabled');
        }
        
        option.addClass('ui-corner-all');
        option.attr('value', options.data[i]);
        
        option.append(value);
        option.append(remove);
      
        optionElements.push(option[0]);
      }

      return optionElements;
    },

    setupOptionEvents: function(optionElements, container, button, contentContainer, options) {
      for (var i = 0; i < optionElements.length; i++) {
        var option = optionElements[i];

        if (!$(option).hasClass('ui-state-default')) {
          continue;
        }

        $(option).on('mouseover', function() {
          $(this).addClass('ui-state-hover');
        });

        $(option).on('mouseout', function() {
          $(this).removeClass('ui-state-hover');
        });

        $(option).on('click', function() {
          $(this).removeClass('ui-state-hover');

          $(container).attr('value', $(this).attr('value'));
          $(button).find('span')[0].innerHTML = options.selectedMessage + " " + $(this).attr('value');
          $(contentContainer).remove();

          if (options.onSelect) {
            options.onSelect($(this).attr('value'));
          }
        });
      }
    } 
  });

  return EditableDropdownRemove;
});

