define(function(require) {
  var wrapper = require('wrap-in-div');
  
  var statusMessage = require('create-status-message')

  var EditorRegions = require('class').extend({
    init: function() {},

    create: function() {
      return {
        html: wrapper.wrap(
          [ 
            createRegion('topLeft', 'Canvas'), 
            createRegion('topRight', 'Scene Settings'), 
            createRegion('bottomLeft', 'Game Object Creation'), 
            createRegion('bottomRight', 'Viewport Management')
          ], 
          {
            id: 'editor-regions',
            classNames: ['ui-widget']
          }
        ),

        appendToTopLeft: function(content) {
          $(this.html).find('#topLeft').append(content); 
        },

        appendToTopRight: function(content) {
          $(this.html).find('#topRight').append(content);
        },

        appendToBottomLeft: function(content) {
          $(this.html).find('#bottomLeft').append(content);
        },

        appendToBottomRight: function(content) {
          $(this.html).find('#bottomRight').append(content);
        }
      }
    }
  });

  var createRegion = function(id, title) {
    var header = document.createElement('div');
    var headerIcon = document.createElement('span');

    var content = document.createElement('div');

    var handler = statusMessage.createCustomMessage('Section: ', title, 'ui-icon-circle-triangle-e');

    $(header).addClass('region-header');
    $(header).append(handler.html);

    content.id = id;
    $(content).addClass('region-container'); 
    
    return wrapper.wrap([header, content], { className: 'region'});
  }

  return EditorRegions;
});