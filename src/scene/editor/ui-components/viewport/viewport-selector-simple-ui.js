define(function(require) {
  var wrapper = require('wrap-in-div');
  var editorConfig = require('editor-config');
  var editorDelegates = require('editor-delegates');
  var gb = require('gb');

  var dropdown = require('dropdown-multi');

  var ViewportSelectorSimple = require('ui-component').extend({
    init: function() {
      this.viewportSelectorUI = null;
    },

    create: function() {
      this.viewportSelectorUI = new dropdown().create({
        id: 'viewport-selector-simple',
        defaultMessage: 'Choose Viewports',
        selectedMessage: 'Selected Viewports:',
        data: function() {          
          return editorConfig.getViewports().map(function(viewport) { return viewport.name; });
        }
      });

      editorDelegates.add(gb.viewports, gb.viewports.ADD, this, function (v) {
        viewportSelectorUI.refresh();
      });

      editorDelegates.add(gb.viewports, gb.viewports.REMOVE, this, function (v) {
        viewportSelectorUI.refresh();
      });

      editorDelegates.add(gb.viewports, gb.viewports.MOVE, this, function (v) {
        viewportSelectorUI.refresh();
      });

      editorDelegates.add(gb.viewports, gb.viewports.CHANGE, this, function (v) {
        viewportSelectorUI.refresh();
      });

      return wrapper.wrap(viewportSelectorUI.html);
    }
  });

  return ViewportSelectorSimple;
});