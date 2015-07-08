define(function(require) {
	var gb = require('gb');
	var util = require('util');
	var editorConfig = require('editor-config');

	var ConfigurationCreator = require('class').extend({
		init: function() {
			
		},

		createFromGameObject: function(go, options) {
			options = options || {};
			var childConfigurations = { configurations: [], hasNew: false };

			// If the game object is a container and it has children...
			if (go.childs) {
				// Check if any of the children has any changes and therefore needs a new configuration

				for (var i = 0; i < go.childs.length; i++) {
					var child = go.childs[i];

					// Skip editor only game objects
					if (editorConfig.isEditorGameObject(child.typeId)) continue;

					// Create a new configurations for each child
					// This is recursive so children which in turn have children will also get new configurations
					var newChildConfigurationResult = this.createFromGameObject(go.childs[i], util.shallow_merge(options, { isChildOnly: true, force: false }));
					
					if (newChildConfigurationResult) {      
						if (options.getChildIds) {
							storeChildConfiguration(childConfigurations.configurations, go.childs[i], newChildConfigurationResult.configurationId, true);
							childConfigurations.hasNew = true;
						} else {
							storeChildConfiguration(childConfigurations.configurations, go.childs[i], newChildConfigurationResult, true); 
							childConfigurations.hasNew = true;  
						}
					} else {
						storeChildConfiguration(childConfigurations.configurations, go.childs[i], go.childs[i].typeId, false);
					}                                 
				}
			} 

			// No new child configurations needed and no changes on itself, means this game object does not need a new configuration
			if (!childConfigurations.hasNew && !hasChanges(go) && !options.force) {
				return null;
			}
		
			var newConfigurationId;

			if (options.configurationId) {
				// Use a specified Id
				newConfigurationId = options.configurationId;
			} else {
				// Generate the new configuration name
				newConfigurationId = this.getNewConfigurationName(go);
			}

			// Create a new configuration
			var newConfiguration = gb.goPool.createConfiguration(newConfigurationId, go.poolId);

			// All the configurations created by this module are marked as custom
			newConfiguration.custom();

			// Copy over the game object arguments to the new configuration and merge basic transform properties from the 
			// original object
			newConfiguration.args(util.shallow_merge(go.args, { 
				x: go.x, 
				y: go.y,
				rotation: go.rotation,
				scaleX: go.scaleX,
				scaleY: go.scaleY
			}));

			// Add components to the new configuration if there are any components to be added
			if (go.components) {
				for (var i = 0; i < go.components.length; i++) {
					var component = go.components[i];
					
					// Skip editor only components
					if (editorConfig.isEditorComponent(component.typeId)) continue;

					newConfiguration.addComponent(component.typeId, component.Attributes);
				}
			}

			// Add the child configurations
			for (var i = 0; i < childConfigurations.configurations.length; i++) {
				var configuration = childConfigurations.configurations[i];
				var mergedArguments = util.shallow_merge(configuration.args, { 
					x: configuration.child.x, 
					y: configuration.child.y,
					rotation: configuration.child.rotation,
					scaleX: configuration.child.scaleX,
					scaleY: configuration.child.scaleY
				});

				newConfiguration.addChild(configuration.id, mergedArguments);
			}

			// Add the renderer to the new configuration
			newConfiguration.setRenderer(go.renderer.typeId, go.renderer.args);

			// Set the child only flag for configurations which are being created solely to be children of others
			if (options.isChildOnly) {
				newConfiguration.childOnly(); 
			}

			if (options.getChildIds) {
				return {
					configurationId: newConfigurationId,
					childConfigurationIds: childConfigurations.configurations
						.filter(function(configuration) { return configuration.isNew; })
						.map(function(configuration) { return configuration.id; })
				}
			} else {
				// Return the id of the new confifguration
				return newConfigurationId;  
			}
		},

		getNewConfigurationName: function (go) {
			var configurationTypes = gb.goPool.getConfigurationTypes();

			var result = 0;
			
			newName = go.typeId.replace(/\([^(]*$/, '').trim();

			var newNameResult = newName;

			for (var i = 0; i < configurationTypes.length; i++) {
				if (configurationTypes[i].match(newName)) {
					result++;
					newNameResult =  newName + ' (' + result.toString() + ')';
				}
			}

			return newNameResult;
		}
	});

	var hasChanges = function(go) {
		if (go.hasStructuralChanges()) {
			return true;
		}

		if (go.args.x != go.x || go.args.y != go.y || go.args.rotation != go.rotation || go.args.scaleX != go.scaleX || go.args.scaleY != go.scaleY) {
			return true;
		}

		// In the mean time this only works with the collider component, 
		// because it is the only thing that can actually be editted right now
		var colliderGizmo = go.findComponents().firstWithType(editorConfig.getColliderGizmoId());
		var colliderComponent = colliderGizmo.getColliderComponent();

		return require('attribute-comparer').getChanges(colliderComponent);
	}

	var storeChildConfiguration = function(collection, child, id, isNew) {
		collection.push({ child: child, id: id, args: child.args, isNew: isNew});
	}

	return new ConfigurationCreator();
});
