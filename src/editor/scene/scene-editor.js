define(function(require) {

  var setupMasonryContainers = require('setup-masonry-containers');
  var mainViewportControl = require('main-viewport-control');

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
      // Wordl Size
      container.appendChild(this.worldEditUI.create());
      // Horizontal line
      container.appendChild(this.horizontalBar.create());
      // Game object configuration
      container.appendChild(this.gameObjectSelectorUI.create());
      container.appendChild(this.groupSelectorUI.create());
      container.appendChild(this.viewportsUI.create());
      container.appendChild(this.viewportCreateUI.create({
        container: this.viewportsUI
      }));
      // Horizontal line
      container.appendChild(this.horizontalBar.create());
      // Game object creation button
      container.appendChild(this.gameObjectCreatorUI.create());
      // Horizontal line
      container.appendChild(this.horizontalBar.create());      

      // Save and Load scene buttons
      container.appendChild(this.sceneSaveUI.create());
      container.appendChild(this.sceneLoadUI.create());

      // Setup control of 'Main' viewport with the keyboard
      mainViewportControl.create();
      // Initialize All the masonry containers
      setupMasonryContainers.setup();
    }
  });

  return new SceneEditor();
});
