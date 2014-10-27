define(function(require) {
  var wrapper = require('wrap-in-div');
  
  var EditorRegions = require('class').extend({
    init: function() {},

    create: function() {
      var topLeft = document.createElement('div');
      var topRight = document.createElement('div');
      var bottomLeft = document.createElement('div');
      var bottomRight = document.createElement('div');

      $(topLeft).addClass('region-container'); 
      $(topRight).addClass('region-container');
      $(bottomLeft).addClass('region-container');
      $(bottomRight).addClass('region-container');

      topLeft = wrapper.wrap(topLeft, { className: 'region'});
      topRight = wrapper.wrap(topRight, { className: 'region'});
      bottomLeft = wrapper.wrap(bottomLeft, { className: 'region'});
      bottomRight = wrapper.wrap(bottomRight, { className: 'region'});

      var wrapped = wrapper.wrap([topLeft, topRight, bottomLeft, bottomRight], {
        id: 'editor-regions',
        classNames: ['ui-widget']
      });

      return {
        html: wrapped,

        appendToTopLeft: function(content) {
          $(topLeft).find('.region-container').append(content); 
        },

        appendToTopRight: function(content) {
          $(topRight).find('.region-container').append(content);
        },

        appendToBottomLeft: function(content) {
          $(bottomLeft).find('.region-container').append(content);
        },

        appendToBottomRight: function(content) {
          $(bottomRight).find('.region-container').append(content);
        }
      }
    }
  });

  return EditorRegions;
});