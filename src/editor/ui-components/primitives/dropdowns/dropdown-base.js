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
      var mainUI = this.createMainUI(
        function() { return this.getOptions(); }.bind(this),
        function() { return this.getContainer(); }.bind(this),
        function() { return this.getContentContainer(); }.bind(this),
        function() { return this.getOptionElements(); }.bind(this)
      );

      var container = wrapper.wrap(mainUI, { 
        id: options.id 
      });

      var contentContainer = this.createContentContainer();
      var optionElements = this.createOptions(options);      
      
      // Append the options to the popup menu
      this.appendContentToContainer(contentContainer, optionElements);
      // Add styling classes
      this.addStyles($(container));

      // Register event to know when to hide the popup menu
      clickedOutside.registerMissedClick(function() { return this.getContentContainer(); }.bind(this), function (element) {
        this.removeMenu(element);
      }.bind(this));

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
          $('body').append(contentContainer());

          this.setupUI($(container()), $(contentContainer()), options());
          this.setupOptionEvents(optionElements(), container(), contentContainer(), options());
   
          fitInViewport.fit(contentContainer(), mouseCoordinates.get(event));
        }.bind(this)
      });

      $(button).button().addClass('main-button');

      return button;
    },

    addStyles: function(container) {      
      $(container).addClass('drop-down');
      $(container).addClass('ui-widget');
    },

    createContentContainer: function() {
      var ul = document.createElement('ul');
      $(ul).addClass('ui-widget-content');

      return wrapper.wrap(ul, {
        classNames: ['ui-corner-all', 'drop-down-menu', 'ui-widget']
      });
    },

    appendContentToContainer: function(contentContainer, contentElements) {
      $(contentContainer).find('ul').append(contentElements);
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
      }
    },

    setOptionState: function (element, data, options) {
      $(element).removeClass('ui-state-highlight');

      if (options.disabledItems) {
        if (options.disabledItems.indexOf(data) == -1) {
          $(element).addClass('ui-state-default');
        } else {
          $(element).addClass('ui-state-disabled');
        }
      } else {
        $(element).addClass('ui-state-default');
      }
    },

    removeMenu: function(element) {
      $(element).remove();
      this.resetContentState();
    },

    resetContentState: function() {
      // Get the options
      var options = this.getOptions();
      // Get the option elements
      var optionElements = this.getOptionElements();

      // Reset the state of all the elements
      for (var i = 0; i < optionElements.length; i++) {
        this.setOptionState(optionElements[i], options.data()[i], options);
      }
    },

    refreshContent: function () {
      // Get the content container
      var contentContainer = this.createContentContainer();
      // Create the option elements
      var optionElements = this.createOptions(this.getOptions());
      
      // Override the getContentContainer method
      this.getContentContainer = function() { 
        return contentContainer; 
      }
      // Override the getOptionElements method
      this.getOptionElements = function() { 
        return optionElements; 
      }

      // Append the new options to the content container
      this.appendContentToContainer(contentContainer, optionElements);
    }
  });

  return Dropdown;
});

