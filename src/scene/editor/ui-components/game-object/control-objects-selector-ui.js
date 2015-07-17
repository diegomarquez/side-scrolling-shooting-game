define(function(require) {
	var gb = require('gb');

	var ControlObjectSelector = require('ui-component').extend({
		init: function() {
			this.controlObjectSelectorUI = null;
		},

		show: function(event) {
			this.controlObjectSelectorUI.show(event);
		},

		create: function() {
			this.controlObjectSelectorUI = new (require('dropdown-scroll'))().create({
				id: 'control-object-selector',
				icon: 'plus',
				defaultMessage: 'Add a Control Object',
				buttons: true,
				height: 200,
				data: function() {
					return require('editor-config').getControlObjects();
				},
				onClick: function(controlObjectName) {
					gb.game.get_extension(require('logger')).success('Control object created successfully!');
					
					require('setup-editable-game-object').setupWithViewport(
						controlObjectName,
						'First',
						[{viewport: 'Main', layer: 'Front'}],
						require('main-viewport').get()
					);
				}
			});

			return require('wrap-in-div').wrap(this.controlObjectSelectorUI.html, {
				id: 'control-object-selector-wrapper',
				classNames: ['well', 'well-small']
			});
		},
	});

	return ControlObjectSelector;
});