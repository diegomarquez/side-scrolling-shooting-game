define(function(require) {
  var mainViewportControl = require('main-viewport-control');
  var scaleUIValueSetter = require('scale-ui-value-setter');
  
  var gb = require('gb');
  var editorConfig = require('editor-config');
  var world = require('world');

  var SceneEditor = require("class").extend({
    init: function() {
      this.sceneNameUI = new (require('scene-name-ui'));
      this.worldEditUI = new (require('world-edit-ui'));
      this.gameObjectSelectorUI = new (require('game-object-selector-ui'));
      this.groupSelectorUI = new (require('group-selector-ui'));
      this.viewportsUI = new (require('viewport-selector-ui'));
      this.viewportCreateUI = new (require('viewport-creator-ui'));
      this.gameObjectCreatorUI = new (require('game-object-creator-ui'));
      this.sceneSaveUI = new (require('scene-save-ui'));
      this.sceneLoadUI = new (require('scene-load-ui'));
      
      this.horizontalBar = new (require('horizontal-bar'));
    },

    create: function() {
      // Default update group and viewport setup
      this.defaultSetup();

      // Setup editor only pools
      require('outline-bundle').create();

      // Create main editor container
      var container = document.createElement('div');
      container.id = "editor-container";
      // Append to the div containing the canvas
      document.getElementById('main').appendChild(container);

      /**
       * Append all the UI Components
       * --------------------------------
       */

      // Scene name
      container.appendChild(this.sceneNameUI.create());
      // World Size
      container.appendChild(this.worldEditUI.create());
      // Horizontal line
      container.appendChild(this.horizontalBar.create());
      // Game object configuration
      container.appendChild(this.gameObjectSelectorUI.create());
      container.appendChild(this.groupSelectorUI.create());
      container.appendChild(this.viewportsUI.create());
      container.appendChild(this.viewportCreateUI.create());
      // Horizontal line
      container.appendChild(this.horizontalBar.create());
      // Game object creation button
      container.appendChild(this.gameObjectCreatorUI.create());
      // Horizontal line
      container.appendChild(this.horizontalBar.create());      

      // Save and Load scene buttons
      container.appendChild(this.sceneSaveUI.create());
      container.appendChild(this.sceneLoadUI.create());

      // Add a viewport UI component when a viewport is added
      gb.viewports.on(gb.viewports.ADD, this, function (v) {
        this.viewportsUI.add(v);
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

      world.on(world.SCALE_TO_FIT, this, function (v) {
        scaleUIValueSetter.set(v);
      });

      world.on(world.RESET_SCALE, this, function (v) {
        scaleUIValueSetter.set(v);
      });

      // Setup control of 'Main' viewport with the keyboard
      mainViewportControl.create();
    },

    defaultSetup: function() {
      // Claim all Game Objects
      gb.reclaimer.claimAll();
      // Remove all update groups
      gb.groups.removeAll();
      // Remove all Viewports
      gb.viewports.removeAll();

      // Setup the default world size 
      world.create(gb.canvas.width, gb.canvas.height, 50);
      // Setup the default update group
      gb.groups.add(editorConfig.getDefaultGroupName());
      // Setup the default viewport
      var mainViewport = gb.viewports.add(editorConfig.getMainViewportName(), gb.canvas.width, gb.canvas.height, 0, 0);
      mainViewport.addLayer(editorConfig.getDefaultLayerName());
      mainViewport.addLayer(editorConfig.getOutlineLayerName());
    }
  });

  return new SceneEditor();
});
