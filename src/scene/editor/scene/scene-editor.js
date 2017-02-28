define(function(require) {
	require('jquery');
	require('jquery-ui');

	require('bootstrap');
	require('bootstrap-toogle');

	require('jscrollpane');

	var gb = require('gb');
	var util = require('util');
	var editorSetup = require('editor-setup');
	var editorDelegates = require('editor-delegates');
	var world = require('world');
	var canvasContainer = require('canvas-container');
	var sceneLoader = require('editor-scene-loader');

	var storage = require('local-storage');
	var serializer = require('scene-serializer');

	var SceneEditor = require("ui-component").extend({
		init: function() {
			this._super();
		},

		create: function(initialScene, backFromPreview) {
			// Create all the objects needed
			// Main Layout
			this.editorSideMenu = new (require('editor-side-menu'));
			this.editorRegions = require('editor-regions');

			// Top Left Components
			this.canvasScrollBarsUI = new (require('canvas-scroll-bars-ui'));

			// Top Right Components
			this.gridControlsUI = new (require('grid-controls-ui'));
			this.gameObjectControlsUI = new (require('game-object-controls-ui'));
			this.worldEditUI = new (require('world-edit-ui'));

			// Bottom Left Components
			this.gameObjectSelectorUI = new (require('game-object-selector-ui'));
			this.controlObjectSelectorUI = new (require('control-objects-selector-ui'));
			this.gameObjectCreatorUI = new (require('game-object-creator-ui'));
			this.customTypesEditorUI = new (require('edit-custom-types-ui'));
			this.gameObjectRemoveUI = new (require('game-object-remove-ui'));

			// Bottom Right Components
			this.viewportsUI = new (require('viewport-selector-ui'));
			// Current
			this.viewportCreateUI = new (require('viewport-creator-ui'));

			// Initial Setup of the editor
			editorSetup.begin(this);

			// Add everything to the DOM
			// Main Editor container
			this.mainContainer = document.createElement('div');
			this.mainContainer.id = 'main-editor-container';
			document.body.appendChild(this.mainContainer);

			this.editorRegionsController = this.editorRegions.create();
			this.editorSideMenuController = this.editorSideMenu.create();

			// Append the side menu container
			this.mainContainer.appendChild(this.editorSideMenuController.html);
			// Append the regions container
			this.mainContainer.appendChild(this.editorRegionsController.html);

			// Top Left Region
			// Canvas
			this.editorRegionsController.appendToTopLeft(canvasContainer.getCanvasContainer());
			// Scroll bars
			this.canvasScrollBarsUI.create();

			// Top Right Region
			// Grid Controls
			this.editorRegionsController.appendToTopRight(this.gridControlsUI.create());
			// Game Object Controls
			this.editorRegionsController.appendToTopRight(this.gameObjectControlsUI.create());
			// World Size
			this.editorRegionsController.appendToTopRight(this.worldEditUI.create());

			// Bottom Left Region
			// Game Object Selector
			this.editorRegionsController.appendToBottomLeft(this.gameObjectSelectorUI.create());
			// Control Objects Selector
			this.editorRegionsController.appendToBottomLeft(this.controlObjectSelectorUI.create());
			// Game Object Creator
			this.editorRegionsController.appendToBottomLeft(this.gameObjectCreatorUI.create());
			// Custom Types editor
			this.editorRegionsController.appendToBottomLeft(this.customTypesEditorUI.create());

			// Button to remove all Game Objects from the scene
			this.editorRegionsController.appendToBottomLeft(this.gameObjectRemoveUI.create());

			// Bottom Right Region
			this.editorRegionsController.appendToBottomRight(this.viewportCreateUI.create());
			this.editorRegionsController.appendToBottomRight(this.viewportsUI.create());

			// Add a viewport UI component when a viewport is added
			editorDelegates.add(gb.viewports, gb.viewports.ADD, this, function (v) {
				// The grid viewport should never be added to the UI
				if (!editorSetup.config().isEditorViewport(v.name)) {
					this.viewportsUI.add(v);
				}
			});

			// Remove the UI component from it's parent when a viewport is removed
			editorDelegates.add(gb.viewports, gb.viewports.REMOVE, this, function (v) {
				if (!editorSetup.config().isEditorViewport(v.name)) {
					this.viewportsUI.remove(v);
				}
			});

			// Remove the UI component from it's parent when a viewport is removed
			editorDelegates.add(world, world.CHANGE, this, function () {
				gb.viewports.iterate(this, function (v) {
					if (v.WorldFit) {
						world.scaleViewportToFit(v);
					}
				});
			});

			editorDelegates.add(this.editorSideMenu, this.editorSideMenu.EXIT, this, function() {
				storage.setRestoreScene(serializer.serialize(require('scene-name').get()));
				storage.setScrolling(this.canvasScrollBarsUI.getScrollingLeft(), this.canvasScrollBarsUI.getScrollingTop());

				this.execute(this.EXIT);
			});

			editorDelegates.add(this.editorSideMenu, this.editorSideMenu.PREVIEW, this, function() {
				storage.setScrolling(this.canvasScrollBarsUI.getScrollingLeft(), this.canvasScrollBarsUI.getScrollingTop());

				this.execute(this.PREVIEW);
			});

			// Finalize the setup of the editor
			editorSetup.end();

			if (backFromPreview) {
				// Use the preview scene when coming back from the preview
				sceneLoader.load(initialScene);
			} else {
				var restoreScene = storage.getRestoreScene();

				if (restoreScene) {
					// If there is a restore scene, use it
					sceneLoader.load(restoreScene);
					storage.deleteRestoreScene();
				} else {
					// Otherwise use the passed in scene
					sceneLoader.load(initialScene);
				}
			}

			sceneLoader.layout();

			// Reset things that need reseting when a new scene is loaded
			editorDelegates.add(sceneLoader, sceneLoader.LOAD_COMPLETE, this, function() {
				editorSetup.reset();
				
				// Toggle back on after the reset
				this.gridControlsUI.toggleGrid();
				// Toggle back the bounding rectangles
				this.gameObjectControlsUI.toggleBoundings();
			});

			this.globalContextMenu = new (require('global-context-menu'))().create(
				this.gameObjectSelectorUI,
				this.controlObjectSelectorUI,
				this.customTypesEditorUI,
				this.gridControlsUI,
				this.gameObjectControlsUI
			);

			// The context menu that appears when clicking on empty space in the canvas
			editorDelegates.add(gb.Mouse, gb.Mouse.CANVAS_CONTEXT_MENU, this, function(event) {
				this.globalContextMenu.show(event.clientX, event.clientY);
			});

			// Update the side menu after adding it to the DOM
			this.editorSideMenuController.update();
			// Toggle the grid at start
			this.gridControlsUI.toggleGrid();
			// Toggle the bounding rectangles on start
			this.gameObjectControlsUI.toggleBoundings();
		},

		cleanUp: function() {
			// Destroy viewport related dialogs
			require('viewport-editor-ui').destroy();

			editorSetup.exit();
			// Destroy all of this objects references
			this._super();
			// Remove the editor container from the DOM
			// This should take care of any lingering references to events
			$('#main-editor-container').remove();
		}
	});

	Object.defineProperty(SceneEditor.prototype, "EXIT", { get: function() { return 'exit'; } });
	Object.defineProperty(SceneEditor.prototype, "PREVIEW", { get: function() { return 'preview'; } });

	return new SceneEditor();
});
