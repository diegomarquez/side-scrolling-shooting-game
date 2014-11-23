define(function(require) {  
  var toggle = require('toggle');

  var SnapToGridToggle = require('ui-component').extend({
    init: function() {},

    create: function() {
      return toggle.create({
        id: 'snap-to-grid-toggle-button',
        on: 'Turn Snap Off',
        off: 'Turn Snap On'
      });
    }
  });

  return SnapToGridToggle;
});