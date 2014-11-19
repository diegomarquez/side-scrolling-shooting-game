define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');

  var ColliderToggle = require('class').extend({
    init: function() {},

    create: function() {
      var input = document.createElement('input');
      input.type = 'checkbox';
      $(input).attr('editor-toggle', '');

      $(input).attr('data-on', 'Hide Colliders');
      $(input).attr('data-off', 'Show Colliders');
      
      $(input).change(function() {
        gb.toggleColliderDebug( $(this).prop('checked') );
      });
      
      return wrapper.wrap(input, {
        id: 'colliders-toggle-button'
      });
    }
  });

  return ColliderToggle;
});