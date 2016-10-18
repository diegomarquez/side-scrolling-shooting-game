define(function(require) {
	var wrapper = require('wrap-in-div');
	var gb = require('gb');
	var componentFactory = require('ui-component-factory');

	var sceneSaveDialog = require('scene-save-ui');
	var sceneLoadDialog = require('scene-load-ui');
	var sceneDeleteDialog = require('scene-delete-ui');

	var listCreator = require('list');

	var editorRegions = require('editor-regions');

	var EditorSideMenu = require('ui-component').extend({
		init: function() {
			this._super();

			this.saveDialog = new sceneSaveDialog();
			this.loadDialog = new sceneLoadDialog();
			this.deleteDialog = new sceneDeleteDialog();

			this.tooltipListCreator = new listCreator();

			this.canvasTooltipContent = this.tooltipListCreator.create({
				id: 'canvas-section-tooltip',
				items: [
					{
						type: 'item',
						content: 'Drag objects with the mouse.'
					},
					{
						type: 'item',
						content: 'Right click on objects to show a context menu.'
					},
					{
						type: 'item',
						content: 'Right click on empty space to show a global context menu from which to create objects.'
					}
				]
			});

			this.settingsTooltipContent = this.tooltipListCreator.create({
				id: 'settings-section-tooltip',
				items: [
					{
						type: 'item',
						content: 'Toggle the grid on and off.'
					},
					{
						type: 'item',
						content: 'Toggle snap to grid when dragging objects.'
					},
					{
						type: 'item',
						content: 'Toggle collider, rotation and scale handles on all game objects.'
					},
					{
						type: 'item',
						content: 'Change the size of the world.'
					}
				]
			});

			this.gameObjectsTooltipContent = this.tooltipListCreator.create({
				id: 'game-objects-section-tooltip',
				items: [
					{
						type: 'item',
						content: 'Choose between different objects to create.'
					},
					{
						type: 'item',
						content: "Edit custom types created from an object's context menu."
					},
					{
						type: 'item',
						content: "Clear all the objects."
					}
				]
			});

			this.viewportsTooltipContent = this.tooltipListCreator.create({
				id: 'viewports-section-tooltip',
				items: [
					{
						type: 'item',
						content: "Do stuff with viewports man."
					}
				]
			});
		},

		create: function() {
			var ul = document.createElement('ul');
			ul.id = 'editor-side-menu';

			$(ul).addClass('nav nav-list');

			var items = [];

			items.push(createTitleItem('Untitled', 'side-menu-scene-title'));

			items.push(createDivider());

			items.push(createTitleItem('Preview'));

			items.push(createOptionItem(
				'Play',
				'glyphicon-play-circle',
				function() {
					var storage = require('local-storage');
					var serializer = require('scene-serializer');

					try {
						storage.setPreviewScene(serializer.serialize(require('scene-name').get()));
						this.execute(this.PREVIEW);
					} catch (e) {
						var logger = gb.game.get_extension(require('logger'));

						logger.error('Error previewing the scene.');
						logger.show();

						setTimeout(logger.hide, 10000);
					}
				}.bind(this)
			));

			items.push(createDivider());

			items.push(createTitleItem('Sections'));

			items.push(createRegionOptionItem(
				'Canvas',
				'glyphicon-question-sign',
				null,
				null,
				this.canvasTooltipContent.html.outerHTML,
				editorRegions.get().getTopLeft()[0],
				function (event) {

				}
			));

			var misc = createRegionOptionItem(
				'Misc. Settings',
				'glyphicon-question-sign',
				'glyphicon-eye-open',
				'glyphicon-eye-close',
				this.settingsTooltipContent.html.outerHTML,
				editorRegions.get().getTopRight()[0],
				function (event) {
					toogleDisplay(editorRegions.get().getTopRightContainer()[0]);
				}
			);

			items.push(misc);

			var gos = createRegionOptionItem(
				'Game Objects',
				'glyphicon-question-sign',
				'glyphicon-eye-open',
				'glyphicon-eye-close',
				this.gameObjectsTooltipContent.html.outerHTML,
				editorRegions.get().getBottomLeft()[0],
				function (event) {
					toogleDisplay(editorRegions.get().getBottomLeftContainer()[0]);
				}
			)

			items.push(gos);

			var viewports = createRegionOptionItem(
				'Viewports',
				'glyphicon-question-sign',
				'glyphicon-eye-open',
				'glyphicon-eye-close',
				this.viewportsTooltipContent.html.outerHTML,
				editorRegions.get().getBottomRight()[0],
				function (event) {
					toogleDisplay(editorRegions.get().getBottomRightContainer()[0]);
				}
			)

			items.push(viewports);

			items.push(createDivider());

			items.push(createTitleItem('Storage'));

			items.push(createOptionItem(
				'New',
				'glyphicon-file',
				function() {
					require('scene-name').set('Untitled');
					gb.reclaimer.clearAllObjectsFromPools().now();
					// Re-Create editor specific game objects
					require('editor-setup').setupGameObjects();
					$('#remove-toggle-button input').bootstrapToggle('off');
				}
			));

			items.push(createOptionItem(
				'Save',
				'glyphicon-floppy-save',
				function() { this.open() }.bind(this.saveDialog)
			));

			items.push(createOptionItem(
				'Open',
				'glyphicon-folder-open',
				function() { this.open() }.bind(this.loadDialog)
			));

			items.push(createOptionItem(
				'Delete',
				'glyphicon-trash',
				function() { this.open() }.bind(this.deleteDialog)
			));

			items.push(createDivider());
			items.push(createTitleItem('Share'));

			items.push(createOptionItem(
				'Facebook',
				'fa-facebook-official',
				function() {
					// TODO: Replace the facebook icon with a spinning icon
					// TODO: Block the UI

					require('fb').share(
					function() {
						// TODO: Add the facebook icon back
						// TODO: UnBlock the UI
					},
					function() {
						// TODO: Add the facebook icon back
						// TODO: UnBlock the UI
						// TODO: Show feedback dialog
					});
				},
				'fa fa-lg'
			));

			items.push(createDivider());
			items.push(createTitleItem('Misc.'));

			if (require('mode').isAdvanced()) {
				items.push(createToggleOptionItem(
					'Activity Display',
					'glyphicon-eye-close',
					'glyphicon-eye-open',
					function() {
						gb.game.get_extension(require('activity-display')).toggle();
					}.bind(this)
				));
			}

			var loggerItem = createToggleOptionItem(
				'Log',
				'glyphicon-eye-close',
				'glyphicon-eye-open',
				function() {
					gb.game.get_extension(require('logger')).toggle();
				}.bind(this)
			);

			gb.game.on(gb.game.EXTENSION_ADDED, this, function(extension) {
				if (extension.constructor === require('logger')) {
					extension.onShow = function() {
						$(loggerItem).find('.side-menu-icon').toggle();
					};

					extension.onHide = function() {
						$(loggerItem).find('.side-menu-icon').toggle();
					};
				}
			});

			items.push(loggerItem);

			items.push(createDivider());

			items.push(createOptionItem(
				'Exit',
				'glyphicon-log-out',
				function() { this.execute(this.EXIT) }.bind(this)
			));

			$(items).each(function(index, element) {
				this.tabIndex = index;
			})

			$(ul).append($(items));

			var component = componentFactory.getController(wrapper.wrap(ul, { id: 'editor-side-menu-wrapper' }));

			component.update = function() {
				toggledCount = 4;

				if (require('mode').isBasic()) {
					$(misc).click();
					$(gos).click();
					$(viewports).click();

					viewports.style.display = 'none';
					gos.style.display = 'none';
				}
			}

			return component;
		}
	});

	var createTitleItem = function(content, className) {
		var li = createItem(content);

		$(li).addClass('nav-header');

		if (className) {
			$(li).addClass(className);
		} else {
			$(li).addClass('side-menu-title');
		}

		return li;
	}

	var createOptionItem = function(content, iconName, onClick, iconFamily) {

		if (!iconFamily)
			iconFamily = 'glyphicon';

		var li = document.createElement('li');
		var a = document.createElement('a');

		a.href = '#'
		a.innerHTML = content;

		$(li).append(a);
		$(li).addClass('side-menu-item');

		$(li).on('click', onClick);

		var icon = document.createElement('span');
		$(icon).addClass('side-menu-icon');
		$(icon).addClass('main-side-menu-icon');
		$(icon).addClass('icon-white');
		$(icon).addClass(iconFamily);
		$(icon).addClass(iconName);
		$(a).append(icon);

		return li;
	}

	var createToggleOptionItem = function(content, onIcon, offIcon, onClick) {
		var li = createOptionItem(content, onIcon, function() {
			onClick();

			$(li).find('.side-menu-icon').toggle();
		});

		var iconAnchor = $(li).find('a');
		var off = document.createElement('span');

		$(off).addClass('side-menu-icon');
		$(off).addClass('glyphicon icon-white');
		$(off).addClass(offIcon);

		off.style.display = 'none';

		$(iconAnchor).append(off);

		return li;
	}

	var createRegionOptionItem = function(title, iconName, onIcon, offIcon, description, relatedRegionElement, onClick) {
		var li = createOptionItem(title, iconName, function() {
			onClick();

			if (onIcon && offIcon) {
				$(li).find('.secondary-side-menu-icon').toggle();
			}
		});

		var iconAnchor = $(li).find('a');
		var on, off;

		if (onIcon && offIcon) {
			on = document.createElement('span');

			$(on).addClass('side-menu-icon');
			$(on).addClass('secondary-side-menu-icon');
			$(on).addClass('glyphicon icon-white');
			$(on).addClass(onIcon);
			$(iconAnchor).append(on);

			off = document.createElement('span');

			$(off).addClass('side-menu-icon');
			$(off).addClass('secondary-side-menu-icon');
			$(off).addClass('glyphicon icon-white');
			$(off).addClass(offIcon);
			off.style.display = 'none';

			$(iconAnchor).append(off);
		}

		var a = $(li).find('.main-side-menu-icon');

		a.attr('data-toogle', 'popover');
		a.attr('data-placement', 'right');
		a.attr('data-html', true);
		a.attr('title', title);
		a.attr('data-content', description);

		$(a).on('mouseenter', function() {
			a.popover({
				container: 'body'
			}).on("show.bs.popover", function() {
				$(this).data("bs.popover").tip().css({ maxWidth: "350px" });
			});

			a.popover('show');
		});

		$(a).on('mouseleave', function() {
			a.popover('destroy');
		});

		$(li).on('mouseenter', function() {
			relatedRegionElement.style.border = '1px solid #f0ad4e';
		});

		$(li).on('mouseleave', function() {
			relatedRegionElement.style.border = '';
		});

		return li;
	}

	var createDivider = function() {
		var li = document.createElement('li');

		$(li).addClass('divider');

		return li;
	}

	var createItem = function(content) {
		var li = document.createElement('li');
		li.innerHTML = content;

		return li;
	}

	var toggledCount = 4;

	var toogleDisplay = function(element) {
		if (element.style.display == '') {
			element.style.display = 'none';
			toggledCount--;
		} else {
			element.style.display = '';
			toggledCount++;
		}

		if (toggledCount == 1) {
			$('.region').css({ width: '100%', height: '100%'});
		}

		if (toggledCount == 2) {
			$('.region').css({ width: '100%', height: '50%'});
		}

		if (toggledCount == 3) {
			$('.region').css({ width: '50%', height: '50%'});
		}

		if (toggledCount == 4) {
			$('.region').css({ width: '50%', height: '50%'});
		}

		if (gb.game.get_extension(require('fit-canvas-in-region'))) {
			gb.game.get_extension(require('fit-canvas-in-region')).fit();
		}
	}

	Object.defineProperty(EditorSideMenu.prototype, "EXIT", { get: function() { return 'exit'; } });
	Object.defineProperty(EditorSideMenu.prototype, "PREVIEW", { get: function() { return 'preview'; } });

	return EditorSideMenu;
});