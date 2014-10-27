define(function(require) {
  require('jquery');
  require('jquery-ui');

  var gb = require('gb');
  var editorSetup = require('editor-setup');
  var world = require('world');
  
  var scaleUIValueSetter = require('scale-ui-value-setter');

  var SceneEditor = require("class").extend({
    init: function() {
      this.editorRegions = new (require('editor-regions'));

      // Top Left Components
      this.canvasScrollBarsUI = new (require('canvas-scroll-bars-ui'));
      
      // Top Right Components
      this.sceneNameUI = new (require('scene-name-ui'));
      this.gridToggleUI = new (require('grid-toggle-ui'));
      this.snapToGridToggleUI = new (require('snap-to-grid-toggle-ui'));
      this.worldEditUI = new (require('world-edit-ui'));
      // this.sceneSaveUI = new (require('scene-save-ui'));
      // this.sceneLoadUI = new (require('scene-load-ui'));
      
      // Bottom Left Components
      this.gameObjectSelectorUI = new (require('game-object-selector-ui'));
      this.viewportSelectorSimpleUI = new (require('viewport-selector-simple-ui'));
      this.gameObjectCreatorUI = new (require('game-object-creator-ui'));
      
      // Bottom Right Components
      // this.viewportsUI = new (require('viewport-selector-ui'));
      // this.viewportCreateUI = new (require('viewport-creator-ui'));
      
    },

    create: function() {
      editorSetup.all();

      // Create main editor container
      // var container = document.createElement('div');
      // container.id = "editor-container";
      // Append to the div containing the canvas
      // document.getElementById('main').appendChild(container);

      var editorRegions = this.editorRegions.create();

      // Append the regions to the document body
      document.body.appendChild(editorRegions.html);
      
      // Top Left Region
      // Canvas
      editorRegions.appendToTopLeft(document.getElementById('main'));
      // Scroll bars
      this.canvasScrollBarsUI.create();

      // Top Right Region
      // Scene name
      editorRegions.appendToTopRight(this.sceneNameUI.create());
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

      /**
       * Append all the UI Components
       * --------------------------------
       */
      
      // container.appendChild(this.viewportsUI.create());
      // container.appendChild(this.viewportCreateUI.create());

      // // Save and Load scene buttons
      // container.appendChild(this.sceneSaveUI.create());
      // container.appendChild(this.sceneLoadUI.create());

      // // Add a viewport UI component when a viewport is added
      // gb.viewports.on(gb.viewports.ADD, this, function (v) {
      //   this.viewportsUI.add(v);
      // });

      // // Remove the UI component from it's parent when a viewport is removed
      // gb.viewports.on(gb.viewports.REMOVE, this, function (v) {
      //   this.viewportsUI.remove(v);
      // });

      // world.on(world.CHANGE, this, function () {
      //   gb.viewports.iterate(this, function (v) { 
      //     if (v.WorldFit) {
      //       world.scaleViewportToFit(v); 
      //     } 
      //   });
      // });

      // world.on(world.SCALE_TO_FIT, this, function (v) {
      //   scaleUIValueSetter.set(v);
      // });

      // world.on(world.RESET_SCALE, this, function (v) {
      //   scaleUIValueSetter.set(v);
      // });
    }
  });

  return new SceneEditor();
});
