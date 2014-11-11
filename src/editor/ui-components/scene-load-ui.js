define(function(require) {
  var localStorageWrapper = require('local-storage');
  var sceneLoader = require('scene-loader');
  var dialogDropdownUI = require('dialog-dropdown');

  var SceneLoad = require('class').extend({
    init: function() {
      this.loadSceneDialog = new dialogDropdownUI().create({
        id: 'load-scene-dialog',
        title: 'Load a scene',
        tip: 'Choose a scene to load from the dropdown',
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        minWidth: 300,
        modal: true,
        
        data: function () {
          return localStorageWrapper.getAllLevels();
        },

        buttons: {
          Load: function () {
            var scene = localStorageWrapper.getLevel(this.SelectedOption());

            sceneLoader.load(JSON.parse(scene));

            $(this).dialog('close');
          }
        }
      });
    },

    open: function() {
      return this.loadSceneDialog.dialog('open');
    }
  });
  
  return SceneLoad;
});

