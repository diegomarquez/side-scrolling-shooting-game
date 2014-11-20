define(function(require) {
  var toggle = require('toggle');
  var gb = require('gb');

  var BoundingBoxesToggle = require('class').extend({
    init: function() {},

    create: function() {
      return toggle.create({
        id: 'bounding-box-toggle-button',
        on: 'Hide Bounding Boxes',
        off: 'Show Bounding Boxes',
        onChange: function() {
          gb.toggleRendererDebug( $(this).prop('checked') );
        }
      });
    }
  });

  return BoundingBoxesToggle;
});