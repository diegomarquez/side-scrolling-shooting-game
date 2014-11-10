define(function(require) {
  var wrapper = require('wrap-in-div');
  
  var statusMessage = require('create-status-message')

  var EditorRegions = require('class').extend({
    init: function() {},

    create: function() {
      return {
        html: wrapper.wrap(wrapper.wrap(
          [ 
            createRegion('topLeft'), 
            createRegion('topRight'), 
            createRegion('bottomLeft'), 
            createRegion('bottomRight')
          ], 
          {
            id: 'editor-regions',
            classNames: ['ui-widget']
          }
        ), {
          id: 'editor-regions-wrapper'
        }),

        appendToTopLeft: function(content) {
          this.getTopLeft().append(content); 
        },

        appendToTopRight: function(content) {
          this.getTopRight().append(content);
        },

        appendToBottomLeft: function(content) {
          this.getBottomLeft().append(content);
        },

        appendToBottomRight: function(content) {
          this.getBottomRight().append(content);
        },

        getTopLeft: function(content) {
          return $(this.html).find('#topLeft'); 
        },

        getTopRight: function(content) {
          return $(this.html).find('#topRight');
        },

        getBottomLeft: function(content) {
          return $(this.html).find('#bottomLeft');
        },

        getBottomRight: function(content) {
          return $(this.html).find('#bottomRight');
        },

        getTopLeftContainer: function(content) {
          return this.getTopLeft().parent('.region'); 
        },

        getTopRightContainer: function(content) {
          return this.getTopRight().parent('.region');
        },

        getBottomLeftContainer: function(content) {
          return this.getBottomLeft().parent('.region');
        },

        getBottomRightContainer: function(content) {
          return this.getBottomRight().parent('.region');
        }
      }
    }
  });

  var createRegion = function(id) {
    var content = document.createElement('div');

    content.id = id;
    $(content).addClass('region-container'); 
    
    return wrapper.wrap([content], { className: 'region'});
  }

  return EditorRegions;
});