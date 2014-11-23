define(function(require) {
  var wrapper = require('wrap-in-div');

  var gridToggleUI = require('grid-toggle-ui');
  var snapToggleUI = require('snap-to-grid-toggle-ui');

  var GridControls = require('ui-component').extend({
    init: function() {
      this.grid = null;
      this.snap = null;
    },

    create: function() {
      this.grid = new gridToggleUI().create();
      this.snap = new snapToggleUI().create();
      
      var label = document.createElement('label');
      label.innerHTML = 'Grid Controls';

      return wrapper.wrap([label, this.grid, this.snap], {
        id: 'grid-control-buttons',
        classNames: ['well', 'well-small']
      });
    }
  });
  
  return GridControls;
});