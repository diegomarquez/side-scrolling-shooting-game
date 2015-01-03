define(function(require) {
	var wrapper = require('wrap-in-div');

  var DialogHiddenField = require('class').extend({
    init: function(options) {
    	this.options = options;
    },

    name: function() {
    	return this.options.name;
    },

    html: function() {
    	return this.h;
    },

    validations: function() {
    	return this.options.validations;
    },

    create: function() {
      this.h = document.createElement('div');
      this.h.style.display = 'none';
    },

    open: function() {},

    reset: function() {},

    valueGetter: function() {
    	return function() {
    		return null;
    	}
    },

    applyFeedback: function() {},

	  resetFeedback: function() {}
  });

  return DialogHiddenField;
});