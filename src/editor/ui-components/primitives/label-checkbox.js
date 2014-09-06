define(function(require) {
  var wrapper = require('wrap-in-div');
  var uid = require('uid');

  var LabelCheckbox = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var input = document.createElement('input');

      var id = options.id + '-' + uid.get();

      input.type  = 'checkbox';
      input.id = id;
      input.name  = options.label;
      input.value = options.label;

      input.onchange = options.onChange;

      var label = document.createElement('label');
      
      label.setAttribute('for', id);
      label.innerHTML = options.label;

      return wrapper.wrap([input, label], {id: options.id}); 
    }
  });

  return LabelCheckbox;
});