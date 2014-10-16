define(function(require) {
  var FitInViewport = require('class').extend({
    init: function() {
      
    },

    fit: function(element, offset) {    
      $(element).css(offset);
            
      var boundingRect = element.getBoundingClientRect();

      if (boundingRect.bottom >= (window.innerHeight || document.documentElement.clientHeight)) {
          offset.top -= boundingRect.height;
      }
      
      if (boundingRect.right >= (window.innerWidth || document.documentElement.clientWidth)) {
          offset.left -= boundingRect.width;
      }

      $(element).css(offset);
    }
  });

  return new FitInViewport();
});