define(function(require) {

  var gb = require('gb');
  var setupEditorObject = require('setup-editor-object');
  var sceneName = require('scene-name');

  var SceneLoader = require("class").extend({
    init: function() {},

    load: function(scene) {
      sceneName.set(scene.name);

      gb.reclaimer.claimAll();
      gb.viewports.removeAll();

      var viewports = scene.viewports;

      for(var i = 0; i < viewports.length; i++) {
        debugger;

        gb.viewports.addFromObject(viewports[i]);
      }

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
