define(function(require) {
	var editorConfig = require('editor-config');

	var wrapper = require('wrap-in-div');
	var dropdown = require('dropdown-scroll');

	var gb = require('gb');
	
	var setupEditorObject = require('setup-editable-game-object');

	var ControlObjectSelector = require('ui-component').extend({
		init: function() {
			this.controlObjectSelectorUI = null;
		},

		create: function() {
			this.controlObjectSelectorUI = new dropdown().create({
				id: 'control-object-selector',
				icon: 'plus',
				defaultMessage: 'Add a Control Object',
				buttons: true,
				height: 200,
				data: function() {
					return editorConfig.getControlObjects();
				},
				onClick: function(controlObjectName) {
					gb.game.get_extension(require('logger')).success('Control object created successfully!');
					
					setupEditorObject.setupWithViewport(
						controlObjectName,
						'First',
						[{viewport: 'Main', layer: 'Front'}],
						require('main-viewport').get()
					);
				}
			});

			return wrapper.wrap(this.controlObjectSelectorUI.html, {
				id: 'control-object-selector-wrapper',
				classNames: ['well', 'well-small']
			});
		},
	});

	return ControlObjectSelector;
});