define(function(require) {
  var gb = require('gb');
  var world = require('world');
  var editorConfig = require('editor-config');
  var util = require('util');
  var attributeComparer = require('attribute-comparer');

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
       	var gameObjectArgument = serializeGameObjectArguments(go);

       	if (gameObjectArgument) {
       		goToSerialize.args = gameObjectArgument;
       	}

       	// Recursively serialize changes to all the children this game object might have
       	var childrenArguments = serializeGameObjectChildrenArguments(go);

       	if (childrenArguments) {
       		goToSerialize.childrenArgs = childrenArguments;
       	}

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

	var saveChangesToObject = function(object, to, prop) {
		var changes = attributeComparer.getChanges(object);

		if (changes) {
			to[prop] = changes;
		}
	}

	var saveChangesToArray = function(object, array, index) {
		var changes = attributeComparer.getChanges(object);

		if (changes) {
			array.push({attributes: changes, index: index});
		}
	}	

	var serializeGameObjectArguments = function(go) {
		var serializableArguments = {};

		// Save changes to the game object if any
		saveChangesToObject(go, serializableArguments, 'args');

		// Get objects for each component that has recieved changes
		if (go.components) {
   		serializableArguments.componentArgs = {};

   		for (var i = 0; i < go.components.length; i++) {
     		var component = go.components[i];     	

     		// Create a collection where to store changes, if a game object have several components of the same type, 
     		// they will be grouped together in the same collection
     		if (!serializableArguments.componentArgs[component.typeId]) {
     			serializableArguments.componentArgs[component.typeId] = [];
     		}

     		// Save changes for each component, if any
     		saveChangesToArray(component, serializableArguments.componentArgs[component.typeId], i);
     	}	

     	// Delete components keys which had no changes
     	for (var k in serializableArguments.componentArgs) {
     		if (serializableArguments.componentArgs[k].length == 0) {
     			delete serializableArguments.componentArgs[k];
     		}
     	}

     	// If the whole componentArgs object ended up with nothing by this point, delete it.
     	if (Object.keys(serializableArguments.componentArgs).length == 0) {
     		delete serializableArguments['componentArgs']
     	}
   	}

   	return serializableArguments;
	}

	var serializeGameObjectChildrenArguments = function(go) {
   	if (go.childs) {
   		var serializableChildArguments = {};

   		for (var i = 0; i < go.childs.length; i++) {
   			var child = go.childs[i];
   			var id = child.typeId; 

   			// This object will hold all the changes that a child of a given type has received
   			// Changes for childs of the same type are gruped together in the args array
   			if (!serializableChildArguments[id]) {
   				serializableChildArguments[id] = {
   					args: [],
   					childrenArgs: {}
   				}
   			}

   			// Get changes for the child itself
   			var serializedChild = serializeGameObjectArguments(child);

   			// Store changes only if the child actually got some changes
   			if (Object.keys(serializedChild).length > 0) {
   				serializableChildArguments[id].args.push(serializedChild);	
   			}

   			// If a child is a container itself, all of it's children need to be serialized aswell
   			if (child.isContainer()) {
   				// This is a recursive loop, all empty data containers are removed by the assignChildArguments method
   				assignChildArguments(serializableChildArguments[id].childrenArgs, serializeGameObjectChildrenArguments(child));
   			}
   		}

   		// After everythin is complete, get rid of all objects which ended up empty, be them objects or arrays.
   		// The final result is an object which only has meaningful data
   		return cleanUpChildArguments(serializableChildArguments);
   	}
	}

	var assignChildArguments = function(to, args) {
		for (var k in args) {
			if (args[k].length == 0) {
				delete args[k];
			}
		}

		to = args;
	}

	var cleanUpChildArguments = function(childArgs) {
		for (var k in childArgs) {
			var a = childArgs[k];

			if (a.args.length == 0) {
				delete a['args'];
			}

			if (Object.keys(a.childrenArgs).length == 0) {
				delete a['childrenArgs'];
			}

			if (Object.keys(a).length == 0) {
				delete childArgs[k];
			}
		}

		return childArgs;
	}

  return new SceneSerializer();
});
