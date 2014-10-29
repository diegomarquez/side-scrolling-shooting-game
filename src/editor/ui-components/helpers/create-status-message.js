define(function(require) {
  
  var wrapper = require('wrap-in-div');

  var CreateStatusMessage = require("class").extend({
    init: function() {},

    createErrorMessage: function(message) {
      var messageController = createStructure();
      convertTo.call(messageController, 'Alert: ', message, 'status-error', 'ui-state-error', 'ui-icon-alert');

      return messageController;
    },

    createSuccessMessage: function(message) {
      var messageController = createStructure();
      convertTo.call(messageController, 'Success: ', message, 'status-success', 'ui-state-highlight', 'ui-icon-circle-check');

      return messageController;
    },

    createInfoMessage: function(message) {
      var messageController = createStructure();
      convertTo.call(messageController, 'Info: ', message, 'status-success', 'ui-state-highlight', 'ui-icon-info');

      return messageController;
    }
  });

  var createStructure = function(message, statusTitle) {
  	var container = $(document.createElement('div'));

  	container.addClass('ui-corner-all');

  	var icon = $(document.createElement('span'));
  	icon.css({ 'float': 'left', 'margin-right': '3px'});

  	var statusTitle = $(document.createElement('strong'))
  	statusTitle.html(statusTitle);

  	var contentWrapper = $(wrapper.wrap([icon, statusTitle]));

  	var statusMessage = document.createTextNode(message);

  	contentWrapper.append(statusMessage);

  	container.append(contentWrapper);

  	var controller = {
    	html: container,
      messageTitle: statusTitle, 
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

        if (m == '' || !m) {
          $(this.html).hide();
        } else {
          $(this.html).show(0);
        }
      },

      toError: function(m) { 
        convertTo.call(this, 'Alert: ', m, 'status-error', 'ui-state-error', 'ui-icon-alert'); 
      },
      
      toSuccess: function(m) { 
        convertTo.call(this, 'Success: ', m, 'status-success', 'ui-state-highlight', 'ui-icon-circle-check'); 
      },
      
      toInfo: function(m) { 
        convertTo.call(this, 'Info: ', m, 'status-success', 'ui-state-highlight', 'ui-icon-info'); 
      }
    }

    return controller;
  } 
  
  var convertTo = function(title, message, mainClass, state, icon) {
    this.messageTitle.html(title);

    this.html.removeClass();
    
    this.html.addClass(mainClass);
    this.html.addClass(state);

    this.html.find('span').removeClass();
    this.html.find('span').addClass('ui-icon');
    this.html.find('span').addClass(icon);

    this.message(message);
  }

  return new CreateStatusMessage();
});