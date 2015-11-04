define(function(require) {
	var gb = require('gb');
	var editorConfig = require('editor-config');

	var GameObjectCloner = require('class').extend({
		init: function() {
			
		},

		clone: function(go) {
			if (go.hasStructuralChanges()) {
				// Game objects with changes on their child structure need a little bit of extra work to be cloned
				complexClone(go);
			} else {
				// Game Object with no changes on their child structure are easy to clone
				simpleClone(go);
			}
		}
	});

	var simpleClone = function(from) {
		// Create the clone
		var clone = require('setup-editable-game-object').setupWithGameObject(from.typeId, from);
		// Apply all the editable attributes and position from the original into the clone
		require('attribute-assigner').assignFrom(from, clone);

		if (clone) {
			require('object-counter').count(clone);
			require('object-counter').showSuccessFeedback();

			showGizmos(from, clone);
		}
	}

	var complexClone = function(from) {
		// Create a temporary new configuration for the clone, and get all the child configurations that get created in the process
		var newConfigurationResult = require('configuration-creator').createFromGameObject(from, {
			force: true,
			getChildIds: true
		});

		// Create an object with the new configuration id
		var clone = require('setup-editable-game-object').setupWithGameObject(newConfigurationResult.configurationId, from);
		
		// Rename all the typeIds in the clone to the ones in the original
		replaceTypeIds(clone, from);

		// Set the structural changes flag in the clone
		clone.setStructuralChanges();

		// Delete the temporary configurations created to do the clone 
		gb.goPool.clearConfiguration(newConfigurationResult.configurationId);

		if (newConfigurationResult.childConfigurationIds) {
			for (var i=0; i < newConfigurationResult.childConfigurationIds.length; i++) {
				gb.goPool.clearConfiguration(newConfigurationResult.childConfigurationIds[i]);
			}
		}

		if (clone) {
			require('object-counter').count(clone);
			require('object-counter').showSuccessFeedback();

			showGizmos(from, clone);
		}
	}

	var showGizmos = function(from, clone) {
		from.findChildren().recurse().all(function (child) {
			if (editorConfig.isColliderGizmoGameObject(child.typeId)) {
				if (child.canDraw) {
					clone.findChildren().recurse().all(function(child) {
						if (editorConfig.isColliderGizmoGameObject(child.typeId)) {
							child.show();
						}
					});
				}

				return;
			}

			if (editorConfig.isRotationGizmoGameObject(child.typeId)) {
				if (child.canDraw) {
					clone.findChildren().recurse().all(function(child) {
						if (editorConfig.isRotationGizmoGameObject(child.typeId)) {
							child.show();
						}
					});
				}

				return;
			}

			if (editorConfig.isScaleGizmoGameObject(child.typeId)) {
				if (child.canDraw) {
					clone.findChildren().recurse().all(function(child) {
						if (editorConfig.isScaleGizmoGameObject(child.typeId)) {
							child.show();
						}
					});
				}

				return;
			}
		});
	}

	var replaceTypeIds = function(from, to) {
		from.typeId = to.typeId;

		if (from.components && to.components) {
			for (var i = 0; i < from.components.length; i++) {
				from.components[i].typeId = to.components[i].typeId;
			}
		}

		if (from.childs && to.childs) {
			for (var i = 0; i < from.childs.length; i++) {
				replaceTypeIds(from.childs[i], to.childs[i]);
			}
		}
	}

	return new GameObjectCloner();
});
