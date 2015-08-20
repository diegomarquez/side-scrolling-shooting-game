define(function(require) {
	var gb = require('gb');

	var GlobalContextMenu = require('ui-component').extend({
		init: function() {
				
		},

		create: function(gameObjectSelectorUI, controlObjectSelectorUI, customTypesSelectorUI, gridControlsUI, gameObjectControlsUI) {
			var self = this;

			var contextMenu = new (require('menu'))().create({
				id: 'global-context-menu',
				options: [
					{
						name: 'Add Obstacle',
						icon: 'ui-icon-plusthick',		
						click: function(name, event) {
							gameObjectSelectorUI.toButtons();
							gameObjectSelectorUI.show(event, 'obstacle');
						}		
					},
					{
						name: 'Add Enemy',
						icon: 'ui-icon-plusthick',		
						click: function(name, event) {
							gameObjectSelectorUI.toButtons();
							gameObjectSelectorUI.show(event, 'enemy');
						}		
					},
					{
						name: 'Add Item',
						icon: 'ui-icon-plusthick',		
						click: function(name, event) {
							gameObjectSelectorUI.toButtons();
							gameObjectSelectorUI.show(event, 'item');
						}		
					},
					{
						name: 'Add Control Object',
						icon: 'ui-icon-plusthick',
						click: function(name, event) {
							controlObjectSelectorUI.show(event);
						}				
					},
					{
						name: 'Edit Custom Types',
						icon: 'ui-icon-pencil',	
						disable: function() {
							return gb.goPool.getConfigurationTypes({ customOnly: true }).length == 0;
						},			
						click: function(name, event) {
							customTypesSelectorUI.show(event);
						}
					},
					{
						name: 'Grid',
						icon: 'ui-icon-calculator',

						options: [
							{
								name: 'Show/Hide',
								icon: 'ui-icon-bullet',
								click: function(name, event) {
									gridControlsUI.toggleGrid();
								}
							},
							{
								name: 'Snap',
								icon: 'ui-icon-bullet',
								click: function(name, event) {
									gridControlsUI.toggleSnap();
								}
							}
						]						
					},
					{
						name: 'Game Object',
						icon: 'ui-icon-wrench',

						options: [
							{
								name: 'Colliders',
								icon: 'ui-icon-radio-off',
								click: function() {
									gameObjectControlsUI.toggleColliders();
								}
							},
							
							{
								name: 'Rotation',
								icon: 'ui-icon-arrowrefresh-1-w',
								click: function() {
									gameObjectControlsUI.toggleRotations();
								}
							},

							{
								name: 'Scale',
								icon: 'ui-icon-arrow-2-se-nw',
								click: function() {
									gameObjectControlsUI.toggleScales();
								}
							}
						]
					},
					{
						name: 'Misc.',
						icon: 'ui-icon-wrench',

						options: [
							{
								name: 'Rectangles',
								icon: 'ui-icon-stop',
								click: function() {
									gameObjectControlsUI.toggleBoundings();
								}
							},
							
							{
								name: 'Centers',
								icon: 'ui-icon-bullet',
								click: function() {
									gameObjectControlsUI.toggleCenters();
								}
							}
						]
					}
				]
			});

			var menu = {
				menu: contextMenu,

				show: function (x, y) {
					this.menu.show(x, y);

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
					gb.Mouse.on(gb.Mouse.GAME_OBJECT_CONTEXT_MENU, this, this.hideMenu);
					gb.Mouse.on(gb.Mouse.CLICKED_OUTSIDE_CANVAS, this, this.checkBelongsThenHide);
				},

				removeHideEvents: function() {
					gb.Mouse.remove(gb.Mouse.NOTHING_CLICKED_ON_CANVAS, this, this.hideMenu);
					gb.Mouse.remove(gb.Mouse.GAME_OBJECT_CONTEXT_MENU, this, this.hideMenu);
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

	return GlobalContextMenu;
});