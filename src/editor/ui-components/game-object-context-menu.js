define(function(require) {
  var gb = require('gb');
  var editorConfig = require('editor-config');

  var menu = require('menu');

  var GameObjectContextMenu = require('class').extend({
    init: function() {

    },

    create: function() {
      var contextMenu = (new menu()).create({
        id: 'game-object-context-menu',
        options: [
          {
            name: 'Clone',
            icon: 'ui-icon-copy',
            click: function() {

            }
          },
          {
            name: 'Viewports',
            icon: 'ui-icon-wrench',

            options: [
              {
                name: 'Add',
                icon: 'ui-icon-plusthick',
                data: function() {

                },
                click: function() {
              
                }
              },
              {
                name: 'Remove from current',
                icon: 'ui-icon-minusthick',
                click: function() {
              
                }
              },
              {
                name: 'Remove from all',
                icon: 'ui-icon-trash',
                click: function() {
              
                }
              },
            ]
          },
          {
            name: 'Change layer',
            icon: 'ui-icon-transferthick-e-w',
            data: function() {
              
            },
            click: function() {
              
            }
          }
        ]
      });

      return {
        menu: contextMenu,
        currentGameObject: null,

        show: function (x, y, go) {
          this.currentGameObject = go;
          this.menu.show(x, y);
        }
      };
    }
  });

  return GameObjectContextMenu;
});