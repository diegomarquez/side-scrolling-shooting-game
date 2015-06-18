define(function(require) {
	var wrapper = require('wrap-in-div');

	var DialogDropdownField = require('class').extend({
		init: function(options) {
			this.options = options;
		},

		name: function() {
			return this.options.name;
		},

		html: function() {
			return this.h;
		},

		data: function() {
			return this.options.data();
		},

		validations: function() {
			return null;
		},

		create: function() {
			var id = this.name() + '-dropdown-field';

			var label = document.createElement('label');
			label.innerHTML = this.name();
			$(label).attr('for', id);

			var select = document.createElement('select');
			$(select).attr('id', id);
			$(select).attr('name', id);

			this.h = wrapper.wrap([label, select]);
		},

		open: function() {
			var select = $(this.html()).find('select');
			var selectBoxIt = select.data("selectBox-selectBoxIt");

			if (selectBoxIt) {
				selectBoxIt.remove();
				selectBoxIt.destroy();
			}

			$(select).empty().prop( "disabled", (this.data().length == 0)).selectBoxIt({
				populate: this.data()
			})
			.bind('open', function() { 
				$(this).parents().each( function() { 
					if( $(this).hasClass('ui-accordion-content') || $(this).hasClass('ui-dialog-content') || $(this).hasClass('ui-dialog') ) {
						$(this).css( 'overflow', 'visible' )
					}
				});
			}) 
			.bind('close', function() { 
				$(this).parents().each( function() { 
					if( $(this).hasClass('ui-accordion-content') || $(this).hasClass('ui-dialog-content') || $(this).hasClass('ui-dialog')) {
						$(this).css( 'overflow', 'hidden' );
					} 
				});
			});
		},

		reset: function() {

		},

		update: function(value) {
			this.options.data = function() {
				return value;
			}

			this.open();
		},

		valueGetter: function() {
			var select = $(this.html()).find('select');

			return function () {
				return select[0].value;
			} 
		},

		applyFeedback: function() {},

		resetFeedback: function() {}
	});

	return DialogDropdownField;
});