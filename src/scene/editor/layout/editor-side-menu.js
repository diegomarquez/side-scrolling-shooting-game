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
						content: 'View the created objects.'
					},
					{
						type: 'item',
						content: 'Drag them around the world.'
					},
					{
						type: 'item',
						content: 'Right click on them for more editing options.'
					},
					{
						type: 'item',
						content: 'Use the scrollbars to view all the world.'
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
						content: 'Change the size of the world.'
					}
				]
			});

			this.gameObjectsTooltipContent = this.tooltipListCreator.create({
				id: 'game-objects-section-tooltip',
				items: [
					{
						type: 'item',
						content: 'Choose an object type to create.'
					},
					{
						type: 'item',
						content: 'Choose the viewports the object will appear in. Drag on the menu to select more than one viewport.'
					}
				]
			});

			this.viewportsTooltipContent = this.tooltipListCreator.create({
				id: 'viewports-section-tooltip',
				items: [
					{
						type: 'item',
						content: 'Add new viewports.'
					},
					{
						type: 'item',
						content: 'Edit them after creation.'
					},
					{
						type: 'item',
						content: 'Sort them to change drawing order by draggin them in their container.'
					},
					{
						type: 'item',
						content: 'Add, remove and sort layers of each viewport.'
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

					storage.setPreviewScene(serializer.serialize('PREVIEW'));
					this.execute(this.PREVIEW); 
				}.bind(this)
			));

			items.push(createDivider());

			items.push(createTitleItem('Sections'));

			items.push(createRegionOptionItem(
				'Canvas', 
				'glyphicon-question-sign', 
				this.canvasTooltipContent.html.outerHTML, 
				editorRegions.get().getTopLeft()[0],
				function (event) {
					// toogleDisplay(editorRegions.get().getTopLeftContainer()[0]);
				}
			));
			
			items.push(createRegionOptionItem(
				'Misc. Settings', 
				'glyphicon-question-sign', 
				this.settingsTooltipContent.html.outerHTML, 
				editorRegions.get().getTopRight()[0],
				function (event) {
					toogleDisplay(editorRegions.get().getTopRightContainer()[0]);
				}
			));
			
			items.push(createRegionOptionItem(
				'Game Objects', 
				'glyphicon-question-sign', 
				this.gameObjectsTooltipContent.html.outerHTML, 
				editorRegions.get().getBottomLeft()[0],
				function (event) {
					toogleDisplay(editorRegions.get().getBottomLeftContainer()[0]);
				}
			));
			
			items.push(createRegionOptionItem(
				'Viewports', 
				'glyphicon-question-sign', 
				this.viewportsTooltipContent.html.outerHTML, 
				editorRegions.get().getBottomRight()[0],
				function (event) {
					toogleDisplay(editorRegions.get().getBottomRightContainer()[0]);
				}
			));

			items.push(createDivider());

			items.push(createTitleItem('Storage'));
			items.push(createOptionItem(
				'Save', 
				'glyphicon-floppy-save', 
				function() { this.open() }.bind(this.saveDialog)
			));

			items.push(createOptionItem(
				'Open', 
				'glyphicon-floppy-open', 
				function() { this.open() }.bind(this.loadDialog)
			));
			
			items.push(createOptionItem(
				'Delete', 
				'glyphicon-trash', 
				function() { this.open() }.bind(this.deleteDialog)
			));

			items.push(createDivider());
			items.push(createTitleItem('Misc.'));

			items.push(createOptionItem(
				'Activity Display', 
				'glyphicon-eye-open', 
				function() {  
					gb.game.get_extension(require('activity-display')).toggle();
				}.bind(this)
			));

			items.push(createOptionItem(
				'Log', 
				'glyphicon-eye-open', 
				function() {  
					gb.game.get_extension(require('logger')).toggle();
				}.bind(this)
			));

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

			return componentFactory.getController(wrapper.wrap(ul, { id: 'editor-side-menu-wrapper' }));
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

	var createOptionItem = function(content, iconName, onClick) {
		var li = document.createElement('li'); 
		var a = document.createElement('a');

		a.href = '#'
		a.innerHTML = content;

		$(li).append(a);
		$(li).addClass('side-menu-item');
		
		$(li).on('click', onClick);
	 
		var icon = document.createElement('span');
		$(icon).addClass('side-menu-icon');
		$(icon).addClass('glyphicon icon-white');
		$(icon).addClass(iconName);
		$(a).append(icon);

		return li;
	}

	var createRegionOptionItem = function(title, iconName, description, relatedRegionElement, onClick) {
		var li = createOptionItem(title, iconName, onClick);

		var a = $(li).find('.side-menu-icon');
		
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

		gb.game.get_extension(require('fit-canvas-in-region')).fit();
	}

	Object.defineProperty(EditorSideMenu.prototype, "EXIT", { get: function() { return 'exit'; } });
	Object.defineProperty(EditorSideMenu.prototype, "PREVIEW", { get: function() { return 'preview'; } });

	return EditorSideMenu;
});