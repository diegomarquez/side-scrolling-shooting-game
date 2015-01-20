define(function(require) {

  var gb = require('gb');
  var world = require('world');
  var editorSetup = require('editor-setup');
  var editorViewports = require('editor-viewports');
  var setupEditorObject = require('setup-editable-game-object');
  var sceneName = require('scene-name');

  var EditorSceneLoader = require("scene-loader").extend({
    init: function() {},

    cleanUp: function () {
    	editorSetup.clear();
    },

    sceneName: function (scene) {
    	sceneName.set(scene.name);
    },

    world: function (scene) {
    	world.setWidth(scene.world.width);
      world.setHeight(scene.world.height);
    },

    viewports: function (scene) {
      var viewports = scene.viewports;

    	// Create Serialized Viewports
      for(var i = 0; i < viewports.length; i++) {
      	editorViewports.add(viewports[i]).NoClipping().NoCulling().NoMouseBounded();
      }

      // Create editor only objects, viewports and game objects
      editorSetup.display();
    },

    getGameObject: function (serializedGameObject) {
    	return setupEditorObject.setup(serializedGameObject.id, serializedGameObject.g, serializedGameObject.v, this.getGameObjectArgs(serializedGameObject));
    },

    addChildGameObject: function (childId, parent) {
			return setupEditorObject.setupChild(childId, parent);
    },

    decorateGameObject: function (go) {
  		setupEditorObject.addGizmos(go);
    }
  });

  return new EditorSceneLoader();
});
