define(function(require) {
	var wrapper = require('wrap-in-div');

	var DropdownScroll = require('dropdown-base').extend({
		init: function() {
			
		},

		setupUI: function(container, contentContainer, options) {
			$(contentContainer).css({
				'max-height': 305
			});

			$(contentContainer).jScrollPane({showArrows: true});

			if (parseFloat($(contentContainer).css('height')) < 305) {
				$(contentContainer).find('ul').css({
					'width': ''
				});	
			} else {
				$(contentContainer).find('ul').css({
					'width': 'auto'
				});
			}
		},

		setupOptionEvents: function(optionElements, container, contentContainer, options) {
			this._super(optionElements, container, contentContainer, options);

			var mainButton = $(container).find('.main-button').find('span')[0];

			var self = this;

			for (var i = 0; i < optionElements.length; i++) {
				var option = optionElements[i];

				if (!$(option).hasClass('ui-state-default')) {
					continue;
				}

				$(option).on('click', function() {
					$(this).removeClass('ui-state-hover');

					var value = $(this).attr('value');
					$(container).attr('value', value);

					if (options.selector) {
						mainButton.innerHTML = options.selectedMessage + " " + value;
					}

					if (options.buttons) {
						if (options.onClick) {
							options.onClick(value);
						}
					}

					self.removeMenu(contentContainer);
				});
			}
		},

		removeMenu: function(element) {
			this._super(element);

			this.refreshContent();
			$(element).jScrollPane().data('jsp').destroy();
		}
	});

	return DropdownScroll;
});
