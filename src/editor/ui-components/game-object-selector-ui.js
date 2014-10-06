define(function(require) {

  var wrapper = require('wrap-in-div');
  var dropdown = require('dropdown-basic');
  var gb = require('gb');
  var outlineBundle = require('outline-bundle');

  var GameObjectSelector = require('class').extend({
    init: function() {
      
    },

    create: function() {
      var gameObjectSelectorUI = new dropdown().create({
        id: 'game-object-selector',
        defaultMessage: 'Choose a Game Object',
        selectedMessage: 'Selected Game Object:',
        data: function() {
          var data = gb.goPool.getConfigurationTypes();
          // Skip the outline Game Object
          data.splice(data.indexOf(outlineBundle.getOutlineId()), 1);
          
          return data;
        }
      });

      return wrapper.wrap(gameObjectSelectorUI.html);
    }
  });

  return GameObjectSelector;
});