define(function(require) {

  var gb = require('gb');
  var keyboard = require('keyboard');
  var gameObject = require('game-object');

  var currentSelection = null;

  var GameObjectMouseInteraction = require("class").extend({
    init: function() {},

    setupInteraction: function(go) {
      go.on(go.CLICK, this, function(clickData) {
        
        console.log(clickData.viewport.name);
        console.log(clickData.go.typeId);        

        if (currentSelection) {
          currentSelection.Selected = false;
          currentSelection = clickData.go;
        } else {
          currentSelection = clickData.go;
        }

        currentSelection.Selected = true;
      });

      keyboard.onKeyUp(keyboard.W, this, function() {
        currentSelection.y -= 5;
      });

      keyboard.onKeyUp(keyboard.S, this, function() {
        currentSelection.y += 5;
      });

      keyboard.onKeyUp(keyboard.A, this, function() {
        currentSelection.x -= 5;
      });

      keyboard.onKeyUp(keyboard.D, this, function() {
        currentSelection.x += 5;
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

