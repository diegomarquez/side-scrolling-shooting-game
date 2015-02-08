define(function(require) {
	var gb = require('gb');

	var Logger = require('extension').extend({
		init: function() {},

		type: function() {
			return gb.game.CREATE;
		},

		execute: function(args) {
			var hide = false;

			if (args) {
				hide = args.hide || false;
			}

			displayElement = document.createElement('div');
			displayElement.id = 'logger';
			displayElement.style.position = 'absolute';
			displayElement.style.top = (gb.canvas.clientTop + 5).toString() + 'px';
			displayElement.style.left = '5' + 'px';
			displayElement.style.pointerEvents = 'none';

			var infoContainer = document.createElement('div');
			infoContainer.id = 'logger-info-container';
			infoContainer.style.display = 'none';
			
			displayElement.appendChild(infoContainer);
			
			gb.game.mainContainer.appendChild(displayElement);
		},

		destroy: function() {
			gb.game.mainContainer.removeChild(displayElement);
		},

		toggle: function() {
			var infoContainer = document.getElementById('logger-info-container');

			if (infoContainer.style.display == 'block') {
				infoContainer.style.display = 'none';
			} else {
				infoContainer.style.display = 'block';
			}
		},

		success: function(message) {
			var infoContainer = document.getElementById('logger-info-container');

			var logLine = document.createElement('div');
			var icon = document.createElement('span');

			logLine.style.color = "#00FF00";

			logLine.innerHTML = ' ' + message;

			$(icon).addClass('glyphicon glyphicon-ok-sign');
			$(logLine).prepend(icon);

			$(infoContainer).prepend(logLine);

			if ($(infoContainer).children().length > 5) {
				$(infoContainer).children().last().remove();
			}
		},

		info: function(message) {
			var infoContainer = document.getElementById('logger-info-container');

			var logLine = document.createElement('div');
			var icon = document.createElement('span');

			logLine.style.color = "#FFFF00";

			logLine.innerHTML = ' ' + message;

			$(icon).addClass('glyphicon glyphicon-info-sign');
			$(logLine).prepend(icon);

			$(infoContainer).prepend(logLine);

			if ($(infoContainer).children().length > 5) {
				$(infoContainer).children().last().remove();
			}
		},

		error: function(message) {
			var infoContainer = document.getElementById('logger-info-container');

			var logLine = document.createElement('div');
			var icon = document.createElement('span');

			logLine.style.color = "#FF0000";

			logLine.innerHTML = ' ' + message;

			$(icon).addClass('glyphicon glyphicon-remove-sign');
			$(logLine).prepend(icon);

			$(infoContainer).prepend(logLine);

			if ($(infoContainer).children().length > 5) {
				$(infoContainer).children().last().remove();
			}
		}
	});

	return Logger;
});