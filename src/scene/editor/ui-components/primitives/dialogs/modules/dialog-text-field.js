define(function(require) {
	var wrapper = require('wrap-in-div');

	var DialogTextField = require('class').extend({
		init: function(options) {
			this.options = options;
		},

		name: function() {
			return this.options.name;
		},

		html: function() {
			return this.h;
		},

		validations: function() {
			return this.options.validations;
		},

		create: function() {
			var lowerCaseName = this.name().toLowerCase();

			var label = document.createElement('label');
			label.innerHTML = this.name();
			$(label).attr('for', lowerCaseName);

			var input = document.createElement('input');
			input.type = 'text';
			input.name = lowerCaseName;
			input.id = lowerCaseName;
			input.value = this.options.value;
			
			$(input).addClass('ui-corner-all');

			this.h = wrapper.wrap([label, input]);
		},

		open: function() {
			// Set the current value as default to go back to it if necessary
			var input = $(this.html()).find('input');
			input.attr('default', input.value);      
		},

		reset: function() {
			var input = $(this.html()).find('input');
			input.value = $(input).attr('default');
		},

		update: function(value) {

		},

		valueGetter: function() {
			var input = $(this.html()).find('input');

			return function() {
				return input[0].value;
			}
		},

		applyFeedback: function() {
			var input = $(this.html()).find('input');
			$(input).addClass("ui-state-error");
		},

		resetFeedback: function() {
			var input = $(this.html()).find('input');
			$(input).removeClass("ui-state-error");
		}
	});

	return DialogTextField;
});