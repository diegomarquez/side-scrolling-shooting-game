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
						name: function() {
							return new Promise(function(resolve, reject) {
								require(['editor-config'], function(editorConfig) {

									if (menu.go.poolId === "IconGizmoHandle") {
										resolve(editorConfig.getControlObjectAliasName(menu.go.parent.typeId));
									} else {
										resolve(editorConfig.getControlObjectAliasName(menu.go.typeId));
									}

								});
							});
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

							require(['game-object-cloner'], function(cloner) {
								if (menu.go.poolId == 'AngleDirectionSetter') {
									cloner.clone(menu.go);
								} else if (menu.go.poolId == 'AbsoluteScrollStopper') {
									cloner.clone(menu.go);
								} else if (menu.go.poolId == 'TwoWayDirectionSetter') {
									cloner.clone(menu.go);
								} else if (menu.go.poolId == 'BGMSound') {
									cloner.clone(menu.go);
								} else {
									cloner.clone(menu.go.parent);
								}
							});
						}
					},
					{
						name: 'Remove',
						icon: 'ui-icon-trash',
						click: function(name, event) {
							if (menu.go.poolId == 'AngleDirectionSetter') {
								gb.reclaimer.mark(menu.go);
							} else if (menu.go.poolId == 'AbsoluteScrollStopper') {
								gb.reclaimer.mark(menu.go);
							} else if (menu.go.poolId == 'TwoWayDirectionSetter') {
								gb.reclaimer.mark(menu.go);
							} else if (menu.go.poolId == 'BGMSound') {
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