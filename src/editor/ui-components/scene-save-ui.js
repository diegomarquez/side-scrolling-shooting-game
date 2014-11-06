define(function(require) {

  var wrapper = require('wrap-in-div');
  var localStorage = require('local-storage');
  var sceneSerializer = require('scene-serializer');
  var button = require('button');
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
                check: function(value) { return !localStorage.getLevel($(this).SceneName()); },
                tip: "Scene name already in use. To overwrite the old scene click the 'Overwite' button"
              }
            ]
          }
        ],

        buttons: {
          Save: function () {            
            serializeAndStore($(this).SceneName());
            $(this).dialog('close');
          },

          Overwrite: function () {            
            serializeAndStore($(this).SceneName());
            $(this).dialog('close');
          }
        },

        validateOnAction: {
          'Save': ['Scene Name', 'Scene Already Exists'],
          'Overwrite': ['Scene Name'] 
        }
      });
    },

    create: function() {
      var element = new button().create({
        id: 'level-save-button',
        label: 'Save',
        onClick: function(event) {
          $(this.saveSceneDialog).dialog('open');
        }.bind(this) 
      });

      $(element).button();
      
      return wrapper.wrap(element);
    }
  });
  
  var serializeAndStore = function(sceneName) {     
    localStorage.setLevel(sceneName, sceneSerializer.serialize(sceneName));
  }
  
  return SceneSave;
});