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
			try {
				// Serialize Game Objects
				var gos = [];

				for (var i = 0; i < this.serializableObjects.length; i++) {
					var go = this.serializableObjects[i];

					// Basic serialization information
					var goToSerialize = {
						"id": go.typeId,
						"g": go.getUpdateGroup(),
						"v": go.getViewportList(),
						"x": go.x,
						"y": go.y 
					} 

					if (go.hasStructuralChanges()) {
						// Game object with structural changes are serialized entirely to ensure they can be reconstructed
						goToSerialize["properties"] = serializeGameObject(go);
						goToSerialize["hasStructuralChanges"] = true;
					} else {
						// Game Objects with no structural changes can afford to only store changes
						goToSerialize["properties"] = serializeGameObjectDifference(go);
						goToSerialize["hasStructuralChanges"] = false;
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
						"name": v.name,
						"width": v.Width,
						"height": v.Height,
						"offsetX": v.OffsetX,
						"offsetY": v.OffsetY, 
						"scaleX": v.ScaleX,
						"scaleY": v.ScaleY,
						"stroke": v.getStroke(),
						"worldFit": v.WorldFit,
						"layers": editorConfig.getViewportLayers(v)
					});
				}      

				// Build the object that will actually be serialized into a JSON string
				var scene = {
					"name": sceneName,
					"objects": gos,
					"groups": groups,
					"viewports": vs,
					"goConfig": getConfigurationObjectsToSerialize(gb.goPool),
					"coConfig": getConfigurationObjectsToSerialize(gb.coPool),
					"world": {
						"width": world.getWidth(),
						"height": world.getHeight()
					}
				}

				// Remove empty objects and null properties during the serialization
				// Also remove complex objects that don't need to be serialized
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
			} catch (e) {
				return false;
			}
		}
	});

	var getConfigurationObjectsToSerialize = function(pool) {
		// Serialize configurations which were created with the editor
		var configurations = pool.getConfigurationTypes({customOnly: true});

		var result = [];

		for (var i = 0; i < configurations.length; i++) {
			result.push(pool.getConfigurationObject(configurations[i]));  
		}

		return result;
	}

	var saveAllPropertiesToObject = function(object, to, prop) {
		if (object.x !== undefined && object.y !== undefined && object.rotation !== undefined && object.scaleX !== undefined && object.scaleY !== undefined) {
			to[prop] = util.shallow_merge_many(object.args, object.Attributes, { "x": object.x, "y": object.y, "rotation": object.rotation, "scaleX": object.scaleX, "scaleY": object.scaleY });
		} else {
			to[prop] = util.shallow_merge_many(object.args, object.Attributes);
		}
	}

	var saveAllPropertiesToArray = function(object, array, index) {
		var attributes; 

		if (object.x !== undefined && object.y !== undefined && object.rotation !== undefined && object.scaleX !== undefined && object.scaleY !== undefined) {
			attributes = util.shallow_merge_many(object.args, object.Attributes);
		} else {
			attributes = util.shallow_merge_many(object.args, object.Attributes, { "x": object.x, "y": object.y, "rotation": object.rotation, "scaleX": object.scaleX, "scaleY": object.scaleY });  
		}

		array.push({"attributes": attributes, "indexInParent": index});
	}

	var saveAttributeChangesToObject = function(object, to, prop) {
		var changes = attributeComparer.getChanges(object);

		if (changes) {
			to[prop] = changes;
		}

		if (object.x !== undefined && object.y !== undefined && object.rotation !== undefined && object.scaleX !== undefined && object.scaleY !== undefined) {
			if (!to[prop]) 
				to[prop] = {};

			to[prop]["x"] = object.x;
			to[prop]["y"] = object.y;
			to[prop]["rotation"] = object.rotation;
			to[prop]["scaleX"] = object.scaleX;
			to[prop]["scaleY"] = object.scaleY;
		}
	}

	var saveAttributeChangesToArray = function(object, array, index) {
		var changes = attributeComparer.getChanges(object);

		if (changes) {
			array.push({"attributes": changes, "indexInParent": index});
		}
	} 

	var serializeGameObject = function(go) {
		var serializableArguments = {};

		// Save attributes of the game object if any
		saveAllPropertiesToObject(go, serializableArguments, "args");

		// Get objects for each component
		if (go.components) {
			serializableArguments["componentArgs"] = {};

			var componentIndex = -1;

			for (var i = 0; i < go.components.length; i++) {
				var component = go.components[i];       

				// Skip editor components
				if (editorConfig.isEditorComponent(component.typeId)) continue;
				componentIndex++;

				// Create a collection where to store components, if a game object have several components of the same type, 
				// they will be grouped together in the same collection
				createArrayInKey(serializableArguments["componentArgs"], component.typeId);

				// Save component attributes for each component
				saveAllPropertiesToArray(component, serializableArguments["componentArgs"][component.typeId], componentIndex);
			} 
		}

		serializableArguments["children"] = serializeGameObjectChildren(go);

		return serializableArguments;
	}

	var serializeGameObjectChildren = function(go) {
		if (go.childs) {
			var serializableChildArguments = {};

			var childIndex = -1;

			for (var i = 0; i < go.childs.length; i++) {
				var child = go.childs[i];
				var id = child.typeId; 

				// Skip editor game objects
				if (editorConfig.isEditorGameObject(child.typeId)) continue;
				childIndex++;

				// This object will hold all the children attributes of thie game object being serialized
				// Childs of the same type are grouped together in the gameObjects array
				createArrayInKey(serializableChildArguments, id);

				// Get a object to serialize for the child itself
				var serializedChild = serializeGameObject(child);
				serializedChild["indexInParent"] = childIndex;
				serializedChild["hasStructuralChanges"] = child.hasStructuralChanges();

				// Store the child changes as well as the index in the parent
				serializableChildArguments[id].push(serializedChild); 
			}

			// After everythin is complete, get rid of all objects which ended up empty, be them objects or arrays.
			// The final result is an object which only has meaningful data
			return cleanUpArguments(serializableChildArguments);
		}
	}

	var serializeGameObjectDifference = function(go) {
		var serializableArguments = {};

		// Save changes to the game object if any
		saveAttributeChangesToObject(go, serializableArguments, "args");

		// Get objects for each component that has recieved changes
		if (go.components) {
			serializableArguments["componentArgs"] = {};

			var componentIndex = -1;

			for (var i = 0; i < go.components.length; i++) {
				var component = go.components[i];       

				// Skip editor components
				if (editorConfig.isEditorComponent(component.typeId)) continue;
				componentIndex++;

				// Create a collection where to store changes, if a game object have several components of the same type, 
				// they will be grouped together in the same collection
				createArrayInKey(serializableArguments["componentArgs"], component.typeId);

				// Save changes for each component, if any
				saveAttributeChangesToArray(component, serializableArguments["componentArgs"][component.typeId], componentIndex);
			} 

			serializableArguments["componentArgs"] = cleanUpArguments(serializableArguments["componentArgs"]);
			serializableArguments["children"] = serializeGameObjectChildrenDifference(go); 
		}

		return serializableArguments;
	}

	var serializeGameObjectChildrenDifference = function(go) {
		if (go.childs) {
			var serializableChildArguments = {};

			var childIndex = -1;

			for (var i = 0; i < go.childs.length; i++) {
				var child = go.childs[i];
				var id = child.typeId; 

				// Skip editor game objects
				if (editorConfig.isEditorGameObject(id)) continue;
				childIndex++;

				// This object will hold all the changes that a child of a given type has received
				// Changes for childs of the same type are grouped together in the gameObjects array
				createArrayInKey(serializableChildArguments, id);

				// Get changes for the child itself
				var serializedChild = serializeGameObjectDifference(child);

				// Store changes only if the child actually got some changes
				if (Object.keys(serializedChild).length > 0) {
					serializedChild["indexInParent"] = childIndex;
					serializedChild["hasStructuralChanges"] = child.hasStructuralChanges();
					 
					// Store the child changes as well as the index in the parent
					serializableChildArguments[id].push(serializedChild); 
				}
			}

			// After everythin is complete, get rid of all objects which ended up empty, be them objects or arrays.
			// The final result is an object which only has meaningful data
			return cleanUpArguments(serializableChildArguments);
		}
	}

	var cleanUpArguments = function(childArgs) {
		for (var k in childArgs) {
			if (childArgs[k].length == 0) delete childArgs[k];
		}

		if (Object.keys(childArgs).length == 0) {
			return null;
		} else {
			return childArgs; 
		}
	}

	var createArrayInKey = function(object, key) {
		if (!object[key]) {
			object[key] = [];
		}
	}

	return new SceneSerializer();
});
