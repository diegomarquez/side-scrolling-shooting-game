define(function(require) {
	var editorConfig = require('editor-config');

	var wrapper = require('wrap-in-div');
	var dropdown = require('dropdown-scroll');

	var gb = require('gb');
	var editorDelegates = require('editor-delegates');

	var GameObjectSelector = require('ui-component').extend({
		init: function() {
			this.gameObjectSelectorUI = null;
		},

		create: function() {
			this.gameObjectSelectorUI = new dropdown().create({
				id: 'game-object-selector',
				icon: 'chevron-down',
				defaultMessage: 'Choose a Game Object',
				selectedMessage: 'Selected Game Object:',
				selector: true,
				data: function() {      
					return editorConfig.getGameObjects({ filterChilds: false });
				}
			});

			editorDelegates.add(gb.goPool, gb.goPool.CREATE_CONFIGURATION, this, function (configuration) {
				this.gameObjectSelectorUI.refresh();
			});

			editorDelegates.add(gb.goPool, gb.goPool.UPDATE_CONFIGURATION, this, function (configuration) {
				this.gameObjectSelectorUI.refresh();
			});

			editorDelegates.add(gb.goPool, gb.goPool.CLEAR_CONFIGURATION, this, function (configuration) {
				this.gameObjectSelectorUI.refresh();
			});

			return wrapper.wrap(this.gameObjectSelectorUI.html, {
				id: 'game-object-selector-wrapper',
				classNames: ['well', 'well-small']
			});
		},
	});

	return GameObjectSelector;
});