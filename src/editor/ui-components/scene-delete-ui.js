define(function(require) {
  var localStorageWrapper = require('local-storage');
  var dialogDropdownUI = require('dialog-dropdown');

  var SceneDelete = require('class').extend({
    init: function() {
      this.loadSceneDialog = new dialogDropdownUI().create({
        id: 'delete-scene-dialog',
        title: 'Delete a scene',
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        minWidth: 300,
        modal: true,
        
        data: function () {
          return localStorageWrapper.getAllLevels()
        },

        buttons: {
          Delete: function () {
            localStorageWrapper.removeLevel(this.SelectedOption());
            $(this).dialog('close');
          },

          "Delete All": function () {
            localStorageWrapper.clearLevels();
            $(this).dialog('close');
          }

        }
      });
    },

    open: function() {
      return this.loadSceneDialog.dialog('open');
    }
  });
  
  return SceneDelete;
});

