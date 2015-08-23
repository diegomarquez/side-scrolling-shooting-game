define(function(require) {
	var gb = require('gb');

	var ControlObjectContextMenu = require('ui-component').extend({
		init: function() {
				
		},

		create: function() {
			var self = this;

			var contextMenu = new (require('menu'))().create({
				id: 'control-object-context-menu',
				options: [
					{
						name: 'Remove',
						icon: 'ui-icon-trash',		
						click: function(name, event) {
							if (menu.go.poolId == 'AngleDirectionSetter') {
								gb.reclaimer.mark(menu.go);
							} else {
								gb.reclaimer.mark(menu.go.parent);
							}
						}		
					}
				]
			});

			var menu = {
				go: null,
				menu: contextMenu,

				show: function (mouseData) {
					this.go = mouseData.go;
					
					this.menu.show(mouseData.globalMouseX, mouseData.globalMouseY);

					this.removeHideEvents();
					this.addHideEvents();
				},

				hide: function () {
					this.go = null;

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

	return ControlObjectContextMenu;
});