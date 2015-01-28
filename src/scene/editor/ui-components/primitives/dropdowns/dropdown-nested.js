define(function(require) {
	var wrapper = require('wrap-in-div');



  var DropdownNested = require('dropdown-base').extend({
    init: function() {
      
    },

    setupUI: function(container, contentContainer, options) {
    	$(contentContainer).css({
    		height: 305,
    		overflow: 'auto'
    	});

    	$(contentContainer).jScrollPane({showArrows: true});
    },

    createOptions: function(options) {
    	var optionElements = [];

      var data = options.data();

      for (var i = 0; i < data.length; i++) {
        var option = $(document.createElement('li'));
        
        this.setOptionState(option, data[i].id, options);
        
        this.createNestedOptions(data[i], option, options);

        option.html(data[i].id);
        option.addClass('ui-corner-all');
        option.attr('value', data[i].id);
        
        if (data[i].children.length > 0) {
        	option.append(getArrowIcon());
        }

        optionElements.push(option[0]);
      }

      return optionElements;
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
          event.stopImmediatePropagation();

          $(this).removeClass('ui-state-hover');

          var value = $(this).attr('value');

          mainButton.innerHTML = options.selectedMessage + " " + value;
          $(container).attr('value', value);

          self.removeMenu(contentContainer);
        });

        $(option).find('span').on('click', function (event) {
        	event.stopImmediatePropagation();

        	$($(contentContainer).data('nestedOptions')).remove();
        	$(this).parent().data('appendChildren')();
        });
      }
    },

    removeMenu: function(element) {
    	$($(element).data('nestedOptions')).remove();
    	$(element).remove();

      this.resetContentState();
      this.refreshContent();

      $(element).removeData('nestedOptions');
      $(element).jScrollPane().data('jsp').destroy();
    },

    createNestedOptions: function(data, parent, options) {
			var nestedOption = this.createContentContainer();

			var nestedChildren = [];

			for (var i = 0; i < data.children.length; i++) {
				var child = data.children[i];
				var nestedChild = $(document.createElement('li')); 

		  	nestedChild.addClass('ui-corner-all');
				nestedChild.attr('value', child.id);
		  	nestedChild.html(child.id);
				
				if (data.children[i].children.length > 0) {
        	nestedChild.append(getArrowIcon());
        }

				var childContent = this.createNestedOptions(child, nestedChild, options);

				nestedChild.append(childContent);
				$(nestedOption).find('ul').append(nestedChild);

				nestedChildren.push(nestedChild);
			}

			var self = this;

			parent.data('appendChildren', function() {
				for (var i = 0; i < nestedChildren.length; i++) {
	        self.setOptionState(nestedChildren[i], data.children[i].id, options);
	      }

				self.setupOptionEvents(nestedChildren, self.getContainer(), self.getContentContainer(), options);

				if (!$(self.getContentContainer()).data('nestedOptions')) {
					$(self.getContentContainer()).data('nestedOptions', []);	
				}
				
				$(self.getContentContainer()).data('nestedOptions').push(nestedOption);

				$(nestedOption).appendTo('body').position({
				  my: 'left top',
				  at: 'right+5 top-2',
				  of: parent
				});
			});
		}
  });

	var getArrowIcon = function() {
		var arrowIcon = $(document.createElement('span'));
	  arrowIcon.addClass('ui-icon');
	  arrowIcon.addClass('ui-icon-triangle-1-e');

	  arrowIcon.css({ 
	    'float': 'right', 
	    'margin-right': '3px',
	    'margin-top': '1px'
	  });

	  return arrowIcon;
	}

  return DropdownNested;
});
