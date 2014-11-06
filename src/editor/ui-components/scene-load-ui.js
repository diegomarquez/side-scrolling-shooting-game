define(function(require) {

  var wrapper = require('wrap-in-div');
  var sceneLoader = require('scene-loader');
  var button = require('button');
  // var fileLoader = require('file-loader');

  var SceneLoad = require('class').extend({
    init: function() {
      
    },

    create: function() {
      // var button = new fileLoader().create({
      //   id: 'level-load-button',
      //   label: 'Load',
      //   onClick: function(event) {
      //     var file = event.target.files[0];
      //     var reader = new FileReader();

      //     reader.onload = function(event) {  
      //       sceneLoader.load(JSON.parse(event.target.result));
      //     };

      //     reader.readAsText(file);
      //   } 
      // });
      
      var element = new button().create({
        id: 'level-load-button',
        label: 'Load',
        onClick: function(event) {
          // Serialize all the currently active objects in the editor
          // var data = sceneSerializer.serialize();

          // if (data) {
          //   // Post the result to the server so the file can be saved localy
          //   var request = new XMLHttpRequest();
          //   request.open("POST", "http://localhost:3000", true);
          //   request.send(data);
          // }
        } 
      });

      $(element).button();
      
      return wrapper.wrap(element);
    }
  });
  
  return SceneLoad;
});

