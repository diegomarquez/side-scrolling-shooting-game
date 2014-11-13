define(function(require) {

  var wrapper = require('wrap-in-div');

  var gridToggleUI = require('grid-toggle-ui');
  var snapToggleUI = require('snap-to-grid-toggle-ui');

  var GridControls = require('class').extend({
    init: function() {
      
    },

    create: function() {
      var grid = new gridToggleUI().create();
      var snap = new snapToggleUI().create();
      
      var label = document.createElement('label');
      label.innerHTML = 'Grid Controls';

      return wrapper.wrap([label, grid, snap], {
        id: 'grid-control-buttons',
        classNames: ['well', 'well-small']
      });
    }
  });
  
  return GridControls;
});