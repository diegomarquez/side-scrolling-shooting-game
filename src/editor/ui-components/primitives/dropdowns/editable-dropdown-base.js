define(function(require) {
  var wrapper = require('wrap-in-div');
  var buttonUI = require('button');
  var clickedOutside = require('clicked-outside');
  var mouseCoordinates = require('mouse-coordinates');
  var fitInViewport = require('fit-in-viewport');

  require('jquery');
  require('jquery-ui');

  var EditableDropdownBase = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var button = new buttonUI().create({
        label: options.defaultMessage,
        onClick: function(event) {
          $(container).append(contentContainer);

          this.setupSortable($(contentContainer), options);
          this.setupOptionEvents(optionElements, container, button, contentContainer, options);
          
          fitInViewport.fit(contentContainer, mouseCoordinates.get(event));
        }.bind(this)
      });

      $(button).button({
        icons: {
          secondary: 'ui-icon-triangle-2-n-s'
        }
      });

      var contentContainer = this.createContentContainer();

      $(contentContainer).addClass('ui-corner-all');
      $(contentContainer).addClass('ui-widget');

      var optionElements = this.createOptions(options);

      this.appendContentToContainer(contentContainer, optionElements);      

      var container = wrapper.wrap([button], { id: options.id });

      $(container).addClass('editable-drop-down');
      $(container).addClass('ui-widget');

      clickedOutside.registerMissedClick(contentContainer, function (element) {
        element.remove();
      });

      return container;
    },

    createContentContainer: function() {
      throw new Error('Must Override');
    },

    appendContentToContainer: function(contentContainer, contentElements) {
      throw new Error('Must Override');
    },

    createOptions: function(options) {
      throw new Error('Must Override');
    },

    setupOptionEvents: function(optionElements, container, button, contentContainer, options) {
      throw new Error('Must Override');
    },

    setupSortable: function (element, options) {
      throw new Error('Must Override');
    }
  });

  return EditableDropdownBase;
});

