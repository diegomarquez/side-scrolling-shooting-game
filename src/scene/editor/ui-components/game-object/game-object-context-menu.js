define(function(require) {
  var gb = require('gb');
  var editorConfig = require('editor-config');
  var mainViewport = require('main-viewport');
  var attributeComparer = require('attribute-comparer');
  var util = require('util');
  var menuUI = require('menu');
 
  var GameObjectContextMenu = require('ui-component').extend({
    init: function() {
    	
    },

    create: function() {
      var contextMenu = (new menuUI()).create({
        id: 'game-object-context-menu',
        options: [
        	{
          	name: 'Create',
          	icon: 'ui-icon-wrench',

          	options: [
          		{
		            name: 'Clone',
		            icon: 'ui-icon-plusthick',
		            click: function() {
		            	var setupGameObject = require('setup-editable-game-object');
		            	// Clone the game object
		              var clone = setupGameObject.setupWithViewport(menu.go.typeId, menu.go.getUpdateGroup(), menu.go.getViewportList(), mainViewport.get());
		              require('attribute-assigner').assignFrom(menu.go, clone);
		            }
		          },
          		{
          			name: 'Swap with similar',
          			icon: 'ui-icon-transferthick-e-w',

          			options: function() {
          				var similarConfigurations = getSimilarGameObjectConfigurations(menu.go.typeId);

                  return similarConfigurations.map(function (similarConfigurationId) {
                    return {
                      name: similarConfigurationId,
                      icon: 'ui-icon-bullet',
                      disable: similarConfigurationId == menu.go.typeId,
                      click: function (similarConfigurationId) {
                      	copyChangesFromConfiguration(menu.go, similarConfigurationId);
                      }
                    }
                  });
                }
          		},
          		{
          			name: 'Swap all with similar',
          			icon: 'ui-icon-transferthick-e-w',
          			options: function() {
          				var similarConfigurations = getSimilarGameObjectConfigurations(menu.go.typeId);

                  return similarConfigurations.map(function (similarConfigurationId) {
                    return {
                      name: similarConfigurationId,
                      icon: 'ui-icon-bullet',
                      disable: similarConfigurationId == menu.go.typeId,
                      click: function (similarConfigurationId) {
                        // Get a collection of all the game objects currently active in the scene that are similar to the selected game object
			          				var gos = gb.findGameObjectsOfType(menu.go);

			          				// Replace all the matching game objects with one of the new type
			          				for (var i = 0; i < gos.length; i++) {
			          					copyChangesFromConfiguration(gos[i], similarConfigurationId);
			          				}
                      }
                    }
                  });
                }
          		},
          		{
          			name: 'New Type',
          			icon: 'ui-icon-plusthick',
          			click: function() {
         					// Create a new type from the game object that was clicked on
         					// New types for child game objects will be created as needed
          				replaceGameObject(menu.go, createNewConfiguration(menu.go, true));
          			}
          		}
          	]
          },
          {
            name: 'Viewports',
            icon: 'ui-icon-wrench',

            options: [
              {
                name: 'Add To',
                icon: 'ui-icon-plusthick',
                options: function() {
                  var viewports = editorConfig.getViewports().map(function(viewport) { return viewport.name; });

                  return viewports.map(function(viewportName) {
                    return {
                      name: viewportName,
                      icon: 'ui-icon-bullet',
                      disable: isInViewport(menu.go, viewportName),
                      click: function (newViewport) {
                        var success = gb.viewports.get(newViewport).addGameObject(menu.l, menu.go);

                        // TODO: Give this feedback properly
                        if (!success) {
                          console.log('Destination Viewport must have a layer named' + menu.l);
                        }
                      }
                    }
                  });
                }
              },
              {
                name: 'Remove From',
                icon: 'ui-icon-minusthick',
                options: function() {
                  var viewports = editorConfig.getViewports().map(function(viewport) { return viewport.name; });

                  return viewports.map(function(viewportName) {
                    return {
                      name: viewportName,
                      icon: 'ui-icon-bullet',
                      disable: !isInViewport(menu.go, viewportName),
                      click: function (removeFromViewport) {
                        gb.viewports.get(removeFromViewport).removeGameObject(menu.l, menu.go);
                      }
                    }
                  });
                }
              },
              {
                name: 'Remove Current',
                icon: 'ui-icon-minusthick',
                click: function () {
                  menu.v.removeGameObject(menu.l, menu.go);
                }
              }
            ]
          },
          {
            name: 'Change layer',
            icon: 'ui-icon-transferthick-e-w',
            
            options: function() {
              return editorConfig.getViewportLayers(menu.v).map(function(layerName) {
                return {
                  name: layerName,
                  icon: 'ui-icon-bullet',
                  disable: menu.l == layerName,
                  click: function (newLayer) {
                    menu.v.moveGameObject(menu.l, newLayer, menu.go);
                  }
                }
              });
            }
          },
          {
            name: 'Scrap',
            icon: 'ui-icon-trash',
            click: function() {
              gb.reclaimer.claim(menu.go);
            }
          }
        ]
      });

			var getSimilarGameObjectConfigurationCount = function(id) {
	    	return getSimilarGameObjectConfigurations(id).length;
	    }

	    var getSimilarGameObjectConfigurations = function(id) {
	    	var configurationTypes = gb.goPool.getConfigurationTypes();

	    	var nameRoot = id.split('->')[0];

	    	var result = [];

	    	for (var i = 0; i < configurationTypes.length; i++) {
	    		if (configurationTypes[i].search(nameRoot) != -1) {
	    			result.push(configurationTypes[i]);
	    		}
	    	}

	    	return result;
	    }

	    var getNewConfigurationName = function (go) {
				// Remove the generated part of the name if any
				var nameRoot = go.typeId.split('->')[0]; 
				// Get count of Game Objects with a similar name
				var count = getSimilarGameObjectConfigurationCount(nameRoot);
				// Generate the new configuration name
      	return nameRoot + '->' + count;
			}

			var hasChanges = function(go) {
				// In the mean time this only works with the collider component, 
				// because it is the only thing that can actually be editted right now

				var colliderGizmo = go.findComponents().firstWithType(editorConfig.getColliderGizmoId());
      	var colliderComponent = colliderGizmo.getColliderComponent();
      	
      	return attributeComparer.getChanges(colliderComponent);
			}

	    var createNewConfiguration = function(go, forceCreation) {  
	    	var childConfigurations = {
					configurations: [],
					hasNew: false
				};

	    	// If the game object is a container and it has children...
				if (go.childs) {
					// Check if any of the children has any changes and therefore needs a new configuration

					for (var i = 0; i < go.childs.length; i++) {
						var child = go.childs[i];

						// Skip editor only game objects
						if (editorConfig.isEditorGameObject(child.typeId)) continue;

						// Create a new configurations for each child
						// This is recursive so children which in turn have children will also get new configurations
						var newChildConfigurationId = createNewConfiguration(go.childs[i]);
						
						// Was a new configuration created ? 
						if (newChildConfigurationId) {							
							childConfigurations.configurations.push({ 
								child: go.childs[i], 
								id: newChildConfigurationId, 
								args: go.childs[i].args 
							});	 
							
							childConfigurations.hasNew = true;
						} else {
							childConfigurations.configurations.push({ 
								child: go.childs[i], 
								id: go.childs[i].typeId, 
								args: go.childs[i].args 
							});
						}																	
					}
				} 

				// No new child configurations needed and no changes on itself, means this game object does not need a new configuration
				if (!childConfigurations.hasNew && !hasChanges(go) && !forceCreation) {
					return null;
				}
			
				// Generate the new configuration name
       	var newConfigurationId = getNewConfigurationName(go);

      	// Create a new configuration
      	var newConfiguration = gb.goPool.createConfiguration(newConfigurationId, go.poolId);
				// Copy over the game object arguments to the new configuration
				newConfiguration.args(go.args);

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
					var mergedArguments = util.shallow_merge(configuration.args, { x: configuration.child.x, y: configuration.child.y });

					newConfiguration.addChild(configuration.id, mergedArguments);
				}

				// Add the renderer to the new configuration
				newConfiguration.setRenderer(go.renderer.typeId, go.renderer.args);

				// Return the id of the new confifguration
				return newConfigurationId;
	   	}

		  var replaceGameObject = function(go, newConfigurationId) {
	    	// If the new configuration is null, it means that nothing was created because it wasn't needed
	    	if (!newConfigurationId) return;    	
	    	// Add the new object in the place of the old one
	    	require('setup-editable-game-object').setupWithGameObject(newConfigurationId, go);
	    	// Remove the old game object	    	
				gb.reclaimer.claim(go);
	    }

	    var copyChangesFromConfiguration = function(go, newConfigurationId) {
				// Create a new game object with the new configuration id to copy attributes from
				var newGo = require('setup-editable-game-object').setupWithGameObject(newConfigurationId, go);
				// Copy attributes recursively from the new game object into the selected one
				require('attribute-assigner').assignFrom(newGo, go);
        // Get rid of the temporary game object
        gb.reclaimer.claim(newGo);
			}

	    var isInViewport = function(go, viewportName) {
	      for (var i = 0; i < go.getViewportList().length; i++) {
	        var vo = go.getViewportList()[i];

	        if (vo.viewport === viewportName) {
	          return true;
	        }
	      }

	      return false;
	    }

      var menu = {
        menu: contextMenu,
        go: null,
        v: null,
        l: null,

        show: function (mouseData) {
          this.go = mouseData.go;
          this.v = mouseData.viewport;
          this.l = mouseData.layer;

          this.menu.show(mouseData.globalMouseX, mouseData.globalMouseY);

          this.removeHideEvents();
          this.addHideEvents();
        },

        hide: function () {
          this.menu.hide();
          this.removeHideEvents();
        },

        belongs: function (element) {
          return this.menu.belongs(element);
        },

        addHideEvents: function() {
          gb.Mouse.on(gb.Mouse.NOTHING_CLICKED_ON_CANVAS, this, this.hideMenu);
          gb.Mouse.on(gb.Mouse.CLICKED_OUTSIDE_CANVAS, this, this.checkBelongsThenHide);
        },

        removeHideEvents: function() {
          gb.Mouse.remove(gb.Mouse.NOTHING_CLICKED_ON_CANVAS, this, this.hideMenu);
          gb.Mouse.remove(gb.Mouse.CLICKED_OUTSIDE_CANVAS, this, this.checkBelongsThenHide);
        },

        hideMenu: function(event) {
          this.hide();
        },

        checkBelongsThenHide: function(event) {
          if (!this.belongs(event.target)) {
            this.hide();
          }
        }  
      };

      return menu;
    }
  });

  return GameObjectContextMenu;
});