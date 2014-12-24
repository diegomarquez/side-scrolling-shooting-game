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
    	var object;
    	var group = go.getUpdateGroup();

    	if (group) {
    		// Game objects with an update group, are at the top level so a clone can be made with all of it's properties
    		object = createObject(goId, group, JSON.parse(JSON.stringify(go.getViewportList())));
    	} else {
    		// Game object with out an update group are child to some other object, so to setup a proper clone, it needs to be added to the parent
    		object = createChildObject(goId, go);    	
    	}

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

      // Do all the stuff a game object needs in the editor
      setupGameObject(object);

      // Add the object to the serializer
      sceneSerializer.add(object);

      return object;
    }
  }

  var createChildObject = function(goId, go) {
  	var child = gb.addChildTo(go.parent, goId, null, null, 'create', false);
  	
  	// Do all the stuff a game object needs in the editor
  	setupGameObject(child);

  	return child;
  }

  var setupGameObject = function(object) {
  	// Override the methods to prevent object initialization
    doOverridesForEditor(object);

    // Once the needed overrides are done, start the game object
    object.start()

    // Add all required gizmos
    addEditorGizmos(object);

    // Setup the mouse interactions
    gameObjectInputInteraction.setupInteraction(object);
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