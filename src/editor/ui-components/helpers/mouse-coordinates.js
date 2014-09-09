define(function(require) {
  
  require('jquery');

  var MouseCoordinates = require('class').extend({
    init: function() {
      
    },

    get: function(e) {    
      var posx = 0;
      var posy = 0;

      if (!e) 
        var e = window.event;
      
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      }
      else if (e.clientX || e.clientY)  {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      
      return {top: posy, left:posx};
    }
  });


  return new MouseCoordinates();
});