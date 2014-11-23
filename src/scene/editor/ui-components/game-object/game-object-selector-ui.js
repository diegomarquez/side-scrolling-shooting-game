define(function(require) {
  var editorConfig = require('editor-config');

  var wrapper = require('wrap-in-div');
  var dropdown = require('dropdown-single');

  var GameObjectSelector = require('ui-component').extend({
    init: function() {
      this.gameObjectSelectorUI = null;
    },

    create: function() {
      this.gameObjectSelectorUI = new dropdown().create({
        id: 'game-object-selector',
        defaultMessage: 'Choose a Game Object',
        selectedMessage: 'Selected Game Object:',
        data: function() {      
          return editorConfig.getGameObjects();
        }
      });

      return wrapper.wrap(this.gameObjectSelectorUI.html);
    },
  });

  return GameObjectSelector;
});