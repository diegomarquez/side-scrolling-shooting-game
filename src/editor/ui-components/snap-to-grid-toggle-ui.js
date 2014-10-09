define(function(require) {
  var checkbox = require('checkbox');

  var gb = require('gb');
  var editorConfig = require('editor-config');
  var gridBundle = require('grid-bundle');

  var SnapToGridToggle = require('class').extend({
    init: function() {},

    create: function() {
      var snapToogleUI = new checkbox().create({
        id: 'snap-to-grid-toggle-button',
        onLabel: 'Free',
        offLabel: 'Snap To Grid' 
      });
      
      return snapToogleUI;
    }
  });

  return SnapToGridToggle;
});