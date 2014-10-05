define(function(require) {

  var gb = require('gb');
  var gameObjectInputInteraction = require('setup-game-object-input');
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
        object.x = -mainViewport.x + mainViewport.Width/2;
        object.y = -mainViewport.y + mainViewport.Height/2;

        return object;
      }   
    }
  });

  var createObject = function(goId, group, viewports) {
    if (goId != 'Nothing' && group != 'Nothing' && viewports.length > 0) {
      var object = gb.create(goId, group, viewports);

      object.update = function(delta) {}

      gameObjectInputInteraction.setupInteraction(object);      
      sceneSerializer.add(object, goId, group, viewports);

      return object;
    }
  }
  
  return new SetupEditorObject();
});