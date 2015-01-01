define(function(require) {
  var localStorageWrapper = require('local-storage');
  var sceneSerializer = require('scene-serializer');
  var dialogUI = require('dialog');
  var sceneName = require('scene-name');

  var SceneSave = require('ui-component').extend({
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
            name: 'Remote', 
            value: 'http://localhost:3000',
            validations: [
              {
                check: function(remote) { 
							    return validateURL(remote); 	
                },
                tip: "Remote url is not valid"
              },
              {
                check: function(remote) { 
							    var isValid = false;

							    $.ajax({
							      url: remote,
							      type: "GET",
							      async: false,
							      success: function() { isValid = true; },
							      error: function() { isValid = false; }
							    });

							    return isValid; 	
                },
                tip: "Remote is not available"
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
                  return !localStorageWrapper.getScene(this.SceneName()); 
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
          },

          Upload: function () {            
            $.post(this.Remote(), sceneSerializer.serialize(this.SceneName()));
						$(this).dialog('close');
          }
        },

        validateOnAction: {
          'Save': ['Scene Name', 'Scene Already Exists'],
          'Update': ['Scene Name'],
          'Upload': ['Scene Name', 'Remote'] 
        }
      });
    },

    open: function() {
      return this.saveSceneDialog.dialog('open');
    }
  });
  
  var serializeAndStore = function() { 
    var name = this.SceneName();

    if (localStorageWrapper.setScene(name, sceneSerializer.serialize(name))) {
      $(this).dialog('close');
    } else {
      $(this).dialog('option', 'setErrorFeedback')('No more space in local storage. Delete scenes to free up space.');
    }

    sceneName.set(name);
  }

  validateURL = function(url) {
    var parser = document.createElement('a');
    
    try {
      parser.href = url;
      return !!parser.hostname;
    } catch (e) {
      return false;
    }
	}
  
  return SceneSave;
});