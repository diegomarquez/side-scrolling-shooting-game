define(function(require) {

	var masonry = require('masonry-v2-shim');
	var util = require('util')

	var SetupMasonryContainers = require("class").extend({
	    init: function() {
	    	this.masonryContainers = [];
	    },

	    add: function(elements, options) {	    
	    	var c = document.createElement('div');

	    	for (var i = 0; i < elements.length; i++) {
      			c.appendChild(elements[i]);
	    	};
	    	
	    	this.masonryContainers.push({
	    		container: $(c),
	    		options: options
	    	});

	    	return c;
	    },

	    setup: function() {
	    	for (var i = 0; i < this.masonryContainers.length; i++) {
	    		initMasonryContainer(this.masonryContainers[i].container, this.masonryContainers[i].options);
	    	};
	    }
  	});

	var initMasonryContainer = function(container, options) {
		var mergedOptions = util.shallow_merge(options, {
        	transitionDuration: 0,
        	columnWidth:  function(containerWidth) {
        		return colWidth(container, options, containerWidth);
        	}
      	});

 	 	container.masonry(mergedOptions);
	}

  	var colWidth = function (container, options, containerWidth) {
        var columnNum;

        var elements = container.find(options.itemSelector);

        if (elements.length == 1) {
        	columnNum = 1;
        }

        if (elements.length == 2) {
        	columnNum = 2;
        }

        if (elements.length >= 3) {
	        if (containerWidth > 1200) {
	          columnNum  = 5;
	        } else if (containerWidth > 900) {
	          columnNum  = 4;
	        } else if (containerWidth > 600) {
	          columnNum  = 3;
	        } else {
	          columnNum  = 2;
	        }
        }

        var columnWidth = Math.floor(containerWidth/columnNum) - 0.5;
        
        elements.each(function() {
          var $item = $(this);    

          var margins = parseFloat($item.css('margin-left')) + parseFloat($item.css('margin-right'))

          $item.css('width', columnWidth - margins);
        });

        return columnWidth;
      }

	return new SetupMasonryContainers;
});