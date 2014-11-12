define(function(require) {
  $.widget.bridge('uitooltip', $.ui.tooltip);

  require('jquery');
  require('jquery-ui');
  require('jquery-bootstrap');
  require('jquery-selectBoxIt');
  require('bootstrap-toogle');

  $.fn.button.noConflict();

  var gb = require('gb');
  var editorSetup = require('editor-setup');
  var world = require('world');

  var SceneEditor = require("class").extend({
    init: function() {
      // Main Layout
      this.editorSideMenu = new (require('editor-side-menu'));
      this.editorRegions = new (require('editor-regions'));

      // Top Left Components
      this.canvasScrollBarsUI = new (require('canvas-scroll-bars-ui'));
      
      // Top Right Components
      this.gridToggleUI = new (require('grid-toggle-ui'));
      this.snapToGridToggleUI = new (require('snap-to-grid-toggle-ui'));
      this.worldEditUI = new (require('world-edit-ui'));
      // this.saveAndLoadUI = new (require('save-and-load-ui'));
      
      // Bottom Left Components
      this.gameObjectSelectorUI = new (require('game-object-selector-ui'));
      this.viewportSelectorSimpleUI = new (require('viewport-selector-simple-ui'));
      this.gameObjectCreatorUI = new (require('game-object-creator-ui'));
      
      // Bottom Right Components
      this.viewportsUI = new (require('viewport-selector-ui'));
      this.viewportCreateUI = new (require('viewport-creator-ui'));
    },

    create: function() {
      editorSetup.begin();

      var mainContainer = document.createElement('div');
      mainContainer.id = 'main-container';
      document.body.appendChild(mainContainer);

      var editorRegions = this.editorRegions.create();
      var editorSideMenu = this.editorSideMenu.create(editorRegions)

      // var input = document.createElement('input');
      // input.type = 'checkbox';
      // $(input).attr('editor-toggle', '');
      // mainContainer.appendChild(input);
      
      // Append the regions to the document body
      mainContainer.appendChild(editorSideMenu.html);
      mainContainer.appendChild(editorRegions.html);

      // Top Left Region
      // Canvas
      editorRegions.appendToTopLeft(document.getElementById('main'));
      // Scroll bars
      this.canvasScrollBarsUI.create();

      // Top Right Region
      // Grid Toggle
      editorRegions.appendToTopRight(this.gridToggleUI.create());
      // Snap To Grid Toggle
      editorRegions.appendToTopRight(this.snapToGridToggleUI.create());
      // World Size
      editorRegions.appendToTopRight(this.worldEditUI.create());

      // Bottom Left Region
      // Game Object Selector
      editorRegions.appendToBottomLeft(this.gameObjectSelectorUI.create());
      // Viewport Selector 
      editorRegions.appendToBottomLeft(this.viewportSelectorSimpleUI.create());
      // Game Object Creator
      editorRegions.appendToBottomLeft(this.gameObjectCreatorUI.create());

      // Bottom Right Region
      editorRegions.appendToBottomRight(this.viewportsUI.create());
      editorRegions.appendToBottomRight(this.viewportCreateUI.create());

      // Add a viewport UI component when a viewport is added
      gb.viewports.on(gb.viewports.ADD, this, function (v) {
        // The grid viewport should never be added to the UI
        if (v.name != editorSetup.config().getGridViewportName()) {
          this.viewportsUI.add(v);
        }
      });

      // Remove the UI component from it's parent when a viewport is removed
      gb.viewports.on(gb.viewports.REMOVE, this, function (v) {
        this.viewportsUI.remove(v);
      });

      world.on(world.CHANGE, this, function () {
        gb.viewports.iterate(this, function (v) { 
          if (v.WorldFit) {
            world.scaleViewportToFit(v); 
          } 
        });
      });

      editorSetup.end();
    }
  });

  return new SceneEditor();
});
