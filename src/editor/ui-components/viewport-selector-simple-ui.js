define(function(require) {
  var wrapper = require('wrap-in-div');
  var editorConfig = require('editor-config');

  var dropdown = require('dropdown-basic');

  var ViewportSelectorSimple = require('class').extend({
    init: function() {},

    create: function() {
      var viewportSelectorUI = new dropdown().create({
        id: 'viewport-selector-simple',
        defaultMessage: 'Choose Viewports',
        selectedMessage: 'Selected Viewports:',
        multiSelect: true,
        data: function() {          
          return editorConfig.getViewports().map(function(viewport) { return viewport.name; });
        }
      });

      return wrapper.wrap(viewportSelectorUI.html);
    }
  });

  return ViewportSelectorSimple;
});