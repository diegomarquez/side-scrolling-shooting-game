define(function(require) {
  var checkbox = require('checkbox');
  
  var SnapToGridToggle = require('class').extend({
    init: function() {},

    create: function() {
      var snapToogleUI = new checkbox().create({
        id: 'snap-to-grid-toggle-button',
        onLabel: 'Free',
        offLabel: 'Snap To Grid' 
      });
      
      return snapToogleUI;
    }
  });

  return SnapToGridToggle;
});