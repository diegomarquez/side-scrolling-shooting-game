define(function(require) {
	var gb = require('gb');
	var root = require('root');

	var ControlObjectSelector = require('ui-component').extend({
		init: function() {
			this.controlObjectSelectorUI = null;
			this.hasStartPosition = null;
		},

		show: function(event) {
			this.controlObjectSelectorUI.show(event);
		},

		create: function() {
			var self = this;

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
					controlObjectName = require('editor-config').getControlObjectOriginalName(controlObjectName);

					if (self.hasStartPosition === null) {
						self.hasStartPosition = !!root.findChildren().recurse().firstWithType("StartPosition");
					}

					if (controlObjectName === 'start-position-right') {
						if (self.hasStartPosition) {
							self.startPositionErrorFeedback();
							return;
						}
					}

					if (controlObjectName === 'start-position-left') {
						if (self.hasStartPosition) {
							self.startPositionErrorFeedback();
							return;
						}
					}

					if (controlObjectName === 'start-position-up') {
						if (self.hasStartPosition) {
							self.startPositionErrorFeedback();
							return;
						}
					}

					if (controlObjectName === 'start-position-down') {
						if (self.hasStartPosition) {
							self.startPositionErrorFeedback();
							return;
						}
					}

					if (require('object-counter').canCreate()) {
						require('object-counter').showErrorFeedback();
						return;
					}
					
					var object = require('setup-editable-game-object').setupWithViewport(
						controlObjectName,
						'First',
						[{viewport: 'Main', layer: 'Front'}],
						require('main-viewport').get()
					);

					if (object) {

						if (controlObjectName === 'start-position-right') {
							self.trackStartPositionObject(object);
						}

						if (controlObjectName === 'start-position-left') {
							self.trackStartPositionObject(object);
						}

						if (controlObjectName === 'start-position-up') {
							self.trackStartPositionObject(object);
						}

						if (controlObjectName === 'start-position-down') {
							self.trackStartPositionObject(object);
						}

						require('object-counter').count(object);
						require('object-counter').showSuccessFeedback();
					}
				}
			});

			return require('wrap-in-div').wrap(this.controlObjectSelectorUI.html, {
				id: 'control-object-selector-wrapper',
				classNames: ['well', 'well-small']
			});
		},

		trackStartPositionObject: function(go) {
			this.hasStartPosition = true;

			go.once(go.RECYCLE, this, function() {
				this.hasStartPosition = false;
			});
		},

		startPositionErrorFeedback: function() {
			require('gb').game.get_extension(require('logger')).error('Only one start position object is allowed');
			require('gb').game.get_extension(require('logger')).show();

			setTimeout(require('gb').game.get_extension(require('logger')).hide, 3000);
		}
	});

	return ControlObjectSelector;
});