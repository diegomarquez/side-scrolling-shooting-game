define(function(require) {

  var wrapper = require('wrap-in-div');
  var sceneSerializer = require('scene-serializer');
  var button = require('button');

  var SceneSave = require('class').extend({
    init: function() {
      
    },

    create: function() {
      var element = new button().create({
        id: 'level-save-button',
        label: 'Save',
        onClick: function(event) {
          // Serialize all the currently active objects in the editor
          var data = sceneSerializer.serialize();

          if (data) {
            // Post the result to the server so the file can be saved localy
            var request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3000", true);
            request.send(data);
          }
        } 
      })
      
      return wrapper.wrap(element);
    }
  });
  
  return SceneSave;
});