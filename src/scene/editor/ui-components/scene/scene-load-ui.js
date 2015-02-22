define(function(require) {
  var localStorageWrapper = require('local-storage');
  var sceneLoader = require('editor-scene-loader');

  var dialogDropdownUI = require('dialog-modular');
  
  var dialogTextField = require('dialog-text-field');
  var dialogDropdownField = require('dialog-dropdown-field');
  var dialogHiddenField = require('dialog-hidden-field');

  var SceneLoad = require('ui-component').extend({
    init: function() {
      this.loadSceneDialog = new dialogDropdownUI().create({
        id: 'load-scene-dialog',
        title: 'Open a scene',
        tip: 'Choose a scene to open from the dropdown',
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        minWidth: 300,
        modal: true,

        fields: [
        	new dialogDropdownField({
        		name: 'Local Scene Selector',
        		data: function() {
        			return localStorageWrapper.getAllScenes();
        		}
        	}),
        	new dialogDropdownField({
        		name: 'Remote Scene Selector',
        		data: function() {
        			return [];
        		}
        	}),
        	new dialogTextField({
        		name: 'Remote Input',
        		value: 'http://localhost:3000/scenes',
        		validations: [ 
              {
              	check: function(remote) {
              		return this.RemoteSceneSelector();
              	},
              	
              	tip: "Remote scene selector is empty"
              }
        		]
        	}),
        	new dialogHiddenField({
        		name: 'Remote Availability',
        		validations: [
	        		{
	        			check: function() {
	        				$.ajax({
								      url: this.RemoteInput(),
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
        	}),
        	new dialogHiddenField({
        		name: 'Remote Url Validity',
        		validations: [
	        		{
	        			check: function() { 
							  	return validateURL(this.RemoteInput()); 	
                },
                
                tip: "Remote url is not valid"
	        		}
        		]
        	}) 
        ],

        buttons: {
          'Open Local': function () {
            var scene = localStorageWrapper.getScene(this.LocalSceneSelector());
            sceneLoader.load(JSON.parse(scene));
            sceneLoader.layout();
            $(this).dialog('close');
          },

          'Open Remote': function () {
          	var self = this;

          	$.ajax({
				      url: this.RemoteInput() + "/" + this.RemoteSceneSelector(),
				      type: "GET",
				      success: function(scene) { 
				      	sceneLoader.load(JSON.parse(scene));
            		sceneLoader.layout();
            		$(self).dialog('close');	
				      }
				    }); 
          },

          'Get Remote Scenes': function() {          	
          	var self = this;

          	$.ajax({
				      url: this.RemoteInput(),
				      type: "GET",
				      success: function(data) { 
				      	self.dialog('option').updateField('Remote Scene Selector', data);
				      }
				    });
          }
        },

        validateOnAction: {
        	'Open Local': [],
          'Open Remote': ['Remote Input', 'Remote Url Validity', 'Remote Availability'],
        	'Get Remote Scenes': ['Remote Url Validity', 'Remote Availability']
        }
      });
    },

    open: function() {
      return this.loadSceneDialog.dialog('open');
    }
  });
  
	validateURL = function(url) {
    var parser = document.createElement('a');
    
    try {
      parser.href = url;
      return !!parser.hostname;
    } catch (e) {
      return false;
    }
	}

  return SceneLoad;
});

