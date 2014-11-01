define(function(require) {
  var editorConfig = require('editor-config');

  var wrapper = require('wrap-in-div');
  var dropdown = require('dropdown-single');

  var GameObjectSelector = require('class').extend({
    init: function() {
      
    },

    create: function() {
      var gameObjectSelectorUI = new dropdown().create({
        id: 'game-object-selector',
        defaultMessage: 'Choose a Game Object',
        selectedMessage: 'Selected Game Object:',
        data: function() {      
          return editorConfig.getGameObjects();
        }
      });

      return wrapper.wrap(gameObjectSelectorUI.html);
    }
  });

  return GameObjectSelector;
});