define(function(require) {

  var wrapper = require('wrap-in-div');

  var HorizontalBar = require('class').extend({
    init: function() {
      
    },

    create: function() {
      return document.createElement('hr');
    }
  });

  return HorizontalBar;
});