define(function(require) {
  var gb = require('gb');
  var editorConfig = require('editor-config');
  var mainViewport = require('main-viewport');
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
		              setupGameObject.setupWithViewport(menu.go.typeId, menu.go.getUpdateGroup(), menu.go.getViewportList(), mainViewport.get());
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
                        replaceGameObject(menu.go, similarConfigurationId);
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

			          				// debugger;

			          				// Replace all the matching game objects with one of the new type
			          				for (var i = 0; i < gos.length; i++) {
			          					replaceGameObject(gos[i], similarConfigurationId);
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
          				var newConfigurationId = createNewConfiguration(menu.go);
          				replaceGameObject(menu.go, newConfigurationId);
          			}
          		},
          		{
          			name: 'New type to similar',
          			icon: 'ui-icon-copy',
          			click: function() {
          				// Get a collection of all the game objects currently active in the scene that are similar to the selected game object
          				var gos = gb.findGameObjectsOfType(menu.go);
          				// Create the new type
          				var newConfigurationId = createNewConfiguration(menu.go);
          				// Replace all the matching game objects with one of the new type
          				for (var i = 0; i < gos.length; i++) {
          					replaceGameObject(gos[i], newConfigurationId);
          				}
          			}
          		},
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

	    var createNewConfiguration = function(go) {          				
				// Remove the generated part of the name if any
				var nameRoot = go.typeId.split('->')[0]; 
				// Get count of Game Objects with a similar name
				var count = getSimilarGameObjectConfigurationCount(nameRoot);
				// Generate the new configuration name
      	var newConfigurationId = nameRoot + '->' + count;
      	// Create a new configuration
      	var newConfiguration = gb.goPool.createConfiguration(newConfigurationId, go.poolId);
				// Copy over the game object arguments to the new configuration
				newConfiguration.args(go.args);

				// Add components to the new configuration if there are any components to be added
				if (go.components) {
					for (var i = 0; i < go.components.length; i++) {
						var component = go.components[i];
						
						// Skip editor only components
						if (editorConfig.isEditorComponent(component)) continue;

						newConfiguration.addComponent(component.typeId, component.Attributes);
					}
				}

				// If the game object is a container and it has children...
				if (go.isContainer() && go.childs) {
					// Add them to the new configuration
					
					for (var i = 0; i < go.childs.length; i++) {
						var child = go.childs[i];

						// Skip editor only game objects
						if (editorConfig.isEditorGameObject(child)) continue;

						// Create a new configurations for each child
						var childNewConfigurationId = createNewConfiguration(go.childs[i]);
						// Add the child to the new configuration
						newConfiguration.addChild(childNewConfigurationId, go.childs[i].args);											
					}
				}

				// Add the renderer to the new configuration
				newConfiguration.setRenderer(go.renderer.typeId, go.renderer.args);

				// Return the id of the new confifguration
				return newConfigurationId;
	    }

	    var replaceGameObject = function(go, newConfigurationId) {
	    	var group = go.getUpdateGroup(); 
				var viewports = JSON.parse(JSON.stringify(go.getViewportList()));
	    	var position = { x: go.x, y: go.y };

	    	// Remove the old game object	    	
				gb.reclaimer.claim(go);

				var setupGameObject = require('setup-editable-game-object');
	    	// Add the new object in the place of the old one
	    	setupGameObject.setup(newConfigurationId, group, viewports, position);
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