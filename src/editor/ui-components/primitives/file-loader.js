define(function(require) {
  var FileLoader = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var button = document.createElement('input');

      button.id = options.id;
      button.type = 'file';
      button.innerHTML = options.label;
      
      button.onchange = options.onClick;

      return button;
    }
  });

  return FileLoader;
});