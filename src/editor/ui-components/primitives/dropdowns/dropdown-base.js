define(function(require) {
  var wrapper = require('wrap-in-div');
  var clickedOutside = require('clicked-outside');
  var buttonUI = require('button');
  var mouseCoordinates = require('mouse-coordinates');
  var fitInViewport = require('fit-in-viewport');

  var Dropdown = require('class').extend({
    init: function() {

    },

    create: function(options) {
      // Methods to get the parts of the UI in child classes
      this.getOptions = function() { return options; }
      this.getContainer = function() { return container; }
      this.getContentContainer = function() { return contentContainer; }
      this.getOptionElements = function() { return optionElements; }
      this.getMainUI = function() { return mainUI; }
      
      // Create the main components
      var mainUI = this.createMainUI(this.getOptions, this.getContainer, this.getContentContainer, function() { return this.getOptionElements(); }.bind(this));
      var contentContainer = this.createContentContainer();
      var optionElements = this.createOptions(options);      
      var container = wrapper.wrap(mainUI, { id: options.id });
      
      // Append the options to the popup menu
      this.appendContentToContainer(contentContainer, optionElements);
      // Add styling classes
      this.addStyles($(container), $(contentContainer));

      // Register event to know when to hide the popup menu
      clickedOutside.registerMissedClick(contentContainer, function (element) {
        element.remove();
      });

      return {
        html: container,
        refresh: function() { 
          this.refreshContent(); 
        }.bind(this)
      }
    },

    setupUI: function(contentContainer, options) {
      throw new Error('Must Override');
    },

    createMainUI: function(options, container, contentContainer, optionElements) {
      var button = new buttonUI().create({
        label: options().defaultMessage,
        
        onClick: function(event) {
          $(container()).append(contentContainer());

          this.setupUI($(contentContainer()), options());
          this.setupOptionEvents(optionElements(), container(), contentContainer(), options());
   
          fitInViewport.fit(contentContainer(), mouseCoordinates.get(event));
        }.bind(this)
      });

      $(button).button().addClass('main-button');

      return button;
    },

    addStyles: function(container, contentContainer) {
      $(contentContainer).addClass('ui-corner-all');
      $(contentContainer).addClass('ui-widget-content');
      $(container).addClass('drop-down');
      $(container).addClass('ui-widget');
    },

    createContentContainer: function() {
      return document.createElement('ul');
    },

    appendContentToContainer: function(contentContainer, contentElements) {
      $(contentContainer).append(contentElements);
    },

    createOptions: function(options) {
      var optionElements = [];

      var data = options.data();

      for (var i = 0; i < data.length; i++) {
        var option = $(document.createElement('li'));
        
        this.setOptionState(option, data[i], options);

        option.addClass('ui-corner-all');
        option.attr('value', data[i]);
        option.html(data[i]);
      
        optionElements.push(option[0]);
      }

      return optionElements;
    },

    setupOptionEvents: function(optionElements, container, contentContainer, options) {
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

          if (!options.multiSelect) {
            $(contentContainer).remove();
          }

          if (options.onSelect) {
            options.onSelect($(this).attr('value'));
          }
        });
      }
    },

    setOptionState: function (element, data, options) {
      element.removeClass('ui-state-highlight');

      if (options.disabledItems) {
        if (options.disabledItems.indexOf(data) == -1) {
          element.addClass('ui-state-default');
        } else {
          element.addClass('ui-state-disabled');
        }
      } else {
        element.addClass('ui-state-default');
      }
    },

    refreshContent: function () {
      // Get the options
      var options = this.getOptions();
      // Get the content container
      var contentContainer = this.getContentContainer();
      // Create the option elements
      var optionElements = this.createOptions(options);
      // Override the getOptionElements method
      this.getOptionElements = function() { 
        return optionElements; 
      }
      // Clear the current options
      $(contentContainer).empty();
      // Append the new options to the content container
      this.appendContentToContainer(contentContainer, optionElements);
    }
  });

  return Dropdown;
});

