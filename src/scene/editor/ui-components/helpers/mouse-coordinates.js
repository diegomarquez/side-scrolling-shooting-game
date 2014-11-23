define(function(require) {
  var MouseCoordinates = require('class').extend({
    init: function() {
      
    },

    get: function(e) {    
      var posx, posy;

      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      }
      else if (e.clientX || e.clientY)  {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      var parentOffset = $(e.target).parent().offset(); 
      
      var relX = posx - parentOffset.left;
      var relY = posy - parentOffset.top;

      var globalX = parentOffset.left + relX;
      var globalY = parentOffset.top + relY;

      return {
        top: relY, 
        left: relX,
        globalX: globalX,
        globalY: globalY
      };
    }
  });


  return new MouseCoordinates();
});