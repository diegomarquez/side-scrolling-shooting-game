define(function(require) {
	var gb = require('gb');
	var editorConfig = require('editor-config');
	var menuUI = require('menu');
	
	var attributeAssigner = require('attribute-assigner');
	var configurationCreator = require('configuration-creator');
	var gameObjectCloner = require('game-object-cloner');

	var newTypeDialog = require('new-type-dialog');
	var editTypeDialog = require('edit-type-dialog');

	var GameObjectContextMenu = require('ui-component').extend({
		init: function() {
			this.newTypeDialog = null;
			this.editTypeDialog = null;
		},

		create: function() {
			var self = this;

			var contextMenu = (new menuUI()).create({
				id: 'game-object-context-menu',
				options: [
					{
						name: function() {
							return menu.go.typeId;
						},
						icon: 'ui-icon-caret-1-e',
						disable: true
					},
					{
						name: 'Clone',
						icon: 'ui-icon-plusthick',

						omit: function() {
							return require('mode').isAdvanced();
						},

						click: function() {

							if (require('object-counter').canCreate()) {
								require('object-counter').showErrorFeedback();
								return;
							}

							gameObjectCloner.clone(menu.go);
						}
					},
					{
						name: 'Create',
						icon: 'ui-icon-plusthick',

						omit: function() {
							return require('mode').isBasic();
						},

						options: [
							{
								name: 'Clone',
								icon: 'ui-icon-bullet',
								click: function() {
									if (require('object-counter').canCreate()) {
										require('object-counter').showErrorFeedback();
										return;
									}

									gameObjectCloner.clone(menu.go);
								}
							},
							{
								name: 'Type',
								icon: 'ui-icon-bullet',
								click: function() {
									self.newTypeDialog = new newTypeDialog();

									var go = menu.go;

									// Show the dialog to edit the new configuratio's name
									self.newTypeDialog.open(configurationCreator.getNewConfigurationName(go), function(configurationName) {
										// Create a new configuration for the game object that was clicked on
										configurationCreator.createFromGameObject(
											go,
											{
												force: true,
												configurationId: configurationName
											}
										);
										// Replace the original with a new one created with the new configuration
										replaceGameObject(go, configurationName);
									});
								}
							}
						]
					},
					{
						name: 'Viewports',
						icon: 'ui-icon-wrench',
						
						omit: function() {
							return require('mode').isBasic();
						},

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
											
											disable: function() {
												return isInViewport(menu.go, viewportName) || !gb.viewports.get(viewportName).layerExists(menu.l);  
											},
											
											click: function (newViewport) {
												gb.viewports.get(newViewport).addGameObject(menu.l, menu.go);
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
						name: 'Move',
						icon: 'ui-icon-transferthick-e-w',

						options: [
							{
								name: 'To Front',
								icon: 'ui-icon-bullet',
								click: function() {
									menu.v.getLayer(menu.l).moveGameObjectToFront(menu.go);
								}
							},

							{
								name: 'To Back',
								icon: 'ui-icon-bullet',
								click: function() {
									menu.v.getLayer(menu.l).moveGameObjectToBack(menu.go);
								}
							}
						]
					},
					{
						name: 'Edit',
						icon: 'ui-icon-wrench',

						options: function() {
							var editOptions = [];

							editOptions.push({
								name: 'Collider',
								icon: 'ui-icon-radio-off',
								click: function() {
									require('colliders-toggle-ui').showAllColliderLayers();

									menu.go.toggleVisibility(true).recurse().ommitSelf().all(function (child) {
										return editorConfig.isColliderGizmoGameObject(child.typeId);
									});
								}
							});

							editOptions.push({
								name: 'Rotation',
								icon: 'ui-icon-arrowrefresh-1-w',
								click: function() {
									require('rotation-toggle-ui').showAllRotationLayers();
									
									menu.go.toggleVisibility(true).recurse().ommitSelf().all(function (child) {
										return editorConfig.isRotationGizmoGameObject(child.typeId);
									});
								}
							});

							editOptions.push({
								name: 'Scale',
								icon: 'ui-icon-arrow-2-se-nw',
								click: function() {
									require('scale-toggle-ui').showAllScaleLayers();
									
									menu.go.toggleVisibility(true).recurse().ommitSelf().all(function (child) {
										return editorConfig.isScaleGizmoGameObject(child.typeId);
									});
								}
							});

							if (gb.goPool.isConfigurationCustom(menu.go.typeId)) {
								editOptions.push({
									name: 'Type',
									icon: 'ui-icon-bullet',
									click: function() {
										self.editTypeDialog = new editTypeDialog(true, false);

										// Show the dialog to edit the new configuratio's name
										self.editTypeDialog.open(menu.go.typeId);

										self.editTypeDialog.on('edit', this, function (newConfigurationName, oldConfigurationName) {
											gb.goPool.updateConfigurationId(oldConfigurationName, newConfigurationName);
										});
									}
								});
							}

							return editOptions;
						}
					},
					{
						name: 'Remove',
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

							if (gb.goPool.isConfigurationCustom(menu.go.typeId)) {
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
				var newGo = require('setup-editable-game-object').setupWithGameObject(newConfigurationId, go);
				
				if (newGo) {
					require('object-counter').count(newGo);
					require('object-counter').showSuccessFeedback();
				}

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
					gb.Mouse.on(gb.Mouse.CANVAS_CONTEXT_MENU, this, this.hideMenu);
					gb.Mouse.on(gb.Mouse.CLICKED_OUTSIDE_CANVAS, this, this.checkBelongsThenHide);
				},

				removeHideEvents: function() {
					gb.Mouse.remove(gb.Mouse.NOTHING_CLICKED_ON_CANVAS, this, this.hideMenu);
					gb.Mouse.remove(gb.Mouse.CANVAS_CONTEXT_MENU, this, this.hideMenu);
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