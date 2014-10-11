define(function(require) {
  require('jquery');
  require('jquery-ui');
  
  var ScrollBar = require('class').extend({
    init: function() {},

    create: function(options) {
      var scrollbar = document.createElement('div');

      scrollbar.id = options.id;

      for (var s in options.style) {
        scrollbar.style[s] = options.style[s];  
      }

      options.change = options.onChange;

      $(scrollbar).slider(options);
      
      return scrollbar;
    }
  });

  return ScrollBar;
});