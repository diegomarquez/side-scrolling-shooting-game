define(function(require) {
	var wrapper = require('wrap-in-div');
	var button = require('button'); 
	var gb = require('gb');

	var setupEditorObject = require('setup-editable-game-object');

	var activeViewports = require('active-viewports');
	var selectedGameObject = require('selected-game-object');
	var selectedGroup = require('selected-group');
	var mainViewport = require('main-viewport');

	var GameObjectCreator = require('ui-component').extend({
		init: function() {
			this.element = null;
		},

		create: function(options) {
			this.element = new button().create({
				id: 'game-object-create-button',
				label: 'Create Game Object',
				onClick: function(event) {
					var goName = selectedGameObject.get();
					var group = selectedGroup.get();
					var viewports = activeViewports.get();
					var mainViewportName = mainViewport.get();

					if (require('object-counter').canCreate()) {
						require('object-counter').showErrorFeedback();
						return;
					}

					if (goName == 'Nothing' || goName == '' || !goName) {
						gb.game.get_extension(require('logger')).error('No game object has been selected');
						gb.game.get_extension(require('logger')).show();

						setTimeout(gb.game.get_extension(require('logger')).hide, 3000);
						return;
					}

					if (!gb.goPool.configurationExists(goName)) {
						gb.game.get_extension(require('logger')).error('Game object type does not exist');
						gb.game.get_extension(require('logger')).show();

						setTimeout(gb.game.get_extension(require('logger')).hide, 3000);
						return;
					}

					if (!viewports || viewports.length == 0) {
						gb.game.get_extension(require('logger')).error('No viewports have been selected');
						gb.game.get_extension(require('logger')).show();

						setTimeout(gb.game.get_extension(require('logger')).hide, 3000);
						return;
					}

					var go = setupEditorObject.setupWithViewport(goName, group, viewports, mainViewportName);

					if (go) {
						require('object-counter').count(go);
					}

					gb.game.get_extension(require('logger')).success('Game object created successfully! ' + require('object-counter').toString());
				}
			});

			$(this.element).button();

			$(this.element).find('span').css({
				'flex': 1 
			});

			$(this.element).css({
				'display': 'flex',
				'flex-flow': 'row nowrap'
			});

			var iconSpan = document.createElement('span');
			iconSpan.className = 'glyphicon glyphicon-plus';
			$(this.element).append(iconSpan);

			return wrapper.wrap(this.element, {
				id: 'game-object-create-button-wrapper',
				classNames: ['well', 'well-small']
			});
		},

		destroy: function() {
			$(this.element).button('destroy');      
		}
	});

	return GameObjectCreator;
});