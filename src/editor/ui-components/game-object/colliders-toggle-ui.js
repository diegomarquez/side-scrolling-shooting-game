define(function(require) {
  var toggle = require('toggle');
  var gb = require('gb');

  var CollidersToggle = require('class').extend({
    init: function() {},

    create: function() {
      return toggle.create({
        id: 'colliders-toggle-button',
        on: 'Hide Colliders',
        off: 'Show Colliders',
        onChange: function() {
          gb.toggleColliderDebug( $(this).prop('checked') );
        }
      });
    }
  });

  return CollidersToggle;
});