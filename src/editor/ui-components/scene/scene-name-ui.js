define(function(require) {
  var wrapper = require('wrap-in-div');
  var textInput = require('text-input');

  var SceneName = require('class').extend({
    init: function() {},

    create: function() {
      var input = new textInput().create({
        id: 'scene-name',
        defaultMessage: 'Set a scene name Scene'
      });
      
      return wrapper.wrap(input);
    }
  });

  return SceneName;
});