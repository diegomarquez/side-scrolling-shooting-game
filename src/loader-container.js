define(function(require) {
  require('jquery');
  require('jquery-transit');

  var TRANSITION_DURATION = 1000;
  var TRANSITION_WAIT = 2000;

  var LoaderContainer = require("delegate").extend({
    init: function() {
    	this._super();

			this.loader = $('#loader-wrapper');
    },

    detachLoader: function() {
    	this.loader.remove();	
    },

    attachLoader: function() {
    	if (this.loader.parent().length >= 1) {
    		return;
    	}

    	$('body').prepend(this.loader);
    },

    open: function(event, delay) {
    	var e = event || this.OPEN;
    	var d = delay || 0;

    	// Trigger open animation
    	$('.section-left').transition({ delay: d, left: '0px', x: '-100%'}, TRANSITION_DURATION);
    	$('.section-right').transition({ delay: d, right: '0px', x: '100%', complete: function() {
    		// Remove the loader
    		this.detachLoader();
    		// Trigger a delegate to do things once the animation is complete
    		this.execute(e);
    	}.bind(this)}, TRANSITION_DURATION);
    },

    transition: function() {
    	// Attach the loader
    	this.attachLoader();

    	// Trigger close animation
    	$('.section-left').transition({ left: '-50%', x: '100%'}, TRANSITION_DURATION);
    	$('.section-right').transition({ right: '-50%', x: '-100%', complete: function() {
	    	// Trigger CLOSE delegate when completed to do stuff while everything is hidden
		  	this.execute(this.CLOSE);
		  	// Open the loader to show what ever is behind
		  	this.open(this.TRANSITION, TRANSITION_WAIT)
    	}.bind(this)}, TRANSITION_DURATION);
    }
  });

  Object.defineProperty(LoaderContainer.prototype, "OPEN", { get: function() { return 'open'; } });
  Object.defineProperty(LoaderContainer.prototype, "CLOSE", { get: function() { return 'close'; } });
  Object.defineProperty(LoaderContainer.prototype, "TRANSITION", { get: function() { return 'transition'; } });

  return new LoaderContainer();
});


