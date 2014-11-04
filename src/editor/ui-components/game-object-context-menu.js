define(function(require) {
  var gb = require('gb');
  var editorConfig = require('editor-config');
  var mainViewport = require('main-viewport');

  var menuUI = require('menu');

  var GameObjectContextMenu = require('class').extend({
    init: function() {},

    create: function() {
      var setupEditorObject;

      var contextMenu = (new menuUI()).create({
        id: 'game-object-context-menu',
        options: [
          {
            name: 'Clone',
            icon: 'ui-icon-copy',
            click: function() {
              setupEditorObject = require('setup-editable-game-object');
              setupEditorObject.setupWithViewport(menu.go.typeId, menu.go.getUpdateGroup(), menu.go.getViewportList(), mainViewport.get());
            }
          },
          {
            name: 'Viewports',
            icon: 'ui-icon-wrench',

            options: [
              {
                name: 'Add To',
                icon: 'ui-icon-plusthick',
                options: function() {
                  var viewports = editorConfig.getViewports().map(function(viewport) { return viewport.name; });

                  return viewports.map(function(viewportName) {
                    return {
                      name: viewportName,
                      icon: 'ui-icon-bullet',
                      disable: isInViewport(menu.go, viewportName),
                      click: function (newViewport) {
                        var success = gb.viewports.get(newViewport).addGameObject(menu.l, menu.go);

                        // TODO: Give this feedback
                        if (!success) {
                          console.log('Destination Viewport must have a layer named' + menu.l);
                        }
                      }
                    }
                  });
                }
              },
              {
                name: 'Remove From',
                icon: 'ui-icon-minusthick',
                options: function() {
                  var viewports = editorConfig.getViewports().map(function(viewport) { return viewport.name; });

                  return viewports.map(function(viewportName) {
                    return {
                      name: viewportName,
                      icon: 'ui-icon-bullet',
                      disable: !isInViewport(menu.go, viewportName),
                      click: function (removeFromViewport) {
                        gb.viewports.get(removeFromViewport).removeGameObject(menu.l, menu.go);
                      }
                    }
                  });
                }
              },
              {
                name: 'Remove Current',
                icon: 'ui-icon-minusthick',
                click: function () {
                  menu.v.removeGameObject(menu.l, menu.go);
                }
              }
            ]
          },
          {
            name: 'Change layer',
            icon: 'ui-icon-transferthick-e-w',
            
            options: function() {
              return editorConfig.getViewportLayers(menu.v).map(function(layerName) {
                return {
                  name: layerName,
                  icon: 'ui-icon-bullet',
                  disable: menu.l == layerName,
                  click: function (newLayer) {
                    menu.v.moveGameObject(menu.l, newLayer, menu.go);
                  }
                }
              });
            }
          },
          {
            name: 'Scrap',
            icon: 'ui-icon-trash',
            click: function() {
              gb.reclaimer.claim(menu.go);
            }
          }
        ]
      });

      var isInViewport = function(go, viewportName) {
        for (var i = 0; i < go.getViewportList().length; i++) {
          var vo = go.getViewportList()[i];

          if (vo.viewport === viewportName) {
            return true;
          }
        }

        return false;
      }

      var menu = {
        menu: contextMenu,
        go: null,
        v: null,
        l: null,

        show: function (mouseData) {
          this.go = mouseData.go;
          this.v = mouseData.viewport;
          this.l = mouseData.layer;

          this.menu.show(mouseData.globalMouseX, mouseData.globalMouseY);
        },

        hide: function () {
          this.go = null;
          this.v = null;
          this.l = null;

          this.menu.hide();
        }
      };

      return menu;
    }
  });

  return GameObjectContextMenu;
});