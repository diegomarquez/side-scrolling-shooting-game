define(function(require) {
  require('jquery');
  require('jquery-ui');
  require('jquery-selectBoxIt');
  
  require('bootstrap');
  require('bootstrap-toogle');

  $.fn.button.noConflict();

  var gb = require('gb');
  var util = require('util');
  var editorSetup = require('editor-setup');
  var editorDelegates = require('editor-delegates');
  var world = require('world');
  var canvasContainer = require('canvas-container');

  var SceneEditor = require("ui-component").extend({
    init: function() {
      this._super();
    },

    create: function() {      
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
      this.viewportSelectorSimpleUI = new (require('viewport-selector-simple-ui'));
      this.gameObjectCreatorUI = new (require('game-object-creator-ui'));
      
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
      // Viewport Selector 
      this.editorRegionsController.appendToBottomLeft(this.viewportSelectorSimpleUI.create());
      // Game Object Creator
      this.editorRegionsController.appendToBottomLeft(this.gameObjectCreatorUI.create());

      // Bottom Right Region
      this.editorRegionsController.appendToBottomRight(this.viewportCreateUI.create());
      this.editorRegionsController.appendToBottomRight(this.viewportsUI.create());

      // Add a viewport UI component when a viewport is added
      editorDelegates.add(gb.viewports, gb.viewports.ADD, this, function (v) {
        // The grid viewport should never be added to the UI
        if (v.name != editorSetup.config().getGridViewportName()) {
          this.viewportsUI.add(v);
        }
      });

      // Remove the UI component from it's parent when a viewport is removed
      editorDelegates.add(gb.viewports, gb.viewports.REMOVE, this, function (v) {
        this.viewportsUI.remove(v);
      });

      // Remove the UI component from it's parent when a viewport is removed
      editorDelegates.add(world, world.CHANGE, this, function () {
        gb.viewports.iterate(this, function (v) { 
          if (v.WorldFit) {
            world.scaleViewportToFit(v); 
          } 
        });
      });

      // Finalize the setup of the editor
      editorSetup.end();
    }
  });

  Object.defineProperty(SceneEditor.prototype, "EXIT", { get: function() { return 'exit'; } });

  return new SceneEditor();
});
