define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var viewportEditorUI = require('viewport-editor-ui');

  var ViewportSelector = require('class').extend({
    init: function() {
      this.container = null;
    },

    create: function() {
      this.container = document.createElement('div');
      this.container.id = 'viewports-container';

      var allViewports = gb.viewports.allAsArray();

      for (var i = 0; i < allViewports.length; i++) {
        this.add(allViewports[i])
      }
      
      return wrapper.wrap(this.container);
    },

    add: function(viewport) {
      // TODO: All this stuff should go into a module of it's own, and be called in viewport-creator-ui.js instead of the raw gb.viewports method
      viewport.addLayer('Front');
      var group = gb.groups.allGroupNames()[0];
      var layer = viewport.getLayers()[viewport.getLayers().length-1].name;
      gb.create('ViewportOutline', group, [{viewport: viewport.name, layer: layer}], {viewport: viewport});

      this.container.appendChild(new viewportEditorUI().create({
        viewport: viewport
      }));
    }
  });

  return ViewportSelector;
});