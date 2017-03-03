define(function(require) {
  var wrapper = require('wrap-in-div');
  var util = require('util');
  var statusMessage = require('create-status-message');
  var componentFactory = require('ui-component-factory');

  var EditorRegions = require('ui-component').extend({
    init: function() {
      this.controller = null;
    },

    get: function() {
      if (!this.controller) {
        this.controller = this.create();
      }

      return this.controller;
    },

    create: function() {
      var regionsComponentExtension = {
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
          var getters = this.regionGetters();

          for (var i = 0; i < getters.length; i++) {
            var r = isInRegion(getters[i].call(this), child);
            
            if (r.contains) {
              return r.region;
            }
          }
        },

        regionGetters: util.cache(function() {
          return [this.getTopLeft, this.getTopRight, this.getBottomLeft, this.getBottomRight];
        })
      }

      this.controller = componentFactory.getController(regionsComponentExtension, getHTML());

      return this.controller;
    }
  });

  var getHTML = function() {
    return wrapper.wrap(wrapper.wrap(
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
    }); 
  }

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