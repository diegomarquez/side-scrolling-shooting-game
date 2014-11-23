define(function(require) {
  var FitInViewport = require('class').extend({
    init: function() {
      
    },

    fit: function(element, offset) {    
      var o = {
        left: offset.globalX,
        top: offset.globalY
      };

      $(element).css(o);

      var boundingRect = element.getBoundingClientRect();

      if (boundingRect.bottom >= (window.innerHeight || document.documentElement.clientHeight)) {
          o.top -= boundingRect.height;
      }
      
      if (boundingRect.right >= (window.innerWidth || document.documentElement.clientWidth)) {
          o.left -= boundingRect.width;
      }

      $(element).css(o);
    }
  });

  return new FitInViewport();
});