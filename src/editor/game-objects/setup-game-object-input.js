define(function(require) {

  var gb = require('gb');
  var editorConfig = require('editor-config');
  var snapToGridValue = require('snap-to-grid-value');

  var keyboard = require('keyboard');
  var menu = require('menu');

  var gridCellSize = editorConfig.getGridCellSize();
  
  var GameObjectMouseInteraction = require("class").extend({
    init: function() {
      this.contextMenu = (new menu()).create({
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
    },

    setupInteraction: function(go) {
      go.Dragable = true;

      gb.Mouse.single(gb.Mouse.NOTHING_CLICKED_ON_CANVAS, this, function() {
        this.contextMenu.hide();
      });

      gb.Mouse.single(gb.Mouse.CLICKED_OUTSIDE_CANVAS, this, function() {
        this.contextMenu.hide();
      });

      go.single(go.CLICK, this, function(mouseData) {
        if(keyboard.isKeyDown(keyboard.ALT)) {
          this.contextMenu.show(mouseData.globalMouseX, mouseData.globalMouseY, mouseData.go);
        }
      });

      go.single(go.MOUSE_DRAG_START, this, function(mouseData) {
        mouseData.go.Selected = true;
      });

      go.single(go.MOUSE_DRAG_END, this, function(mouseData) {
        mouseData.go.Selected = false;
      });

      go.single(go.MOUSE_DRAG, this, function(mouseData) {
        if (snapToGridValue.get()) {
          // Snap to grid
          var stepX = gridCellSize.width;
          var stepY = gridCellSize.height;

          mouseData.go.x = stepX * Math.floor((mouseData.go.x / stepX) + 0.5);
          mouseData.go.y = stepY * Math.floor((mouseData.go.y / stepY) + 0.5);
        }
      });
    }
  });

  Object.defineProperty(require('game-object').prototype, "Selected", { 
    get: function() {  
      return this.selected; 
    },
    
    set: function(value) { 
      if (value) {
        this.renderer.debugColor = "#00FF00";
      } else {
        this.renderer.debugColor = "#FFFF00";
      }

      this.selected = value; 
    } 
  });
  
  return new GameObjectMouseInteraction();
});

