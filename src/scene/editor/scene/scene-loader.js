define(function(require) {

  var gb = require('gb');
  var world = require('world');
  var editorSetup = require('editor-setup');
  var editorViewports = require('editor-viewports');
  var setupEditorObject = require('setup-editable-game-object');
  var sceneName = require('scene-name');

  var SceneLoader = require("class").extend({
    init: function() {},

    load: function(scene) {
      // Clear all previous content
      editorSetup.clear();

      // Set the scene name in the UI
      sceneName.set(scene.name);

      // Set the world dimentions
      world.setWidth(scene.world.width);
      world.setHeight(scene.world.height);

      // Create Update Groups
      var groups = scene.groups;

      // Create Update Groups
      for(var i = 0; i < groups.length; i++) {
        gb.groups.add(groups[i]);
      } 

      // Create Viewports
      var viewports = scene.viewports;

      for(var i = 0; i < viewports.length; i++) {
      	editorViewports.add(viewports[i]).NoClipping().NoCulling().NoMouseBounded();
      }

      // Create editor only viewports
      editorSetup.setupViewports();
      
      // Add game object configurations
      addConfigurations(gb.goPool, scene.goConfig);

      // Add component configurations
      addConfigurations(gb.coPool, scene.coConfig);
      
      // Create Game Objects
      var objects = scene.objects;

      for(i = 0; i < objects.length; i++) {
      	var serializedGameObject = objects[i];

      	// Create a game object
        var gameObject = setupEditorObject.setup(serializedGameObject.id, serializedGameObject.g, serializedGameObject.v);
        // Apply scene attributes if any
        applyGameObjectArguments(gameObject, serializedGameObject.args);
        // Apply scene attributes to the components if any
        applyAttributesToComponents(gameObject, serializedGameObject.componentArgs);
        // Recursively apply attributes to children and their components
        applyAttributesToChildren(gameObject, serializedGameObject.childrenArgs);
        
        // Place the game object in it's position in the world
        gameObject.x = serializedGameObject.x;
        gameObject.y = serializedGameObject.y;
      }      
    }
  });

	var addConfigurations = function(pool, config) {
		if (config) {
    	for (var i = 0; i < config.length; i++) {
    		pool.createConfigurationFromObject(config[i]);	
    	}
    }
	}

	var applyAttributes = function(object, args) {
		if (args && object.Attributes) {
    	object.Attributes(args);	
    }
	}

	var applyAttributesToComponents = function(go, componentArgs) {
		if (componentArgs) {
    	for (var k in componentArgs) {    		
    		applyAttributes(go.findComponents().firstOfType(k), componentArgs[k]);
    	}	
    }
	}

	var applyAttributesToChildren = function(go, childrenArgs) {
		if (childrenArgs) {
      for (var k in childrenArgs) {
      	var child = go.findChildren().firstOfType(k);
				var childArguments = childrenArgs[k];

				applyAttributes(child, childArguments.args);	
				applyAttributesToComponents(gameObject, childArguments.componentArgs);		

				if (child.isContainer()) {
      		applyAttributesToChildren(child, childArguments.childrenArgs)  	
        }	
      }
   	}
	} 

  return new SceneLoader();
});
