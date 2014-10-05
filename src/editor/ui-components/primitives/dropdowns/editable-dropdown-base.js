define(function(require) {
  var wrapper = require('wrap-in-div');
  var clickedOutside = require('clicked-outside');

  require('jquery');
  require('jquery-ui');

  var EditableDropdownBase = require('class').extend({
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
      
      // Add some classes for styling
      $(contentContainer).addClass('ui-corner-all');
      $(contentContainer).addClass('ui-widget-content');
      $(container).addClass('editable-drop-down');
      $(container).addClass('ui-widget');

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

    createMainUI: function(options, container, contentContainer, optionElements) {
      throw new Error('Must Override');
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

  return EditableDropdownBase;
});

