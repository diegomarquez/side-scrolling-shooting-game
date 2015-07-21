define(function(require) {
	var gb = require('gb');

	var displayElement = document.createElement('div');

	var scroll = function() {
		var x = 5 + gb.game.mainContainer.scrollLeft;
		var y = gb.canvas.clientTop + 5 + gb.game.mainContainer.scrollTop;

		displayElement.style.top = y + 'px';
		displayElement.style.left = x + 'px';
	}

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

			displayElement.id = 'logger';
			displayElement.style.position = 'absolute';
			displayElement.style.top = (gb.canvas.clientTop + 5).toString() + 'px';
			displayElement.style.left = '5' + 'px';
			displayElement.style.pointerEvents = 'none';
			displayElement.style.whiteSpace = 'nowrap';

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
			document.getElementById('logger-info-container').style.display == 'block' ? this.hide() : this.show();
		},

		show: function() {
			document.getElementById('logger-info-container').style.display = 'block';
			gb.game.mainContainer.addEventListener('scroll', scroll);
			scroll();
		},

		hide: function() {
			document.getElementById('logger-info-container').style.display = 'none';
			gb.game.mainContainer.removeEventListener('scroll', scroll);
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