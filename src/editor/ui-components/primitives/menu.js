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
        var optionClick = currentOptions.click;

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

          $(optionsElement).on('click', function (event) {
            subMenu.attachToParent(this);
          });
        } else {
          $(optionsElement).on('click', function (click) {
            return function (event) {
              if (click) {
                click();
              }
            }
          }(optionClick));
        }

        $(list).append(optionsElement);  
      };

      var menuController = {
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

        show: function(x, y) {          
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

  return Menu;
});