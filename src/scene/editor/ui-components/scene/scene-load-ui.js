define(function(require) {
  var localStorageWrapper = require('local-storage');
  var sceneLoader = require('scene-loader');
  // var dialogDropdownUI = require('dialog-dropdown');

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
        		name: 'Remote',
        		value: 'http://localhost:3000/scenes',
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
              }, 
              {
              	check: function(remote) {
              		return this.RemoteSceneSelector();
              	},
              	
              	tip: "Remote scene selector is empty"
              }
        		]
        	})
        ],

        buttons: {
          'Open Local': function () {
            var scene = localStorageWrapper.getScene(this.LocalSceneSelector());
            sceneLoader.load(JSON.parse(scene));
            $(this).dialog('close');
          },

          'Open Remote': function () {
          	var self = this;

          	$.ajax({
				      url: this.Remote() + "/" + this.RemoteSceneSelector(),
				      type: "GET",
				      success: function(scene) { 
				      	sceneLoader.load(JSON.parse(scene));
            		$(self).dialog('close');	
				      }
				    }); 
          },

          'Get Remote Scenes': function() {          	
          	var self = this;

          	$.ajax({
				      url: this.Remote(),
				      type: "GET",
				      success: function(data) { 
				      	self.dialog('option').updateField('Remote Scene Selector', data);
				      }
				    });
          }
        },

        validateOnAction: {
        	'Open Local': [],
          'Open Remote': ['Remote'],
        	'Get Remote Scenes': ['Remote']
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

