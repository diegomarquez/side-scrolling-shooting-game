define(function(require) {
	var gb = require('gb');

	var GlobalContextMenu = require('ui-component').extend({
		init: function() {
				
		},

		create: function(gameObjectSelectorUI, controlObjectSelectorUI, customTypesSelectorUI) {
			var self = this;

			var contextMenu = new (require('menu'))().create({
				id: 'global-context-menu',
				options: [
					{
						name: 'Add Game Object',
						icon: 'ui-icon-plusthick',		
						click: function(name, event) {
							gameObjectSelectorUI.toButtons();
							gameObjectSelectorUI.show(event);
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

	return GlobalContextMenu;
});