define(function(require) {
  require('jquery');
  require('jquery-ui');
  
  var ScrollBar = require('class').extend({
    init: function() {},

    create: function(optionsGetter) {
      // Get initialization Options
      var creationOptions = getOptions(optionsGetter);
      // This object holds the current options object after each refresh
      // Initially it is the same as creationOptions
      var currentOptions = creationOptions;

      // Create DOM element that the slider widget will use
      var scrollbar = document.createElement('div');
      if (creationOptions.id) {
        scrollbar.id = creationOptions.id;
      }

      // Assign styles
      if (creationOptions.style) {
        for (var s in creationOptions.style) {
          scrollbar.style[s] = creationOptions.style[s];  
        }
      }

      initScrollBar(scrollbar, creationOptions);

      return {
        html: scrollbar,
        refresh: function() {
          var refreshOptions = getOptions(optionsGetter);

          // Keep the current slider value before refreshing on a verticla slider         
          if (refreshOptions.orientation == 'vertical') {
            if (currentOptions['value'] == refreshOptions['max']) {
              // At the top of the scrollbar... 
              // stay at the top when there is a refresh
              refreshOptions['value'] = refreshOptions['max'];
            } 
            else if (currentOptions['value'] == 0) {
              // At the bottom of the scrollbar...
              if (currentOptions.contentHeight < refreshOptions.contentHeight) {
                // Place the handle at a step distance from the bottom if the content increases in size
                refreshOptions['value'] = refreshOptions['step'];
              } else {
                //Place the handle at the bottom if the content decreases in size
                refreshOptions['value'] = 0;
              }
            }
            else {
              // In every other case, calculate the position of the handle
              refreshOptions['value'] = refreshOptions['max'] - (currentOptions['max'] - currentOptions['value']);
            }
          } 

          // Keep the current slider value before refreshing on a horizontal slider
          if (refreshOptions.orientation == 'horizontal') {
            if (currentOptions['value'] <= refreshOptions['max']) {
              refreshOptions['value'] = currentOptions['value'];
            } else {
              refreshOptions['value'] = refreshOptions['max'];
            }
          }

          currentOptions = refreshOptions;

          initScrollBar(scrollbar, refreshOptions);
        }
      };
    }
  });
  
  var setEvents = function(options) {
    options.change = function(event, ui) {
      onValueChange(event, ui, options);
      
      if (options.onChange) {
        options.onChange(event, ui);   
      }
    }

    options.slide = function(event, ui) {
      onValueChange(event, ui, options);
      
      if (options.onSlide) {
        options.onSlide(event, ui);
      }
    }
  }

  var onValueChange = function(event, ui, options) {
    // Prevent handle from going outside the scrollbar
    adjustHandle($(event.target), ui, options);
    // Store the current value
    options['value'] = ui.value;
  }

  var initScrollBar = function(scrollbar, options) {
    // Setup events
    setEvents(options);
    // Refresh the slider
    $(scrollbar).slider(options);
    // Adjust handle position if neccesary
    adjustHandle($(scrollbar), options, options);
  }

  var getOptions = function(optionsGetter) {
    var result = optionsGetter();
    setState(result);
    return result;
  }

  var setState = function(options) {
    if (options.orientation == 'vertical') {
      options.disabled = options.contentHeight <= options.height ? true : false;
    } else {
      options.disabled = options.contentWidth <= options.width ? true : false;
    }
  }

  var adjustHandle = function(scrollbar, ui, options) {
    var handle = scrollbar.find('.ui-slider-handle');

    if (options.orientation == 'vertical') {
      positionHandleVertically(handle, ui, options);
    }

    if (options.orientation == 'horizontal') {
      positionHandleHorizontally(handle, ui, options);
    }
  }

  var positionHandleVertically = function(handle, ui, options) {
    if (limit(ui.value, options.max)) {
      handle.css('top', 0); 
    } else {
      handle.css('top', 'auto'); 
    }
  }

  var positionHandleHorizontally = function(handle, ui, options) {
    if (limit(ui.value, options.max)) {
      if (sameInCero(ui.value, options.max)) {
        handle.css('margin-left', 'auto');
      } else {
        handle.css('margin-left', -handle.width()-2);  
      }
    } else {
      handle.css('margin-left', 'auto'); 
    }
  }

  var limit = function(first, second) {
    return Math.floor(first) >= Math.floor(second);
  }

  var sameInCero = function(first, second) {
    return first == 0 && second == 0;
  }

  return ScrollBar;
});