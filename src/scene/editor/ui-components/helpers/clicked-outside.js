define(function(require) {
  var ClickOutside = require('class').extend({
    init: function() {
      this.removeFunctions = {}; 
    },

    register: function(id, e, onMiss) {    
      var callback = getMouseUpCallback(e, onMiss);

      $(document).on('mouseup', callback);  

      this.removeFunctions[id] = function() {
        $(document).off('mouseup', callback);          
      }
    },

    unregister: function(id) { 
      if (!this.removeFunctions[id]) return;

      this.removeFunctions[id]();
      delete this.removeFunctions[id];
    }
  });

  var getMouseUpCallback = function(e, onMiss) {
    return function (event) {
      var element;

      if (Object.prototype.toString.call(e) == '[object Function]') {
        element = $(e());
      } else {
        element = $(e);
      }

      if (!element.is(event.target) && element.has(event.target).length === 0) {
        if (element.parent().length !== 0) {
          event.preventDefault();
          event.stopImmediatePropagation();
          
          onMiss(element);
        }
      }
    }
  }

  return new ClickOutside();
});