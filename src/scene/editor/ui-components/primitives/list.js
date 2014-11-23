define(function(require) {
  var List = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var list = document.createElement('ul');

      list.id = options.id;
  
      $(list).addClass('unordered-list');
      $(list).addClass(toClassNameString(options.classNames));

      for (var i = 0; i < options.items.length; i++) {
        var item = options.items[i];

        var listItem = document.createElement('li');

        $(listItem).addClass('unordered-list-item');
        $(listItem).addClass(toClassNameString(item.classNames));
        listItem.innerHTML = item.content;

        $(list).append(listItem);
      }

      return {
        html: list
      }
    }
  });

  var toClassNameString = function(args) {
    if (!args) 
      return '';

    if (Object.prototype.toString.call(args) == '[object Array]') {
      return args.join(' ');
    } else {
      return args;
    }
  }

  return List;
});