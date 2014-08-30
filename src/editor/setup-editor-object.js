define(function(require) {

  var gb = require('gb');
  var gameObjectInputInteraction = require('game-object-input-interaction');
  var sceneSerializer = require('scene-serializer');

  var SetupEditorObject = require("class").extend({
    init: function() {
      
    },

    setup: function(goId, group, viewport) {
      var object = gb.add(goId, group, viewport);

      object.update = function(delta) {}

      gameObjectInputInteraction.setupInteraction(object);      
      sceneSerializer.add(object, goId, group, viewport);

      return object;
    },

    setupWithViewport: function(goId, group, viewport, mainViewport) {
      var object = gb.add(goId, group, viewport);

      object.x = -mainViewport.x + mainViewport.width/2;
      object.y = -mainViewport.y + mainViewport.height/2;

      object.update = function(delta) {}

      gameObjectInputInteraction.setupInteraction(object);      
      sceneSerializer.add(object, goId, group, viewport);

      return object;
    }
  });
  
  return new SetupEditorObject();
});