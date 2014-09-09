define(function(require) {
  var SceneEditor = require("class").extend({
    init: function() {
      this.sceneNameUI = new (require('scene-name-ui'));
      this.gameObjectSelectorUI = new (require('game-object-selector-ui'));
      this.groupSelectorUI = new (require('group-selector-ui'));
      this.viewportsUI = new (require('viewport-selector-ui'));
      this.viewportCreateUI = new (require('viewport-creator-ui'));
      this.gameObjectCreatorUI = new (require('game-object-creator-ui'));
      this.sceneSaveUI = new (require('scene-save-ui'));
      this.sceneLoadUI = new (require('scene-load-ui'));
      
      this.horizontalBar = new (require('horizontal-bar'));

      this.editableDropdown = new (require('editable-dropdown'));
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
      
      // container.appendChild(this.editableDropdown.create({
      //   id: 'LALA',
      //   defaultMessage: 'Message',
      //   selectedMessage: 'Selected Message:',
      //   data: ['1', '2', '3'],
      //   onEdit: function(value, newIndex, oldIndex) {
      //     console.log('edit', value, newIndex, oldIndex);
      //   },
      //   onSelect: function(value) {
      //     console.log('select', value);
      //   }
      // }));      

      // Save and Load scene buttons
      container.appendChild(this.sceneSaveUI.create());
      container.appendChild(this.sceneLoadUI.create());

    }
  });

  return new SceneEditor();
});
