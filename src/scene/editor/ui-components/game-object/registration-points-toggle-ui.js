define(function(require) {
  var toggle = require('toggle');
  var gb = require('gb');

  var RegistrationPointsToggle = require('ui-component').extend({
    init: function() {},

    create: function() {
      return toggle.create({
        id: 'registration-point-toggle-button',
        on: 'Hide Centers',
        off: 'Show Centers',
        onChange: function() {
          gb.toggleGameObjectDebug( $(this).prop('checked') );
        }
      });
    }
  });

  return RegistrationPointsToggle;
});