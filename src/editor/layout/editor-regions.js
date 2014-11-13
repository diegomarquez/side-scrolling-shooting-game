define(function(require) {
  var wrapper = require('wrap-in-div');
  
  var statusMessage = require('create-status-message')

  var EditorRegions = require('class').extend({
    init: function() {
      this.controller = null;
    },

    get: function() {
      if (this.controller) {
        return this.controller;
      } else {
        return this.create();
      }
    },

    create: function() {
      this.controller = {
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

        getTopLeft: function() {
          return $(this.html).find('#topLeft'); 
        },

        getTopRight: function() {
          return $(this.html).find('#topRight');
        },

        getBottomLeft: function() {
          return $(this.html).find('#bottomLeft');
        },

        getBottomRight: function() {
          return $(this.html).find('#bottomRight');
        },

        getTopLeftContainer: function() {
          return this.getTopLeft().parent('.region'); 
        },

        getTopRightContainer: function() {
          return this.getTopRight().parent('.region');
        },

        getBottomLeftContainer: function() {
          return this.getBottomLeft().parent('.region');
        },

        getBottomRightContainer: function() {
          return this.getBottomRight().parent('.region');
        },

        getRegion: function(child) {
          for (var i = 0; i < this.regionGetters.length; i++) {
            var r = isInRegion(this.regionGetters[i].call(this), child);
            
            if (r.contains) {
              return r.region;
            }
          }
        }
      }

      this.controller.regionGetters = [this.controller.getTopLeft, this.controller.getTopRight, this.controller.getBottomLeft, this.controller.getBottomRight]

      return this.controller;
    }
  });

  var isInRegion = function(region, child) {
    return {
      contains: $(region).find(child).length == 1,
      region: $(region)[0]
    };
  }

  var createRegion = function(id) {
    var content = document.createElement('div');

    content.id = id;
    $(content).addClass('region-container'); 
    
    return wrapper.wrap([content], { className: 'region'});
  }

  return new EditorRegions();
});