define(function(require) {

  var gb = require('gb');
  var editorConfig = require('editor-config');
  var snapToGridValue = require('snap-to-grid-value');

  var keyboard = require('keyboard');
  var gameObjectContextMenu = require('game-obejct-context-menu');

  var gridCellSize = editorConfig.getGridCellSize();
  
  var GameObjectMouseInteraction = require("class").extend({
    init: function() {
      this.contextMenu = new gameObjectContextMenu().create();
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

