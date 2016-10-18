define(function(require) {
	var Dialog = require('ui-component').extend({
		init: function() {

		},

		create: function(options) {
			var container = document.createElement('div');
			container.id = options.id;
			$(container).addClass('dialog');

			var message = document.createElement('div');
			message.innerHTML = options.message;

			$(container).append(message);

			options.create = function (event, ui) {
				$(this).css("minWidth", options.minWidth);
			}

			options.resizeStop = function (event, ui) {
				$(dialog).dialog("option", "position", { my: "center", at: "center", of: window });
			}

			var dialog = $(container).dialog(options);

			$(dialog).submit( function(e) {
				e.preventDefault();
			});

			$(dialog).on('autoCenter', function() {
				$(dialog).dialog("option", "position", { my: "center", at: "center", of: window });
			});

			this.dialog = dialog;

			return dialog;
		},

		destroy: function() {
			$(this.dialog).dialog('destroy').remove();
			this.dialog = null;
		}
	});

	return Dialog;
});