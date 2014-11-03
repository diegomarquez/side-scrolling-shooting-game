define(function(require) {
  var wrapper = require('wrap-in-div');
  
  var Menu = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var list = document.createElement('ul');

      list.id = options.id;
      
      $(list).addClass('ui-widget-content');

      for (var i = 0; i < options.options.length; i++) {
        var optionsElement = document.createElement('li');

        var currentOptions = options.options[i];
        var optionText = currentOptions.name;
        var optionIcon = currentOptions.icon;
        var optionSubMenu = currentOptions.options;

        var icon = $(document.createElement('span'));
        icon.addClass('ui-icon');
        icon.addClass(optionIcon);
        
        icon.css({ 
          'float': 'left', 
          'margin-right': '3px',
          'margin-top': '-1px'
        });

        optionsElement.innerHTML = optionText;
        $(optionsElement).append(icon);

        $(optionsElement).attr('value', optionText);

        $(optionsElement).addClass('ui-state-default');
        $(optionsElement).addClass('ui-corner-all');

        $(optionsElement).on('mouseover', function() {
          $(this).addClass('ui-state-hover');
        });

        $(optionsElement).on('mouseout', function() {
          $(this).removeClass('ui-state-hover');
        });

        if (optionSubMenu) {
          var iconSubMenu = $(document.createElement('span'));
          iconSubMenu.addClass('ui-icon');
          iconSubMenu.addClass('ui-icon-triangle-1-e');

          iconSubMenu.css({ 
            'float': 'right', 
            'margin-right': '3px',
            'margin-top': '-1px'
          });

          $(optionsElement).append(iconSubMenu);

          var subMenu = this.create(currentOptions);

          $(optionsElement).on('click', function() {
            subMenu.attachToParent(this);

            // var value = $(this).attr('value');
            // var methodName = toMethodName(value);

            // if (options[methodName]) {
            //   options[methodName](value);
            // }
          });

        }

        // $(optionsElement).on('click', function() {
          // var value = $(this).attr('value');
          // var methodName = toMethodName(value);

          // if (options[methodName]) {
          //   options[methodName](value);
          // }
        // });
        // 

        $(list).append(optionsElement);  
      };

      var menuController = {
        go: null,
        subMenu: subMenu,

        html: wrapper.wrap(list, {
          classNames: ['menu', 'ui-widget']
        }),

        attachToParent: function(parent) {
          $(this.html).appendTo('body').position({
            my: 'left top',
            at: 'right+3 top-2',
            of: parent
          });
        },

        show: function(x, y, go) {
          this.go = go;
          
          var self = $(this.html);

          if (self.parent().length <= 0) {
            self.appendTo('body')
          } else {
            this.hideSubMenu();
          }

          self.offset({ 
            left: x, 
            top: y 
          });
        },

        hide: function() {
          $(this.html).detach();
          this.hideSubMenu();
        },

        hideSubMenu: function() {
          if (this.subMenu) {
            this.subMenu.hide();  
          }
        }
      }

      return menuController;
    }
  });

  var toMethodName = function(name) {
    var methodName = name.replace(/\b./g, function(m) { return m.toUpperCase(); }).replace(/ /g,'');

    return methodName.charAt(0).toUpperCase() + methodName.slice(1);
  }

  return Menu;
});