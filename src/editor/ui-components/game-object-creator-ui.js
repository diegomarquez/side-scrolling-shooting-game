define(function(require) {
  var wrapper = require('wrap-in-div');
  var button = require('button'); 

  var setupEditorObject = require('setup-editor-object');

  var activeViewports = require('active-viewports');
  var selectedGameObject = require('selected-game-object');
  var selectedGroup = require('selected-group');
  var mainViewport = require('main-viewport');

  var GameObjectCreator = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var element = new button().create({
        id: 'game-object-create-button',
        label: 'Create Game Object',
        onClick: function(event) {
          setupEditorObject.setupWithViewport(selectedGameObject.get(), selectedGroup.get(), activeViewports.get(), mainViewport.get());
        }
      });

      return wrapper.wrap(element);
    }
  });

  return GameObjectCreator;
});