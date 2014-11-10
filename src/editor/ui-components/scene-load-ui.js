define(function(require) {

  var wrapper = require('wrap-in-div');
  var localStorageWrapper = require('local-storage');
  var sceneLoader = require('scene-loader');
  
  var button = require('button');
  var dialogDropdownUI = require('dialog-dropdown');

  var SceneLoad = require('class').extend({
    init: function() {
      this.loadSceneDialog = new dialogDropdownUI().create({
        id: 'load-scene-dialog',
        title: 'Load a scene',
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        minWidth: 300,
        modal: true,
        
        data: function () {
          return localStorageWrapper.getAllLevels()
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

    create: function() {
      var element = new button().create({
        id: 'level-load-button',
        label: 'Load',
        onClick: function(event) {
          $(this.loadSceneDialog).dialog('open');
        }.bind(this) 
      });

      $(element).button();
      
      return wrapper.wrap(element);
    }
  });
  
  return SceneLoad;
});

