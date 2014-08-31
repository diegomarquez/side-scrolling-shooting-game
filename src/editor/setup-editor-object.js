define(function(require) {

  var gb = require('gb');
  var gameObjectInputInteraction = require('game-object-input-interaction');
  var sceneSerializer = require('scene-serializer');

  var SetupEditorObject = require("class").extend({
    init: function() {
      
    },

    setup: function(goId, group, viewports) {
      return createObject(goId, group, viewports);
    },

    setupWithViewport: function(goId, group, viewports, mainViewport) {
      var object = createObject(goId, group, viewports);
      
      if (object) {
        object.x = -mainViewport.x + mainViewport.width/2;
        object.y = -mainViewport.y + mainViewport.height/2;

        return object;
      }   
    }
  });

  var createObject = function(goId, group, viewports) {
    if (goId && group && viewports) {
      var object = gb.add(goId, group, viewports);

      object.update = function(delta) {}

      gameObjectInputInteraction.setupInteraction(object);      
      sceneSerializer.add(object, goId, group, viewports);

      return object;
    }
  }
  
  return new SetupEditorObject();
});