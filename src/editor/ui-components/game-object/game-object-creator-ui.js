define(function(require) {
  var wrapper = require('wrap-in-div');
  var button = require('button'); 

  var setupEditorObject = require('setup-editable-game-object');

  var activeViewports = require('active-viewports');
  var selectedGameObject = require('selected-game-object');
  var selectedGroup = require('selected-group');
  var mainViewport = require('main-viewport');

  var statusMessage = require('create-status-message');

  var GameObjectCreator = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var message = statusMessage.createErrorMessage();

      var element = new button().create({
        id: 'game-object-create-button',
        label: 'Create Game Object',
        onClick: function(event) {
          message.remove();
          
          var goName = selectedGameObject.get();
          var group = selectedGroup.get();
          var viewports = activeViewports.get();
          var mainViewportName = mainViewport.get();

          if (goName == 'Nothing' || goName == '' || !goName) {
            message.toError('No game object has been selected');
            message.appendTo($('#game-object-create-button-wrapper'));
            return;
          }

          if (!viewports || viewports.length == 0) {
            message.toError('No viewports have been selected');
            message.appendTo($('#game-object-create-button-wrapper'));
            return;
          }

          message.toSuccess('Game object created successfully!');
          message.appendTo($('#game-object-create-button-wrapper'));
              
          setupEditorObject.setupWithViewport(goName, group, viewports, mainViewportName);
        }
      });

      $(element).button();

      return wrapper.wrap(element, {
        id: 'game-object-create-button-wrapper',
        classNames: ['well', 'well-small']
      });
    }
  });

  return GameObjectCreator;
});