define(function(require) {
  var MouseCoordinates = require('class').extend({
    init: function() {
      
    },

    get: function(e) {    
      var parentOffset = $(e.target).parent().offset(); 
      var relX = e.pageX - parentOffset.left;
      var relY = e.pageY - parentOffset.top;

      return {top: relY, left:relX};
    }
  });


  return new MouseCoordinates();
});