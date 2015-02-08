define(function(require) {
  var wrapper = require('wrap-in-div');
  var button = require('button'); 
  var gb = require('gb');

  var setupEditorObject = require('setup-editable-game-object');

  var activeViewports = require('active-viewports');
  var selectedGameObject = require('selected-game-object');
  var selectedGroup = require('selected-group');
  var mainViewport = require('main-viewport');

  var statusMessage = require('create-status-message');

  var GameObjectCreator = require('ui-component').extend({
    init: function() {
      this.element = null;
      this.message = null;
    },

    create: function(options) {
      this.message = statusMessage.createErrorMessage();

      var message = this.message;

      this.element = new button().create({
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
            gb.game.get_extension(require('logger')).error('No game object has been selected');
            return;
          }

          if (!viewports || viewports.length == 0) {
            message.toError('No viewports have been selected');
            message.appendTo($('#game-object-create-button-wrapper'));
            gb.game.get_extension(require('logger')).error('No viewports have been selected');
            return;
          }

          message.toSuccess('Game object created successfully!');
          message.appendTo($('#game-object-create-button-wrapper'));
          gb.game.get_extension(require('logger')).success('Game object created successfully!');

          setupEditorObject.setupWithViewport(goName, group, viewports, mainViewportName);
        }
      });

      $(this.element).button();

      return wrapper.wrap(this.element, {
        id: 'game-object-create-button-wrapper',
        classNames: ['well', 'well-small']
      });
    },

    destroy: function() {
      $(this.element).button('destroy');      
    }
  });

  return GameObjectCreator;
});