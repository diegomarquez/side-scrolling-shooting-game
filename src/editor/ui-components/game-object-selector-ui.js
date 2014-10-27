define(function(require) {
  var editorConfig = require('editor-config');

  var wrapper = require('wrap-in-div');
  var dropdown = require('dropdown-basic');

  var GameObjectSelector = require('class').extend({
    init: function() {
      
    },

    create: function() {
      var gameObjectSelectorUI = new dropdown().create({
        id: 'game-object-selector',
        defaultMessage: 'Choose a Game Object',
        selectedMessage: 'Selected Game Object:',
        data: function() {          
          // return editorConfig.getGameObjects();
          return ['LALA', 'HJKHJKH', 'YUIYUI', 'jksladjklsa', '6478367382'];
        }
      });

      return wrapper.wrap(gameObjectSelectorUI.html);
    }
  });

  return GameObjectSelector;
});