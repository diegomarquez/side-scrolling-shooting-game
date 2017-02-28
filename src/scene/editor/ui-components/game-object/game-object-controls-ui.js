define(function(require) {
	var wrapper = require('wrap-in-div');

	var boundingBoxesToggleUI = require('bounding-boxes-toggle-ui');
	var collidersToggleUI = require('colliders-toggle-ui');
	var registrationPointsToggleUI = require('registration-points-toggle-ui');
	var rotationsToggleUI = require('rotation-toggle-ui');
	var scalesToggleUI = require('scale-toggle-ui');

	var GameObjectControls = require('ui-component').extend({
		init: function() {
			this.boundings = null;
			this.colliders = null;
			this.centers = null;
			this.rotations = null;
			this.scales = null;
		},

		create: function() {
			this.boundings = (new boundingBoxesToggleUI()).create();
			this.colliders = (new collidersToggleUI()).create();
			this.centers = (new registrationPointsToggleUI()).create();
			this.rotations = (new rotationsToggleUI()).create();
			this.scales = (new scalesToggleUI()).create();

			var label = document.createElement('label');
			label.innerHTML = 'Game Object Controls';

			require('editor-delegates').add(require('setup-editable-game-object'), require('setup-editable-game-object').GAME_OBJECT_ADDED, this, function (go) {
				if (!go.isContainer())
					return;

				if (collidersToggleUI.isOn()) {
					go.toggleVisibility(true).recurse().ommitSelf().all(function (child) {
						return require('editor-config').isColliderGizmoGameObject(child.typeId);
					});	
				}
				
				if (rotationsToggleUI.isOn()) {
					go.toggleVisibility(true).recurse().ommitSelf().all(function (child) {
						return require('editor-config').isRotationGizmoGameObject(child.typeId);
					});
				}

				if (scalesToggleUI.isOn()) {
					go.toggleVisibility(true).recurse().ommitSelf().all(function (child) {
						return require('editor-config').isScaleGizmoGameObject(child.typeId);
					});	
				}
			});

			require('editor-delegates').add(require('gb'), require('gb').GAME_OBJECT_ADDED, this, function (go) {
				if (!go.isContainer())
					return;

				if (collidersToggleUI.isOn()) {
					go.toggleVisibility(true).recurse().ommitSelf().all(function (child) {
						return require('editor-config').isColliderGizmoGameObject(child.typeId);
					});	
				}
				
				if (rotationsToggleUI.isOn()) {
					go.toggleVisibility(true).recurse().ommitSelf().all(function (child) {
						return require('editor-config').isRotationGizmoGameObject(child.typeId);
					});
				}

				if (scalesToggleUI.isOn()) {
					go.toggleVisibility(true).recurse().ommitSelf().all(function (child) {
						return require('editor-config').isScaleGizmoGameObject(child.typeId);
					});
				}
			});

			return wrapper.wrap([label, this.boundings, this.colliders, this.centers, this.rotations, this.scales], {
				id: 'game-object-control-buttons',
				classNames: ['well', 'well-small']
			});
		},

		toggleColliders: function() {
			var toggle = $(this.colliders).find('input');

			if(!toggle.prop('checked')) {
				toggle.bootstrapToggle('on');
			} else {
				toggle.bootstrapToggle('off');
			}
		},

		toggleRotations: function() {
			var toggle = $(this.rotations).find('input');

			if(!toggle.prop('checked')) {
				toggle.bootstrapToggle('on');
			} else {
				toggle.bootstrapToggle('off');
			}
		},

		toggleScales: function() {
			var toggle = $(this.scales).find('input');

			if(!toggle.prop('checked')) {
				toggle.bootstrapToggle('on');
			} else {
				toggle.bootstrapToggle('off');
			}
		},

		toggleBoundings: function() {
			var toggle = $(this.boundings).find('input');

			if(!toggle.prop('checked')) {
				toggle.bootstrapToggle('on');
			} else {
				toggle.bootstrapToggle('off');
			}
		},

		toggleCenters: function() {
			var toggle = $(this.centers).find('input');

			if(!toggle.prop('checked')) {
				toggle.bootstrapToggle('on');
			} else {
				toggle.bootstrapToggle('off');
			}
		},
		
		isShowingBoundindBoxes: function() {
			return $(this.boundings).find('input').prop('checked');
		},
		
		isShowingCenters: function() {
			return $(this.centers).find('input').prop('checked');
		},
		
		isShowingScaleHandles: function() {
			return $(this.scales).find('input').prop('checked');
		},
		
		isShowingColliderHandles: function() {
			return $(this.colliders).find('input').prop('checked');
		},
		
		isShowingRotationHandles: function() {
			return $(this.rotations).find('input').prop('checked');
		}
	});
  
	return GameObjectControls;
});