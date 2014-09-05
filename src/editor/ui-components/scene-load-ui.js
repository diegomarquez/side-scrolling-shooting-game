define(function(require) {

  var wrapper = require('wrap-in-div');
  var sceneLoader = require('scene-loader');
  var fileLoader = require('file-loader');

  var SceneLoad = require('class').extend({
    init: function() {
      
    },

    create: function() {
      var button = new fileLoader().create({
        id: 'level-load-button',
        label: 'Load',
        onClick: function(event) {
          var file = event.target.files[0];
          var reader = new FileReader();

          reader.onload = function(event) {  
            sceneLoader.load(JSON.parse(event.target.result));
          };

          reader.readAsText(file);
        } 
      })
      
      return wrapper.wrap(button);
    }
  });
  
  return SceneLoad;
});

