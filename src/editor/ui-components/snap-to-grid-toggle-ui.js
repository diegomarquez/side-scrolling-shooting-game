define(function(require) {  
  var wrapper = require('wrap-in-div');

  var SnapToGridToggle = require('class').extend({
    init: function() {},

    create: function() {
      var input = document.createElement('input');
      input.type = 'checkbox';
      $(input).attr('editor-toggle', '');

      $(input).attr('data-on', 'Turn Snap Off');
      $(input).attr('data-off', 'Turn Snap On');

      return wrapper.wrap(input, {
        id: 'snap-to-grid-toggle-button'
      });

      return input;
    }
  });

  return SnapToGridToggle;
});