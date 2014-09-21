define(function(require) {

  var gb = require('gb');
  var keyboard = require('keyboard');
  var gameObject = require('game-object');

  var currentSelection = null;

  var GameObjectMouseInteraction = require("class").extend({
    init: function() {
      keyboard.onKeyUp(keyboard.W, this, function() {
        if (this.currentSelection) {
          this.currentSelection.y -= 5;
        }
      });

      keyboard.onKeyUp(keyboard.S, this, function() {
        if (this.currentSelection) {
          this.currentSelection.y += 5;
        }
      });

      keyboard.onKeyUp(keyboard.A, this, function() {
        if (this.currentSelection) {
          this.currentSelection.x -= 5;
        }
      });

      keyboard.onKeyUp(keyboard.D, this, function() {
        if (this.currentSelection) {
          this.currentSelection.x += 5;
        }
      });

      this.currentSelection = null;
    },

    setupInteraction: function(go) {
      go.single(go.CLICK, this, function(clickData) {
        if (this.currentSelection) {
          this.currentSelection.Selected = false;
          this.currentSelection = clickData.go;
        } else {
          this.currentSelection = clickData.go;
        }

        this.currentSelection.Selected = true;
      });
    }
  });

  Object.defineProperty(gameObject.prototype, "Selected", { 
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

