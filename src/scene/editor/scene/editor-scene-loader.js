define(function(require) {
	var gb = require('gb');
	var world = require('world');
	var editorSetup = require('editor-setup');
	var editorViewports = require('editor-viewports');
	var setupEditorObject = require('setup-editable-game-object');
	var sceneName = require('scene-name');

	var EditorSceneLoader = require("scene-loader").extend({
		init: function() {
			this._super();
		},

		cleanUp: function () {
			editorSetup.clear();
		},

		sceneName: function (scene) {
			var name = scene.name;

			if (name === '!@<share>@!')
				name = 'Shared Scene';

			sceneName.set(name);
		},

		world: function (scene) {
			world.setWidth(scene.world.width);
			world.setHeight(scene.world.height);
		},

		viewports: function (scene) {
			var viewports = scene.viewports;

			// Create Serialized Viewports
			for(var i = 0; i < viewports.length; i++) {
				if (viewports[i].name == 'Main') {
					editorViewports.add(viewports[i]).NoClipping().NoCulling().NoMouseBounded().Stroke('none');
				} else {
					editorViewports.add(viewports[i]).NoClipping().NoCulling().NoMouseBounded();  
				}
			}

			// Create editor only objects, viewports and game objects
			editorSetup.display();
		},

		getGameObject: function (serializedGameObject) {
			return setupEditorObject.setup(serializedGameObject.id, serializedGameObject.g, serializedGameObject.v, this.getGameObjectArgs(serializedGameObject["properties"]));
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
