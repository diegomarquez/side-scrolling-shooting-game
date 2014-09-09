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
          setupOptionEvents(optionElements, button, list, options);
          
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
      optionElements = createOptions(options.data);

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
    }
  });

  var setupSortable = function(element, options) {
    var oldIndex;
    var newIndex;

    element.sortable({
      placeholder: "ui-state-highlight",
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
  }

  var createOptions = function(data) {
    var options = [];

    for (var i = 0; i < data.length; i++) {
      var option = $(document.createElement('li'));

      option.addClass('ui-state-default');
      option.addClass('ui-corner-all');

      option.attr('value', data[i]);

      option.html(data[i]);
      
      options.push(option[0]);
    }

    return options
  }

  var setupOptionEvents = function(optionElements, button, list, options) {
    for (var i = 0; i < optionElements.length; i++) {
      var option = optionElements[i];

      $(option).on('mouseover', function() {
        $(this).addClass('ui-state-hover');
      });

      $(option).on('mouseout', function() {
        $(this).removeClass('ui-state-hover');
      });

      $(option).on('click', function() {
        $(button).find('span')[0].innerHTML = options.selectedMessage + " " + $(this).attr('value');
        $(this).removeClass('ui-state-hover');
        $(list).remove();

        if (options.onSelect) {
          options.onSelect($(this).attr('value'));
        }
      });
    }
  }

  return EditableDropdown;
});

