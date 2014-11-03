define(function(require) {
  var wrapper = require('wrap-in-div');
  
  var Menu = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var menu = createMenu.call(this, options, function() {
        return menuController;
      });

      var menuController = {
        subMenues: menu.subMenues,
        parentMenu: null,
        dynamic: false,

        html: wrapper.wrap(menu.list, {
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
            this.hideSubMenues();
          }

          self.offset({ 
            left: x, 
            top: y 
          });
        },

        hide: function() {
          this.hideSubMenues();

          if (this.dynamic) {
            $(this.html).remove();
            this.parentMenu.removeSubMenu(this);
          } else {
            $(this.html).detach();
          }
        },

        hideSubMenues: function() {
          if (this.subMenues) {
            for (var i = 0; i < this.subMenues.length; i++) {
              if (this.subMenues[i]) {
                this.subMenues[i].hide();  
              }
            }
          }
        },

        hideParentMenu: function() {
          if (this.parentMenu) {
            this.parentMenu.hide();  
          }
        },

        removeSubMenu: function(subMenu) {
          this.subMenues.splice(this.subMenues.indexOf(subMenu), 1);
        }
      }

      return menuController;
    }
  });

  var createMenu = function(options, getMenuController) {
    var list = document.createElement('ul');

    if (options.id) {
      list.id = options.id;
    }
    
    $(list).addClass('ui-widget-content');

    var result = {};

    if (Object.prototype.toString.call(options.options) == '[object Function]') {
      // If the options property is a function, wait till the menu has to appear to create it
      result = createDynamicMenu.call(this, options, getMenuController); 
    } else {
      // If the options property is an object, create the menu now
      result = createStaticMenu.call(this, options, getMenuController);
    }

    $(list).append(result.elements);

    return {
      list: list,
      subMenues: result.subMenues.filter(function(subMenu) {
        return subMenu;
      })
    };
  }

  var createDynamicMenu = function (options, getMenuController) {
    var elements = [];
    var subMenues = [];

    var dynamicOptions = options.options();

    for (var i = 0; i < dynamicOptions.length; i++) {
      var optionsElement = document.createElement('li');

      var currentOptions = dynamicOptions[i];

      setupMenuEntry.call(this, optionsElement, currentOptions);

      if (!currentOptions.disable) {
        if (currentOptions.options) {
          var subMenu = setupSubMenuEntryClick.call(this, optionsElement, currentOptions, getMenuController);

          subMenues.push(subMenu);
        } else {
          setupMenuEntryClick.call(this, optionsElement, currentOptions.click, getMenuController);
        }
      }

      elements.push(optionsElement);
    }

    return  {
      elements: elements,
      subMenues: subMenues
    };
  };

  var createStaticMenu = function (options, getMenuController) {
    var elements = [];
    var subMenues = [];

    for (var i = 0; i < options.options.length; i++) {
      var optionsElement = document.createElement('li');

      var currentOptions = options.options[i];

      setupMenuEntry.call(this, optionsElement, currentOptions);

      if (!currentOptions.disable) {
        if (currentOptions.options) {
          var subMenu = setupSubMenuEntryClick.call(this, optionsElement, currentOptions, getMenuController);

          subMenues.push(subMenu);
        } else {
          setupMenuEntryClick.call(this, optionsElement, currentOptions.click, getMenuController);
        }
      }

      elements.push(optionsElement);
    }

    return  {
      elements: elements,
      subMenues: subMenues
    };
  };

  var setupMenuEntry = function (optionsElement, options) {
    var optionText = options.name;
    var optionIcon = options.icon;
    
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

    $(optionsElement).addClass('ui-corner-all');

    if (options.disable) {
      $(optionsElement).addClass('ui-state-disabled');
      $(optionsElement).addClass('ui-state-default');
    } else {
      $(optionsElement).addClass('ui-state-default');

      $(optionsElement).on('mouseover', function() {
        $(this).addClass('ui-state-hover');
      });

      $(optionsElement).on('mouseout', function() {
        $(this).removeClass('ui-state-hover');
      });
    }
  };

  var setupSubMenuEntryClick = function(optionsElement, options, getMenuController) {
    var iconSubMenu = $(document.createElement('span'));
    iconSubMenu.addClass('ui-icon');
    iconSubMenu.addClass('ui-icon-triangle-1-e');

    iconSubMenu.css({ 
      'float': 'right', 
      'margin-right': '3px',
      'margin-top': '-1px'
    });

    $(optionsElement).append(iconSubMenu);

    var subMenu = null;

    var self = this;

    if (Object.prototype.toString.call(options.options) == '[object Function]') {
      $(optionsElement).on('click', function (event) {
        var controller = getMenuController();
        
        var dynamicSubMenu = self.create(options);        
        dynamicSubMenu.dynamic = true;
        controller.subMenues.push(dynamicSubMenu);

        dynamicSubMenu.attachToParent(this);
        dynamicSubMenu.parentMenu = getMenuController();
      });
    } else {
      subMenu = this.create(options);

      subMenu.dynamic = false;

      $(optionsElement).on('click', function (event) {
        subMenu.attachToParent(this);
        subMenu.parentMenu = getMenuController();
      });
    }

    return subMenu;
  };

  var setupMenuEntryClick = function(optionsElement, click, getMenuController) {
    $(optionsElement).on('click', function (event) {
      if (click) {
        click($(this).attr('value'));
      }
      
      getMenuController().hide();
      getMenuController().hideParentMenu();
    });
  };

  return Menu;
});