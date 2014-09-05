define(function(require) {
  var LabelCheckbox = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');

      var input = document.createElement('input');

      input.id = options.id;
      input.type  = 'checkbox';
      input.name  = options.label;
      input.value = options.label;

      var label = document.createElement('label');
      
      label.setAttribute('for', options.id);
      label.innerHTML = options.label;

      container.appendChild(input);
      container.appendChild(label);

      return container; 
    }
  });

  return LabelCheckbox;
});