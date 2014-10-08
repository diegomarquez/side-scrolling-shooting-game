define(function(require) {

  var gb = require('gb');
  var editorSetup = require('editor-setup');
  var setupEditorObject = require('setup-editable-game-object');
  var sceneName = require('scene-name');

  var SceneLoader = require("class").extend({
    init: function() {},

    load: function(scene) {
      // Clear all previous content
      editorSetup.clear();

      // Set the scene name in the UI
      sceneName.set(scene.name);

      // Create Update Groups
      var groups = scene.groups;

      // Create Update Groups
      for(var i = 0; i < groups.length; i++) {
        gb.groups.add(groups[i]);
      } 

      // Create Viewports
      var viewports = scene.viewports;

      for(var i = 0; i < viewports.length; i++) {
        gb.viewports.addFromObject(viewports[i]);
      }

      // Create grid viewport
      editorSetup.gridViewport();
      
      // Create Game Objects
      var objects = scene.objects;

      for(i = 0; i < objects.length; i++) {
        var object = setupEditorObject.setup(objects[i].id, objects[i].g, objects[i].v);

        object.x = objects[i].x;
        object.y = objects[i].y;
      }      
    }
  });

  return new SceneLoader();
});
