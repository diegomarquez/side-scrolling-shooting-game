define(function(require) {

  var gb = require('gb');
  var editorConfig = require('editor-config');
  var gameObjectInputInteraction = require('setup-game-object-input');
  var sceneSerializer = require('scene-serializer');
  var editorGizmos = require('editor-gizmos');

  var SetupEditorObject = require("class").extend({
    init: function() {
      
    },

    setup: function(goId, group, viewports, pos) {
      var object = createObject(goId, group, viewports);

      if (object) {
      	if (pos) {
      		object.x = pos.x;
	      	object.y = pos.y;	
      	}

	      return object;	
      }
    },

    setupWithGameObject: function(goId, go) {
      var object = createObject(goId, go.getUpdateGroup(), go.getViewportList());

      if (object) {
      	object.x = go.x;
	      object.y = go.y;      

	      return object;	
      }
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
      
      // Get a game object with out starting it
      var object = gb.getGameObject(goId, group, viewports, null, 'create');

      // Override the methods to prevent object initialization
      doOverridesForEditor(object);
      
      // Once the needed overrides are done, start the game object
      object.start();
      
      // Add all required gizmos
      addEditorGizmos(object);

      // Setup the mouse interactions
      gameObjectInputInteraction.setupInteraction(object);    

      // Add the object to the serializer
      sceneSerializer.add(object);

      return object;
    }
  }

  var doOverridesForEditor = function(object) {
  	object.editorStart = function() {};
    object.editorUpdate = function() {};

    if (object.childs) {
	  	for (var i = 0; i < object.childs.length; i++) {
	  		doOverridesForEditor(object.childs[i]);
	  	}
    }
  }

  var addEditorGizmos = function(object) {
  	editorGizmos.addGizmos(object);

  	if (object.childs) {
	  	for (var i = 0; i < object.childs.length; i++) {
	  		addEditorGizmos(object.childs[i]);
	  	}
    }
  }

  return new SetupEditorObject();
});