define(function(require) {
	var wrapper = require('wrap-in-div');

  var DropdownScroll = require('dropdown-base').extend({
    init: function() {
      
    },

    setupUI: function(container, contentContainer, options) {
    	$(contentContainer).css({
    		height: 305
    	});

    	$(contentContainer).find('ul').css({
    		'margin-right': 13
    	});

    	$(contentContainer).jScrollPane({showArrows: true});
    },

    removeMenu: function(element) {
    	this._super(element)
      $(element).jScrollPane().data('jsp').destroy();
    }
  });

  return DropdownScroll;
});
