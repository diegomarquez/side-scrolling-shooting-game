define(function(require) {
  require('jquery');
  require('jquery-transit');

  var TRANSITION_DURATION = 1000;
  var TRANSITION_WAIT = 2000;
  var INITIAL_DELAY = 2500;

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
    	var d = delay || INITIAL_DELAY;

    	// Hide Loader
    	$('#loader').transition( { delay: d, opacity: 0, complete: function() {
    		// Trigger open animation
	    	$('.section-left').transition({ delay: 0, left: '0px', x: '-100%'}, TRANSITION_DURATION);
	    	$('.section-right').transition({ delay: 0, right: '0px', x: '100%', complete: function() {
	    		// Remove the loader
	    		this.detachLoader();
	    		// Trigger a delegate to do things once the animation is complete
	    		this.execute(e);
	    	}.bind(this)}, TRANSITION_DURATION);
    	}.bind(this) }, TRANSITION_DURATION/2);
    },

    transition: function() {
    	// Attach the loader
    	this.attachLoader();

    	// Trigger close animation
    	$('.section-left').transition({ left: '-50%', x: '100%'}, TRANSITION_DURATION);
    	$('.section-right').transition({ right: '-50%', x: '-100%', complete: function() {
	    	// Trigger CLOSE delegate when completed to do stuff while everything is hidden
		  	this.execute(this.CLOSE);

		  	$('#loader').transition( { opacity: 1, complete: function() {
		  		// Open the loader to show what ever is behind
		  		this.open(this.TRANSITION, 1);
		  	}.bind(this) }, TRANSITION_WAIT);

    	}.bind(this)}, TRANSITION_DURATION);
    }
  });

  Object.defineProperty(LoaderContainer.prototype, "OPEN", { get: function() { return 'open'; } });
  Object.defineProperty(LoaderContainer.prototype, "CLOSE", { get: function() { return 'close'; } });
  Object.defineProperty(LoaderContainer.prototype, "TRANSITION", { get: function() { return 'transition'; } });

  return new LoaderContainer();
});


