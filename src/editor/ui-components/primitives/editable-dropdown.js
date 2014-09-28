define(function(require) {
  var wrapper = require('wrap-in-div');
  var buttonUI = require('button');
  var clickedOutside = require('clicked-outside');
  var mouseCoordinates = require('mouse-coordinates');
  var fitInViewport = require('fit-in-viewport');

  require('jquery');
  require('jquery-ui');

  var EditableDropdown = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var button = new buttonUI().create({
        label: options.defaultMessage,
        onClick: function(event) {
          $(container).append(list);

          setupSortable($(list), options);
          setupOptionEvents(optionElements, container, button, list, options);
          
          fitInViewport.fit(list, mouseCoordinates.get(event));
        }
      });

      $(button).button({
        icons: {
          secondary: 'ui-icon-triangle-2-n-s'
        }
      });

      var list = document.createElement('ul');

      $(list).addClass('ui-corner-all');
      $(list).addClass('ui-widget-content');

      var optionElements = [];
      optionElements = createOptions(options);

      $(list).append(optionElements);      

      var container = wrapper.wrap([button], {
        id: options.id
      });

      $(container).addClass('editable-drop-down');
      $(container).addClass('ui-widget');

      clickedOutside.registerMissedClick(list, function (element) {
        element.remove();
      });

      return container;
    },

    setupSortable: function(element, options) {
      var oldIndex;
      var newIndex;

      element.sortable({
        placeholder: 'ui-state-highlight',
        items: 'li:not(.ui-state-disabled)',
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

    createOptions: function(options) {

    },

    setupOptionEvents: function(optionElements, container, button, list, options) {

    },


  });

  var setupSortable = function(element, options) {
  }

  var createOptions = function(options) {
    var optionElements = [];

    for (var i = 0; i < options.data.length; i++) {
      var option = $(document.createElement('li'));
      
      if (options.disabledItems.indexOf(options.data[i]) == -1) {
        option.addClass('ui-state-default');
      } else {
        option.addClass('ui-state-disabled');
      }
      
      option.addClass('ui-corner-all');
      option.attr('value', options.data[i]);
      option.html(options.data[i]);
    
      optionElements.push(option[0]);
    }

    return optionElements;
  }

  var setupOptionEvents = function(optionElements, container, button, list, options) {
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
        $(list).remove();

        if (options.onSelect) {
          options.onSelect($(this).attr('value'));
        }
      });
    }
  }

  return EditableDropdown;
});

