define(function(require) {

  var gb = require('gb');
  var setupEditorObject = require('setup-editor-object');

  var SceneLoader = require("class").extend({
    init: function() {},

    load: function(sceneJson) {
      gb.reclaimer.claimAllBut('type', 'MinimapOutline');

      var objects = sceneJson.objects;

      for(var i = 0; i < objects.length; i++) {

        var object = setupEditorObject.setup(objects[i].id, objects[i].g, objects[i].v);

        object.x = objects[i].x;
        object.y = objects[i].y;
      }      
    }
  });

  return new SceneLoader();
});
