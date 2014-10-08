define(function(require) {

  var gb = require('gb');
  var keyboard = require('keyboard');
  var gameObject = require('game-object');

  var GameObjectMouseInteraction = require("class").extend({
    init: function() {
      
    },

    setupInteraction: function(go) {
      go.Dragable = true;

      go.single(go.MOUSE_DRAG_START, this, function(mouseData) {
        go.Selected = true;
      });

      go.single(go.MOUSE_DRAG_END, this, function(mouseData) {
        go.Selected = false;
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

