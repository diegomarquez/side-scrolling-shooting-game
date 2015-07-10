define(function(require) {
	var gb = require('gb');
	var wrapper = require('wrap-in-div');
	var button = require('button'); 
	var toggle = require('toggle');

	var GameObjectCreator = require('ui-component').extend({
		init: function() {
			this.element = null;
			this.toggle = null;
		},

		create: function(options) {
			this.element = new button().create({
				id: 'game-object-remove-button',
				label: 'Remove all Game Objects',
				onClick: function(event) {
					gb.reclaimer.clearAllObjectsFromPools().now();
					// Re-Create editor specific game objects
					require('editor-setup').setupGameObjects();

					$('#remove-toggle-button input').bootstrapToggle('off');
				}
			});

			var buttonElement = this.element;

			$(buttonElement).button();

			$(buttonElement).find('span').css({
				'flex': 1
			});

			$(buttonElement).css({
				'display': 'flex',
				'flex-flow': 'row nowrap'
			});

			var iconSpan = document.createElement('span');
			iconSpan.className = 'glyphicon glyphicon-trash';
			$(buttonElement).append(iconSpan);

			this.toggle = toggle.create({
				id: 'remove-toggle-button',
				on: ' ',
				off: ' ', 
				onChange: function() {
					$(buttonElement).button('option', 'disabled', !$(this).prop('checked'));
				}
			});

			return wrapper.wrap([this.element, this.toggle], {
				id: 'game-object-remove-button-wrapper',
				classNames: ['well', 'well-small']
			});
		},

		destroy: function() {
			$(this.element).button('destroy');      
		}
	});

	return GameObjectCreator;
});