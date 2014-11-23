define(function(require) {
  var editorConfig = require('editor-config');
  var snapToGridValue = require('snap-to-grid-value');
  var gameObjectContextMenu = require('game-object-context-menu');
  
  var gridCellSize = editorConfig.getGridCellSize();
  
  var GameObjectMouseInteraction = require("class").extend({
    init: function() {
      this.contextMenu = new gameObjectContextMenu().create();
    },

    setupInteraction: function(go) {
      go.Dragable = true;

      go.single(go.CONTEXT_MENU, this, function(mouseData) {
        this.contextMenu.show(mouseData);
      });

      go.single(go.CLICK, this, function(mouseData) {
        this.contextMenu.hide();
      })

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

