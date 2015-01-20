define(function(require) {

  var gb = require('gb');
  var world = require('world');

  debugger;

  var PlayerSceneLoader = require("scene-loader").extend({
    init: function() {},

    cleanUp: function () {
    	gb.toggleDebug(true);
    	gb.toggleColliderDebug(true);

      // Clear all previous content
      gb.reclaimer.clearAllObjectsFromPools();
      // Remove all update groups
      gb.groups.removeAll();
      // Remove all Viewports
      gb.viewports.removeAll();
    },

    sceneName: function (scene) {
    	
    },

    world: function (scene) {
      world.create(scene.world.width, scene.world.height);
    },

    viewports: function (scene) {
      // Create Serialized Viewports
      var viewports = scene.viewports;

      for(var i = 0; i < viewports.length; i++) {
      	gb.viewports.addFromObject(viewports[i]);
      }
    },

    getGameObject: function (serializedGameObject) {
    	return gb.create(
	  		serializedGameObject.id, 
	  		serializedGameObject.g, 
	  		serializedGameObject.v, 
	  		this.getGameObjectArgs(serializedGameObject)
	  	)
    },

    addChildGameObject: function (childId, parent) {
			return gb.addChildTo(go, childId, null, null, 'create');
    },

    decorateGameObject: function (go) {
  		
    }
  });

  return new PlayerSceneLoader();
});

