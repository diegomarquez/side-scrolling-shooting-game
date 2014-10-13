define(function(require) {
  require('jquery');
  require('jquery-ui');
  
  var ScrollBar = require('class').extend({
    init: function() {},

    create: function(optionsGetter) {
      var options = getOptions(optionsGetter);

      var scrollbar = document.createElement('div');

      scrollbar.id = options.id;

      for (var s in options.style) {
        scrollbar.style[s] = options.style[s];  
      }

      setEvents(scrollbar, options);

      // Create Jquery UI slider
      $(scrollbar).slider(options);

      // Initial adjustment of handle
      adjustHandle($(scrollbar).find('.ui-slider-handle'), options, options);

      return {
        html: scrollbar,
        refresh: function() {
          var options = getOptions(optionsGetter);

          setEvents(scrollbar, options);

          // Refresh the slider
          $(scrollbar).slider(options);
          // Adjust handle position if neccesary
          adjustHandle($(scrollbar).find('.ui-slider-handle'), options, options);
        }
      };
    }
  });
  
  var setEvents = function(scrollbar, options) {
    options.change = function(event, ui) {
      if (options.onChange) {
        options.onChange(event, ui);  
      }
    }

    options.slide = function(event, ui) {
      if (options.onSlide) {
        // Prevent handle from going outside the scrollbar
        adjustHandle($(scrollbar).find('.ui-slider-handle'), ui, options);
        options.onSlide(event, ui);

        // Store the current value
        options['value'] = $(scrollbar).slider('value');
      }
    }
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

  var adjustHandle = function(handle, ui, options) {
    if (options.orientation == 'vertical') {
      positionHandleVertically(handle, ui, options);
    }

    if (options.orientation == 'horizontal') {
      positionHandleHorizontally(handle, ui, options);
    }
  }

  var positionHandleVertically = function(handle, ui, options) {
    if (ui.value >= options.max) {
      handle.css('top', 0); 
    } else {
      handle.css('top', 'auto'); 
    }
  }

  var positionHandleHorizontally = function(handle, ui, options) {
    if (ui.value >= options.max) {
      handle.css('margin-left', -handle.width()-2); 
    } else {
      handle.css('margin-left', 'auto'); 
    }
  }

  return ScrollBar;
});