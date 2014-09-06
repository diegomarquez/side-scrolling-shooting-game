define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var viewportEditorUI = require('viewport-editor-ui');
  var setupViewport = require('setup-viewport');

  var ViewportSelector = require('class').extend({
    init: function() {
      this.container = null;
    },

    create: function() {
      this.container = document.createElement('div');
      this.container.id = 'viewports-container';

      var allViewports = gb.viewports.allAsArray();

      for (var i = 0; i < allViewports.length; i++) {
        this.add(allViewports[i]);
      }
      
      return wrapper.wrap(this.container);
    },

    add: function(viewport) {
      setupViewport.setup(viewport.name);

      this.container.appendChild(new viewportEditorUI().create({
        viewport: viewport
      }));
    }
  });

  return ViewportSelector;
});