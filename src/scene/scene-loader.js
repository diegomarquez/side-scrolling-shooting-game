define(function(require) {

	var gb = require('gb');
	var util = require('util');

	var SceneLoader = require("delegate").extend({
		init: function() {
			this._super();
		},

		load: function(scene) {
			var s;

			if (!scene) {
				throw new Error('missing scene');
			}

			if (util.isString(scene)) {
				s = JSON.parse(scene);
			}

			if (util.isObject(scene)) {
				s = scene;
			}

			this.cleanUp();
			this.sceneName(s);
			this.world(s);
			this.groups(s);
			this.viewports(s);
			this.configurations(s);

			this.layout = function() {
				this.addGameObjects(s);
				this.execute(this.LOAD_COMPLETE);
			}.bind(this);
		},

		cleanUp: function () {

		},

		sceneName: function (scene) {

		},

		world: function (scene) {

		},

		groups: function (scene) {
			var groups = scene.groups;

			for(var i = 0; i < groups.length; i++) {
				gb.groups.add(groups[i]);
			}
		},

		viewports: function (scene) {

		},

		configurations: function(scene) {
			// Add game object configurations
			addConfigurations(gb.goPool, scene.goConfig);
			// Add component configurations
			addConfigurations(gb.coPool, scene.coConfig);
		},

		getGameObject: function (serializedGameObject) {

		},

		addChildGameObject: function (childId, go) {

		},

		decorateGameObject: function (go) {

		},

		addGameObjects: function(scene) {
			if (!scene.objects) return;

			for(i = 0; i < scene.objects.length; i++) {
				var serializedGameObject = scene.objects[i];

				// Create a new game object from the serialized data
				var gameObject = this.getGameObject(serializedGameObject);

				// If any structural changes, modify the game object to look like the serialized data
				applyStructuralChanges.call(this, gameObject, serializedGameObject["hasStructuralChanges"], serializedGameObject["properties"]);
				// Apply serialized component attributes
				applyAttributesToComponents.call(this, gameObject, this.getComponentArgs(serializedGameObject["properties"]));
				// Recursively apply arguments to children and attributes to their components
				applyAttributesToChildren.call(this, gameObject, this.getChildrenArgs(serializedGameObject["properties"]));

				// Place the game object in it's position in the world
				gameObject.x = serializedGameObject["x"];
				gameObject.y = serializedGameObject["y"];

				require('object-counter').count(gameObject);
			}
		},

		getConfigurationsUsedInScene: function(scene) {
			if (!scene) {
				throw new Error('missing scene');
			}

			if (util.isString(scene)) {
				scene = JSON.parse(scene);
			}

			if (util.isObject(scene)) {
				scene = scene;
			}

			if (!scene.objects)
				return [];

			var result = {};

			for(i = 0; i < scene.objects.length; i++) {
				var serializedGameObject = scene.objects[i];

				var configurationId = serializedGameObject["id"];

				result[configurationId] = null;

				var childrenJson = this.getChildrenArgs(serializedGameObject["properties"]);
				result = util.shallow_merge(result, this.getChildConfigurationsUsedInScene(childrenJson));
			}

			returnArray = [];

			for (var k in result) {
				returnArray.push(k);
			}

			return returnArray;
		},

		getChildConfigurationsUsedInScene: function(childrenJson) {
			var result = {};

			if (childrenJson) {
				for (var configurationId in childrenJson) {
					result[configurationId] = null;

					var cJson = this.getChildrenArgs(childrenJson[configurationId]);

					result = util.shallow_merge(result, this.getChildConfigurationsUsedInScene(cJson))
				}
			}

			return result;
		},

		getComponentArgs: function(properties) {
			return properties ? properties["componentArgs"] : null;
		},

		getGameObjectArgs: function(properties) {
			return properties ? properties["args"] : null;
		},

		getChildrenArgs: function(properties) {
			return properties ? properties["children"] : null;
		}
	});

	var applyStructuralChanges = function(go, hasStructuralChanges, properties) {
		if (hasStructuralChanges) {
			// Remove everything from from the created game object, components and children
			go.removeComponents();
			gb.reclaimer.claimChildren(go);

			// Add the serialized components
			addComponentsToGameObject.call(this, go, this.getComponentArgs(properties));
			// Recursively add the serialized children
			addChildrenToGameObject.call(this, go, this.getChildrenArgs(properties));

			this.decorateGameObject(go)
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
				applyAttributes.call(this, component, serializedComponent["attributes"]);
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
				var childArgs = allChildProperties["args"];
				var componentsArgs = allChildProperties["componentArgs"];
				var childrenArgs = allChildProperties["children"];

				var childGo = this.addChildGameObject(childId, go)

				// If any structural changes, modify the game object to look like the serialized data
				applyStructuralChanges.call(this, childGo, allChildProperties["hasStructuralChanges"], allChildProperties);
				// Apply serialized arguments to child game object
				applyAttributes.call(this, childGo, childArgs);
				// Apply serialized arguments to child components
				applyAttributesToComponents.call(this, childGo, componentsArgs);

				// If there are any children, apply initialization arguments and component attributes recursively
				if (childrenArgs) {
					applyAttributesToChildren.call(this, childGo, childrenArgs);
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
				applyAttributes(goComponents[serializedComponent["indexInParent"]], serializedComponent["attributes"])
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
				var childArgs = allChildProperties["args"];
				var componentsArgs = allChildProperties["componentArgs"];
				var childrenArgs = allChildProperties["children"];

				// Get the child to work with
				var childGo = goChildren[allChildProperties["indexInParent"]];

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

	Object.defineProperty(SceneLoader.prototype, "LOAD_COMPLETE", { get: function() { return 'load_complete'; } });

	return SceneLoader;
});
