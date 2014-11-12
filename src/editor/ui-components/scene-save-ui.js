define(function(require) {
  var localStorageWrapper = require('local-storage');
  var sceneSerializer = require('scene-serializer');
  var dialogUI = require('dialog');
  var sceneName = require('scene-name');

  var SceneSave = require('class').extend({
    init: function() {
      // Scene Save Dialog
      this.saveSceneDialog = new dialogUI().create({
        id: 'save-scene-dialog',
        title: 'Save the current scene',
        tip: 'Set a name',
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        minWidth: 300,
        modal: true,
        
        fields: [
          { 
            name: 'Scene Name', 
            value: sceneName.get,
            validations: [
              {
                check: function(sceneName) { return sceneName != ''; },
                tip: "Scene name can't be empty"
              }
            ]
          },
          { 
            name: 'Scene Already Exists', 
            value: '',
            hidden: true,
            validations: [
              {
                check: function() { 
                  return !localStorageWrapper.getLevel(this.SceneName()); 
                },
                tip: "To overwrite the old scene click the 'Update' button"
              }
            ]
          }
        ],

        buttons: {
          Save: function () {
            serializeAndStore.call(this);
          },

          Update: function () {            
            serializeAndStore.call(this);
          }
        },

        validateOnAction: {
          'Save': ['Scene Name', 'Scene Already Exists'],
          'Update': ['Scene Name'] 
        }
      });
    },

    open: function() {
      return this.saveSceneDialog.dialog('open');
    }
  });
  
  var serializeAndStore = function() { 
    var name = this.SceneName();

    if (localStorageWrapper.setLevel(name, sceneSerializer.serialize(name))) {
      $(this).dialog('close');
    } else {
      $(this).dialog('option', 'setErrorFeedback')('No more space in local storage. Delete scenes to free up space.');
    }

    sceneName.set(name);
  }
  
  return SceneSave;
});