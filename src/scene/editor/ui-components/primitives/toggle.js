define(function(require) {
  var wrapper = require('wrap-in-div');
  
  var Toggle = require('class').extend({
    init: function() {},

    create: function(options) {
      var input = document.createElement('input');
      input.type = 'checkbox';
      $(input).attr('editor-toggle', '');

      $(input).attr('data-on', options.on);
      $(input).attr('data-off', options.off);
      
      $(input).change(options.onChange);
      
      return wrapper.wrap(input, {
        id: options.id,
        classNames: ['editor-toggle']
      });
    }
  });

  return new Toggle();
});