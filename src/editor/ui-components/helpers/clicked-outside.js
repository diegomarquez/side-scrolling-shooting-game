define(function(require) {
  
  require('jquery');

  var ClickOutside = require('class').extend({
    init: function() {
      this.callbacks = [];
    },

    registerMissedClick: function(e, onMiss) {    
      $(document).on('mouseup', function (event) {
          var element = $(e);

          if (!element.is(event.target) && element.has(event.target).length === 0) {
            if (element.parent().length !== 0) {
              event.preventDefault();
              event.stopImmediatePropagation();
              
              onMiss(element);
            }
          }
      });  
    }
  });


  return new ClickOutside();
});