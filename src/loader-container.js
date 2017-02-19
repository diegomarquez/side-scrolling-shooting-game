define(function(require) {
	require('jquery');

	var TRANSITION_DURATION = '1.0s';
	var HALF_TRANSITION_DURATION = '0.5s';
	var TRANSITION_WAIT = '2.0s';
	var INITIAL_DELAY = '2.5s';

	if(require('query-string').skipLoader()) {
		TRANSITION_DURATION = '0s';
		TRANSITION_WAIT = '0s';
		INITIAL_DELAY = '0s';
	}

	var LoaderContainer = require('delegate').extend({
		init: function() {
			this._super();

			this.state = this.CLOSED;
			this.loader = $('#loader-wrapper');
		},

		detachLoader: function() {
			this.loader.remove();
		},

		attachLoader: function() {
			if (this.loader.parent().length >= 1) {
				return;
			}

			$('body').prepend(this.loader);
		},

		open: function(event, delay) {
			this.doTransition(
				$('#loader'),
				{ 'opacity' : 1 },
				{ 'opacity' : 0 },
				delay || INITIAL_DELAY,
				HALF_TRANSITION_DURATION,
				function() {
					this.doTransition(
						$('.section-left'),
						{ 'transform': 'translateX(100%)', 'left': '-50%' },
						{ 'transform': 'translateX(-100%)', 'left': '0' },
						'0s',
						TRANSITION_DURATION
					);

					this.doTransition(
						$('.section-right'),
						{ 'transform': 'translateX(-100%)', 'right': '-50%' },
						{ 'transform': 'translateX(100%)', 'right': '0' },
						'0s',
						TRANSITION_DURATION,
						function () {
							// Remove the loader
							this.detachLoader();
							// Set the state of the loader to OPEN
							this.state = this.OPEN;
							// Trigger a delegate to do things once the animation is complete
							this.execute(event || this.OPEN);
						}.bind(this)
					);
				}.bind(this)
			)
		},

		close: function() {
			// Attach the loader
			this.attachLoader();

			this.doTransition(
				$('.section-left'),
				{ 'transform': 'translateX(-100%)', 'left': '0' },
				{ 'transform': 'translateX(100%)', 'left': '-50%' },
				'0s',
				TRANSITION_DURATION
			);

			this.doTransition(
				$('.section-right'),
				{ 'transform': 'translateX(100%)', 'right': '0' },
				{ 'transform': 'translateX(-100%)', 'right': '-50%' },
				'0s',
				TRANSITION_DURATION,
				function () {
					this.doTransition(
						$('#loader'),
						{ 'opacity': 0 },
						{ 'opacity': 1 },
						'0s',
						TRANSITION_WAIT,
						function() {
							// Set the state of the loader to CLOSED
							this.state = this.CLOSED;
							// Trigger CLOSE delegate when completed to do stuff while everything is hidden
							this.execute(this.CLOSE);
						}.bind(this)
					);
				}.bind(this)
			);
		},

		transition: function() {
			// Attach the loader
			this.attachLoader();

			this.doTransition(
				$('.section-left'),
				{ 'transform': 'translateX(-100%)', 'left': '0' },
				{ 'transform': 'translateX(100%)', 'left': '-50%' },
				'0s',
				TRANSITION_DURATION
			);

			this.doTransition(
				$('.section-right'),
				{ 'transform': 'translateX(100%)', 'right': '0' },
				{ 'transform': 'translateX(-100%)', 'right': '-50%' },
				'0s',
				TRANSITION_DURATION,
				function () {
					// Set the state of the loader to CLOSED
					this.state = this.CLOSED;
					// Trigger CLOSE delegate when completed to do stuff while everything is hidden
					this.execute(this.CLOSE);

					this.doTransition(
						$('#loader'),
						{ 'opacity': 0 },
						{ 'opacity': 1 },
						'0s',
						TRANSITION_WAIT,
						function() {
							this.open(this.TRANSITION, TRANSITION_DURATION);
						}.bind(this)
					);
				}.bind(this)
			);
		},

		show: function() {
			this.loader.show();
		},

		hide: function() {
			this.loader.hide();
		},

		isClosed: function() {
			return this.state == this.CLOSED;
		},

		isOpen: function() {
			return this.state == this.OPEN;
		},

		doTransition(element, startProperties, endProperties, delay, duration, onComplete) {
			var onTransitionComplete = function() {
				element.off('transitionend', onTransitionComplete);

				element.css({ 'trasition': 'none' });

				element[0].offsetHeight;

				element.css(endProperties);

				if (onComplete)
					onComplete()
			}

			element.on('transitionend', onTransitionComplete);

			var props = [];

			for (var prop in startProperties) {
				props.push(prop);
			}

			element.css(startProperties);

			element.css({
				'trasition-delay': delay,
				'transition-duration': duration,
				'transition-timing-function': 'ease',
				'transition-property': props.join(", "),
			});

			element[0].offsetHeight;

			element.css(endProperties);
		}
	});

	Object.defineProperty(LoaderContainer.prototype, 'CLOSE', { get: function() { return 'close'; } });
	Object.defineProperty(LoaderContainer.prototype, 'TRANSITION', { get: function() { return 'transition'; } });

	Object.defineProperty(LoaderContainer.prototype, 'CLOSED', { get: function() { return 'closed'; } });
	Object.defineProperty(LoaderContainer.prototype, 'OPEN', { get: function() { return 'open'; } });

	return new LoaderContainer();
});


