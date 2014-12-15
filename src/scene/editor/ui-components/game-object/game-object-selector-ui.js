define(function(require) {
  var editorConfig = require('editor-config');

  var wrapper = require('wrap-in-div');
  var dropdown = require('dropdown-single-remove');

  var gb = require('gb');
  var editorDelegates = require('editor-delegates');

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
        },
        onRemove: function(configurationId) {
        	gb.reclaimer.clearGameObjectConfiguration(configurationId);    	
        },
        canBeRemoved: function(value) {
        	return value.match(/->/)
        }
      });

      editorDelegates.add(gb.goPool, gb.goPool.CREATE_CONFIGURATION, this, function (configuration) {
      	this.gameObjectSelectorUI.refresh();
      });

      editorDelegates.add(gb.goPool, gb.goPool.CLEAR_CONFIGURATION, this, function (configurationId) {
      	this.gameObjectSelectorUI.refresh();
      });

      return wrapper.wrap(this.gameObjectSelectorUI.html);
    },
  });



  return GameObjectSelector;
});