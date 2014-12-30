define(function(require) {
  var gb = require('gb');
  var editorConfig = require('editor-config');
  var menuUI = require('menu');
 	
  var attributeAssigner = require('attribute-assigner');
 	var configurationCreator = require('configuration-creator');
 	var gameObjectCloner = require('game-object-cloner');

  var GameObjectContextMenu = require('ui-component').extend({
    init: function() {
    	
    },

    create: function() {
      var contextMenu = (new menuUI()).create({
        id: 'game-object-context-menu',
        options: [
        	{
          	name: 'Create',
          	icon: 'ui-icon-plusthick',

          	options: [
          		{
		            name: 'Clone',
		            icon: 'ui-icon-bullet',
		            click: function() {
		            	gameObjectCloner.clone(menu.go);
		            }
		          },
		          {
          			name: 'Type',
          			icon: 'ui-icon-bullet',
          			click: function() {         					
         					// Create a new configuration for the game object that was clicked on
         					var newConfigurationId = configurationCreator.createFromGameObject(menu.go, {force: true});
         					// Replace the original with a new one created with the new configuration
          				replaceGameObject(menu.go, newConfigurationId);	
          			}
          		}
          	]
          },
          {
          	name: 'Replace', 
          	icon: 'ui-icon-transferthick-e-w',

          	options: [
	          	{
	        			name: 'This',
	        			icon: 'ui-icon-bullet',

	        			options: function() {
	                return editorConfig.getGameObjects({filterChilds: false}).map(function (configurationId) {
	                  return {
	                    name: configurationId,
	                    icon: 'ui-icon-bullet',
	                    click: function (configurationId) {
	                    	replaceGameObject(menu.go, configurationId);
	                    }
	                  }
	                });
	              }
	        		},
	        		{
	        			name: 'All',
	        			icon: 'ui-icon-bullet',
	        			options: function() {
	                return editorConfig.getGameObjects({filterChilds: false}).map(function (configurationId) {
	                  return {
	                    name: configurationId,
	                    icon: 'ui-icon-bullet',
	                    click: function (configurationId) {
	                      // Get a collection of all the game objects currently active in the scene that are similar to the selected game object
			          				var gos = gb.findGameObjectsOfType(menu.go);

			          				// Replace all the matching game objects with one of the new type
			          				for (var i = 0; i < gos.length; i++) {
			          					replaceGameObject(gos[i], configurationId);
			          				}
	                    }
	                  }
	                });
	              }
	        		}
          	]
          },
          {
            name: 'Viewports',
            icon: 'ui-icon-wrench',
            
            disable: function() { 
            	if (menu) {
            		return menu.go.isChild(); 
            	}

            	return false;
            },

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
		          }
            ]
          },
          {
            name: 'Scrap',
            icon: 'ui-icon-trash',

            options: function() {
            	var scrapOptions = [];

            	scrapOptions.push({
          			name: 'This',
          			icon: 'ui-icon-bullet',
          			click: function() {
          				// Remove the selected game object
          				gb.reclaimer.claim(menu.go);		
          			}
          		});

          		scrapOptions.push({
          			name: 'All',
          			icon: 'ui-icon-bullet',
          			click: function() {
          				// Get a collection of all the game objects currently active in the scene that are similar to the selected game object
          				var gos = gb.findGameObjectsOfType(menu.go);

          				// Remove all the matching game objects
          				for (var i = 0; i < gos.length; i++) {
          					gb.reclaimer.claim(gos[i]);
          				}		
          			}
          		});

          		if (menu.go.typeId.match('->')) {
          			scrapOptions.push({
	          			name: 'Type',
	          			icon: 'ui-icon-bullet',
	          			click: function() {
	          				// Delete the configuration of the selected game object and delete all the game objects with the same configuration
	          				// Including itself
	          				gb.reclaimer.clearGameObjectConfiguration(menu.go.typeId);
	          			}
	          		});
          		}

            	return scrapOptions;
            }
          }
        ]
      });

		  var replaceGameObject = function(go, newConfigurationId) {
	    	// If the new configuration is null, it means that nothing was created because it wasn't needed
	    	if (!newConfigurationId) return;    	
	    	// Add the new object in the place of the old one
	    	require('setup-editable-game-object').setupWithGameObject(newConfigurationId, go);
	    	// Remove the old game object	    	
				gb.reclaimer.claim(go);
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
        	this.go = null;
 	       	this.v = null;
        	this.l = null;

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