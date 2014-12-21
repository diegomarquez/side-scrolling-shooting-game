define(function(require) {
  var gb = require('gb');
  var world = require('world');
  var editorConfig = require('editor-config');
  var vector2D = require('vector-2D');
  var util = require('util');

  var SceneSerializer = require("class").extend({
    init: function() {
      this.serializableObjects = [];
    },

    add: function(go) {
      this.serializableObjects.push(go);

      go.on(go.RECYCLE, this, function (go) {
        this.serializableObjects.splice(this.serializableObjects.indexOf(go), 1);
      });
    },

    serialize: function(sceneName) {
      // Serialize Game Objects
      var gos = [];

      for (var i = 0; i < this.serializableObjects.length; i++) {
        var go = this.serializableObjects[i];

        // Basic serialization information
        var goToSerialize = {
          id: go.typeId,
          g: go.getUpdateGroup(),
          v: go.getViewportList(),
          x: go.x,
          y: go.y 
        } 

        // Serialize Arguments that might have changed during the game objects's life cycle
       	serializeGameObjectArguments(go, goToSerialize);
       	// Recursively serialize changes to all the children this game object might have
       	serializeGameObjectChildrenArguments(go, goToSerialize);

        gos.push(goToSerialize);
      }

      // Serialize Update Groups
      var groups = gb.groups.allGroupNames();

      // Serialize viewports
      var vs = [];

      var allViewports = editorConfig.getViewports();

      for (i = 0; i < allViewports.length; i++) {
        var v = allViewports[i];

        vs.push({
          name: v.name,
          width: v.Width,
          height: v.Height,
          offsetX: v.OffsetX,
          offsetY: v.OffsetY, 
          scaleX: v.ScaleX,
          scaleY: v.ScaleY,
          stroke: v.getStroke(),
          worldFit: v.WorldFit,
          layers: editorConfig.getViewportLayers(v)
        });
      }      

      // Build the object that will actually be serialized into a JSON string
      var scene = {
        name: sceneName,
        objects: gos,
        groups: groups,
        viewports: vs,
        goConfig: getConfigurationObjectsToSerialize(gb.goPool),
        coConfig: getConfigurationObjectsToSerialize(gb.coPool),
        world: {
          width: world.getWidth(),
          height: world.getHeight()
        }
      }

      // Remove empty objects and null properties from the serialization process
      return JSON.stringify(scene, function (key, value) {
      	if (util.isObject(value)) {
      		// Filter out objects with no properties
      		for (var k in value) {
      			if (util.isObject(value[k])) {
      				if (Object.keys(value[k]).length == 0) {
      					delete value[k];
      				}	
      			}
      		}

      		// If after the filtering there are no properties left in the object, ignore it
      		if (Object.keys(value).length == 0) {
      			return undefined;	
      		}
      	} 

      	if (util.isArray(value)) {
      		if (value.length == 0) {
      			return undefined;
      		}
      	}

      	// Null properties are ignored
      	if (value === null) {
      		return undefined;
      	}

			  return value;
      });
    }
  });

	var getConfigurationObjectsToSerialize = function(pool) {
		// Serialize configurations which were created with the editor
    var configurations = pool.getConfigurationTypes().filter(function (name) {
    	return name.match(/->/);
    });

    var result = [] 

    for (var i = 0; i < configurations.length; i++) {
    	result.push(pool.getConfigurationObject(configurations[i]));	
    }

    return result;
	}

	var saveChanges = function(object, to, prop) {
		var changes = checkPropertiesForChanges(object);

		if (changes) {
			to[prop] = changes;
		}
	}	

	var serializeGameObjectArguments = function(go, serializable) {
		// Save changes done to the game object
		saveChanges(go, serializable, 'args');

		// Get objects for each component that has recieved changes
		if (go.components) {
   		serializable.componentArgs = {};

   		for (var i = 0; i < go.components.length; i++) {
     		var component = go.components[i];     	
     		// Save changes for each components
     		saveChanges(component, serializable.componentArgs, component.typeId);	
     	}	
   	}
	}

	var serializeGameObjectChildrenArguments = function(go, serializable) {
   	if (go.childs) {
   		serializable.childrenArgs = {};

   		for (var i = 0; i < go.childs.length; i++) {
   			var child = go.childs[i];
   			var id = child.typeId; 
   			serializable.childrenArgs[id] = {};

   			serializeGameObjectArguments(child, serializable.childrenArgs[id]);

   			// If a child is a container itself, all of it's children need to be serialized aswell
   			if (child.isContainer()) {
   				serializeGameObjectChildrenArguments(child, serializable.childrenArgs[id]);
   			}
   		}
   	}
	}

	var checkPropertiesForChanges = function(object) {
		var changes = {};

		// Objects that don't implement the necessary interface, are asummed to not store any changes
		if (!object.Attributes) 
			return null;

		// Loop through the properties that can change
		for (var k in object.Attributes) {
			var attribute = object.Attributes[k];
			var objectProperty = object.args[k];

			var attributeIsObject = util.isObject(attribute);
			var propertyIsObject = util.isObject(objectProperty);
			var attributeIsArray = util.isArray(attribute);
			var propertyIsArray = util.isArray(objectProperty);
			var attributeIsFunction = util.isFunction(attribute);
			var propertyIsFunction = util.isFunction(objectProperty);

			// If any of the values is a function, skip it
			if (attributeIsFunction || propertyIsFunction) {
				continue;
			}

			// If the attribute to check is any sort of collection...
			if ((attributeIsObject && propertyIsObject) || (attributeIsArray && propertyIsArray) ) {
				// Check if the collections are equal value by value
				if (!areCollectionsEqual(attribute, objectProperty)) {
					// If they are not store the attribute
					changes[k] = attribute;
				}
			}

			// Properties that are not Objects or Arrays are compared by value, if there is a difference they stored for serialization
			if (!attributeIsObject && !attributeIsArray && !propertyIsObject && !propertyIsArray) {				
				if (!areEqual(attribute, objectProperty)) {
					changes[k] = attribute;
				}	
			}		
		}

		// Return something only if there were some changes
		if (Object.keys(changes).length > 0) {
			return changes;
		}

		return null;
	}

	var areCollectionsEqual = function(first, second) {
		if (Object.keys(first).length != Object.keys(second).length) {
			return false;
		}

		for (var k in first) {
			if (!areEqual(first[k], second[k])) {
				return false;
			}
		}

		return true;
	}

	var areEqual = function(first, second) {
		// Test special comparisons first
		// Vector 2D
		if (vector2D.isVector(first) && vector2D.isVector(second)) {
			return first.equal(second);		
		}

		// Default case, objects are just compared by value
		return first == second;
	}

  return new SceneSerializer();
});
