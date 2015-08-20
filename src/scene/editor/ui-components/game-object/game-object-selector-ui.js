define(function(require) {
	var gb = require('gb');

	var GameObjectSelector = require('ui-component').extend({
		init: function() {
			this.gameObjectSelectorUI = null;
		},

		toButtons: function() {
			this.gameObjectSelectorUI.getOptions().selector = false;
			this.gameObjectSelectorUI.getOptions().buttons = true;
		},

		show: function(event, objectCategory) {
			this.gameObjectSelectorUI.getOptions().data = function() {
				return require('editor-config').getCategoryGameObjects(objectCategory);
			};

			this.gameObjectSelectorUI.refresh();


			this.gameObjectSelectorUI.show(event);
		},

		create: function() {
			var self = this;

			this.gameObjectSelectorUI = new (require('dropdown-scroll'))().create({
				id: 'game-object-selector',
				icon: 'chevron-down',
				defaultMessage: 'Choose a Game Object',
				selectedMessage: '',
				selector: true,
				data: function() {      
					return require('editor-config').getGameObjects({ filterChilds: true });
				},
				onClick: function(gameObjectName) {
					self.gameObjectSelectorUI.getOptions().selector = true;
					self.gameObjectSelectorUI.getOptions().buttons = false;

					if (require('object-counter').canCreate()) {
						require('object-counter').showErrorFeedback();
						return;
					}

					var go = require('setup-editable-game-object').setupWithViewport(
						gameObjectName,
						'First',
						[{viewport: 'Main', layer: 'Front'}],
						require('main-viewport').get()
					);

					if (go) {
						require('object-counter').count(go);
					}

					gb.game.get_extension(require('logger')).success('Game object created successfully! ' + require('object-counter').toString());
				}
			});

			require('editor-delegates').add(gb.goPool, gb.goPool.CREATE_CONFIGURATION, this, function (configuration) {
				this.gameObjectSelectorUI.refresh();
			});

			require('editor-delegates').add(gb.goPool, gb.goPool.UPDATE_CONFIGURATION, this, function (configuration) {
				this.gameObjectSelectorUI.refresh();
			});

			require('editor-delegates').add(gb.goPool, gb.goPool.CLEAR_CONFIGURATION, this, function (configuration) {
				this.gameObjectSelectorUI.refresh();
			});

			return require('wrap-in-div').wrap(this.gameObjectSelectorUI.html, {
				id: 'game-object-selector-wrapper',
				classNames: ['well', 'well-small']
			});
		},
	});

	return GameObjectSelector;
});