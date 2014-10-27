define(function(require) {
  
  var wrapper = require('wrap-in-div');

  var CreateStatusMessage = require("class").extend({
    init: function() {},

    createErrorMessage: function(message) {
      var messageController = createStructure(message, 'Alert: ')

      $(messageController.html).addClass('status-error');
      $(messageController.html).addClass('ui-state-error');
      
      var icon = $(document.createElement('span'));

      $(messageController.html).find('span').addClass('ui-icon-alert');
      $(messageController.html).find('span').css({ 'float': 'left' });

      return messageController;
    },

    createSuccessMessage: function(message) {
      var messageController = createStructure(message, 'Sucess: ')

      $(messageController.html).addClass('status-success');
      $(messageController.html).addClass('ui-state-highlight');
      
      var icon = $(document.createElement('span'));

      $(messageController.html).find('span').addClass('ui-icon-circle-check');
      $(messageController.html).find('span').css({ 'float': 'left' });

      return messageController;
    }
  });

  var createStructure = function(message, statusTitle) {
	var container = $(document.createElement('div'));

	container.addClass('ui-corner-all');

	var icon = $(document.createElement('span'));

	icon.addClass('ui-icon');
	icon.css({ 'float': 'left' })

	var statusTitle = $(document.createElement('strong'))
	statusTitle.html(statusTitle);

	var contentWrapper = $(wrapper.wrap([icon, statusTitle]));

	var statusMessage = document.createTextNode(message);

	contentWrapper.append(statusMessage);

	container.append(contentWrapper);

	var controller = {
      	html: container,
      	messageContent: statusMessage, 
      	
      	appendTo: function(parent) {
      		var content = $(this.html);

      		if (!content.parent()) return;

      		$(parent).append(content);
      	},

      	remove: function() {
      		$(this.html).remove();
      	},

      	message: function(m) {
      		this.messageContent.textContent = m;
      	}
      }

      return controller;
  }	

  return new CreateStatusMessage();
});