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

      for(var i = 0; i < groups.length; i++) {
        gb.groups.add(groups[i]);
      } 

      // Create Serialized Viewports
      var viewports = scene.viewports;

      for(var i = 0; i < viewports.length; i++) {
      	editorViewports.add(viewports[i]).NoClipping().NoCulling().NoMouseBounded();
      }

      // Create editor only objects, viewports and game objects
      editorSetup.display();
      
      // Add game object configurations
      addConfigurations(gb.goPool, scene.goConfig);

      // Add component configurations
      addConfigurations(gb.coPool, scene.coConfig);

      // Create Game Objects
      var objects = scene.objects;

      for(i = 0; i < objects.length; i++) {
      	var serializedGameObject = objects[i];
      
      	// Create a new game object from the serialized data
      	var gameObject = getGameObject(serializedGameObject);

      	// If any structural changes, modify the game object to look like the serialized data
      	applyStructuralChanges(gameObject, serializedGameObject.hasStructuralChanges, serializedGameObject.properties);
     	 	// Apply serialized component attributes
      	applyAttributesToComponents(gameObject, getComponentArgs(serializedGameObject.properties));
        // Recursively apply arguments to children and attributes to their components
        applyAttributesToChildren(gameObject, getChildrenArgs(serializedGameObject.properties));
               
        // Place the game object in it's position in the world
        gameObject.x = serializedGameObject.x;
        gameObject.y = serializedGameObject.y;
      }      
    }
  });

	var getComponentArgs = function(properties) {
		return properties ? properties.componentArgs : null;
	}

	var getGameObjectArgs = function(properties) {
		return properties ? properties.args : null;
	}

	var getChildrenArgs = function(properties) {
		return properties ? properties.children : null;
	}

	var getGameObject = function(serializedGameObject) {
  	// Create a game object and apply serialized arguments
    return setupEditorObject.setup(serializedGameObject.id, serializedGameObject.g, serializedGameObject.v, getGameObjectArgs(serializedGameObject));
	}

	var applyStructuralChanges = function(go, hasStructuralChanges, properties) {
		if (hasStructuralChanges) {
  		// Remove everything from from the created game object, components and children
  		go.removeComponents();
  		gb.reclaimer.claimChildren(go);

  		// Add the serialized components
  		addComponentsToGameObject(go, getComponentArgs(properties));
  		// Recursively add the serialized children
			addChildrenToGameObject(go, getChildrenArgs(properties));
  		
  		// Add the editor gizmos, everything was just removed, so this need to be added back
  		setupEditorObject.addGizmos(go);
  	}
	}

	var addConfigurations = function(pool, config) {
		if (!config) return

  	for (var i = 0; i < config.length; i++) {
  		pool.createConfigurationFromObject(config[i]);	
  	}
	}

	var addComponentsToGameObject = function(go, componentArgs) {
		if (!componentArgs) return;

		for (var k in componentArgs) { 	
  		for (var i = 0; i < componentArgs[k].length; i++) {
  			var serializedComponent = componentArgs[k][i];
				// Add a new component to the game object
				var component = gb.addComponentTo(go, k);
				// Apply serialized attributes to the component
  			applyAttributes(component, serializedComponent.attributes); 
  		}
  	}
	}

	var addChildrenToGameObject = function(go, children) {
		if (!children) return;

		for (var k in children) {
			var childId = k;
			var childrenOfType = children[childId];

			for (var i = 0; i < childrenOfType.length; i++) {
				// Extract properties of the serialized game object
				var allChildProperties = childrenOfType[i];
				var childArgs = allChildProperties.args;
				var componentsArgs = allChildProperties.componentArgs;
				var childrenArgs = allChildProperties.children;

				// Add the child to the game object and take care of adding all the editor gizmos
				var childGo = setupEditorObject.setupChild(childId, go);

				// If any structural changes, modify the game object to look like the serialized data
      	applyStructuralChanges(childGo, allChildProperties.hasStructuralChanges, allChildProperties);		
				// Apply serialized arguments to child game object
				applyAttributes(childGo, childArgs);
				// Apply serialized arguments to child components
				applyAttributesToComponents(childGo, componentsArgs);
				
				// If there are any children, apply initialization arguments and component attributes recursively
				if (childrenArgs) {
					applyAttributesToChildren(childGo, childrenArgs);
				}	
			}
		}
	}

	var applyAttributes = function(object, args) {
		if (!args) return;

		// Set arguments that go through the Attributes interface method
		if (object.Attributes) {
  		object.Attributes = args;	
		}

		// Set all other arguments
  	for (var k in args) {
  		object[k] = args[k];	
  	}
	}

	var applyAttributesToComponents = function(go, componentArgs) {
		if (!componentArgs) return 

		var goComponents = go.findComponents().all();

  	for (var k in componentArgs) { 	
  		for (var i = 0; i < componentArgs[k].length; i++) {
  			var serializedComponent = componentArgs[k][i];
  			applyAttributes(goComponents[serializedComponent.indexInParent], serializedComponent.attributes) 
  		}
  	}	
	}

	var applyAttributesToChildren = function(go, children) {
		if (!children) return;

		var goChildren = go.findChildren().all();

		for (var k in children) {
			var childrenOfType = children[k];

			for (var i = 0; i < childrenOfType.length; i++) {
				// Extract properties of the serialized game object
				var allChildProperties = childrenOfType[i];
				var childArgs = allChildProperties.args;
				var componentsArgs = allChildProperties.componentArgs;
				var childrenArgs = allChildProperties.children;

				// Get the child to work with
				var childGo = goChildren[allChildProperties.indexInParent];

				// Apply serialized arguments to child game object
				applyAttributes(childGo, childArgs);
				// Apply serialized arguments to child components
				applyAttributesToComponents(childGo, componentsArgs);	

				// If there are any children, apply initialization arguments and component attributes recursively
				if (childrenArgs) {
					applyAttributesToChildren(childGo, childrenArgs);
				}	
			}
    }
	} 

  return new SceneLoader();
});
