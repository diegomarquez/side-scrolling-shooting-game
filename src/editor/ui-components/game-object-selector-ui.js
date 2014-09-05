define(function(require) {

  var wrapper = require('wrap-in-div');
  var dropdown = require('dropdown');
  var gb = require('gb');

  var GameObjectSelector = require('class').extend({
    init: function() {
      
    },

    create: function() {
      var data = gb.goPool.getConfigurationTypes();

      data.splice(data.indexOf('ViewportOutline'), 1);

      var selector = new dropdown().create({
        id: 'game-object-selector',
        defaultMessage: 'Choose a Game Object',
        data: data
      }); 

      return wrapper.wrap(selector);
    }
  });

  return GameObjectSelector;
});