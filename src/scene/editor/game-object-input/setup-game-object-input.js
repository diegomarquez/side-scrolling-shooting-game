define(function(require) {
	var gb = require('gb');

	var editorConfig = require('editor-config');
	
	var gameObjectContextMenu = require('game-object-context-menu');
	var controlObjectContextMenu = require('control-object-context-menu');
	
	var GameObjectMouseInteraction = require("class").extend({
		init: function() {
			this.contextMenu = new gameObjectContextMenu().create();
			this.controlObjectContextMenu = new controlObjectContextMenu().create();
		},

		setupInteraction: function(go) {
			setUpMouseEvents.call(this, go);
		}
	});

	Object.defineProperty(require('game-object').prototype, "Selected", { 
		get: function() {
			return this.selected;
		},
		
		set: function(value) {
			if (value) {
				this.renderer.debugColor = "#00FF00";
			} else {
				this.renderer.debugColor = "#FFFF00";
			}

			this.selected = value;
		}
	});

	var setUpMouseEvents = function(go) {

		if (!gb.goPool.getConfigurationObject(go.typeId).hasMouseSupport()) {
			return;
		}

		go.Dragable = true;

		go.single(go.CONTEXT_MENU, this, function(mouseData) {
			if (editorConfig.isControlObject(mouseData.go.typeId)) {
				this.controlObjectContextMenu.show(mouseData);
			}
			else if (editorConfig.isDraggableOnlyObject(mouseData.go.typeId)) {

			}
			else {
				this.contextMenu.show(mouseData);
			}
		});

		go.single(go.CLICK, this, function(mouseData) {
			this.contextMenu.hide();
			this.controlObjectContextMenu.hide();
		});

		go.single(go.MOUSE_DRAG_START, this, function(mouseData) {
			mouseData.go.Selected = true;
		});

		go.single(go.MOUSE_DRAG_END, this, function(mouseData) {
			mouseData.go.Selected = false;
		});

		if (go.childs) {
			for (var i = 0; i < go.childs.length; i++) {
				// Editor only game objects are skipped, only logic game only objects need all this event hooking
				if (!editorConfig.isEditorGameObject(go.childs[i].typeId)) {
					setUpMouseEvents.call(this, go.childs[i]);
				}
			}
		}
	}
	
	return new GameObjectMouseInteraction();
});

