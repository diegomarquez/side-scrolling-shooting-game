define(function(require) {
  var gb = require('gb');
  var editorConfig = require('editor-config');
  var mainViewport = require('main-viewport');

  var menu = require('menu');

  var GameObjectContextMenu = require('class').extend({
    init: function() {},

    create: function() {
      var selectedGo, selectedViewport, selectedLayer;
      var setupEditorObject;

      var contextMenu = (new menu()).create({
        id: 'game-object-context-menu',
        options: [
          {
            name: 'Clone',
            icon: 'ui-icon-copy',
            click: function() {

              setupEditorObject = require('setup-editable-game-object');
              selectedGo = contextMenuController.currentGameObject;

              setupEditorObject.setupWithViewport(selectedGo.typeId, selectedGo.getUpdateGroup(), selectedGo.getViewportList(), mainViewport.get());
            }
          },
          {
            name: 'Viewports',
            icon: 'ui-icon-wrench',

            options: [
              {
                name: 'Add To',
                icon: 'ui-icon-plusthick',
                data: function() {

                },
                click: function() {
                  
                }
              },
              {
                name: 'Remove',
                icon: 'ui-icon-trash',
                
                click: function() {
                  go = contextMenuController.currentGameObject;  
                  gb.reclaimer.claim(go);
                }
              },
            ]
          },
          {
            name: 'Change layer',
            icon: 'ui-icon-transferthick-e-w',
            
            options: function() {
              selectedGo = contextMenuController.currentGameObject;
              selectedViewport = contextMenuController.currentViewport;
              selectedLayer = contextMenuController.currentLayer;

              return editorConfig.getViewportLayers(selectedViewport).map(function(layerName) {
                return {
                  name: layerName,
                  icon: 'ui-icon-bullet',
                  disable: selectedLayer == layerName,
                  click: function (newLayer) {
                    selectedViewport.moveGameObject(selectedLayer, newLayer, selectedGo);
                  }
                }
              });
            }
          }
        ]
      });

      var contextMenuController = {
        menu: contextMenu,
        currentGameObject: null,
        currentViewport: null,
        currentLayer: null,

        show: function (mouseData) {
          this.currentGameObject = mouseData.go;
          this.currentViewport = mouseData.viewport;
          this.currentLayer = mouseData.layer;

          this.menu.show(mouseData.globalMouseX, mouseData.globalMouseY);
        },

        hide: function () {
          this.currentGameObject = null;
          this.currentViewport = null;
          this.currentLayer = null;

          this.menu.hide();
        }
      };

      return contextMenuController;
    }
  });

  return GameObjectContextMenu;
});