define(function(require) {
  var localStorageWrapper = require('local-storage');
  var dialogDropdownUI = require('dialog-dropdown');

  var SceneDelete = require('ui-component').extend({
    init: function() {
      this.deleteSceneDialog = new dialogDropdownUI().create({
        id: 'delete-scene-dialog',
        title: 'Delete Scenes',
        tip: 'Choose a scene to delete from the dropdown',
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        minWidth: 300,
        modal: true,
        
        data: function () {
          return localStorageWrapper.getAllScenes();
        },

        buttons: {
          Delete: function () {
            localStorageWrapper.removeScene(this.SelectedOption());
            
            $(this).dialog('close');
          },

          "Delete All": function () {
            localStorageWrapper.clearScenes();

            $(this).dialog('close');
          }
        }
      });
    },

    open: function() {
      return this.deleteSceneDialog.dialog('open');
    }
  });
  
  return SceneDelete;
});

