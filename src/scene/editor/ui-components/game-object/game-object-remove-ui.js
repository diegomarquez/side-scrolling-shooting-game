define(function(require) {
  var gb = require('gb');
  var wrapper = require('wrap-in-div');
  var button = require('button'); 

  var GameObjectCreator = require('ui-component').extend({
    init: function() {
      this.element = null;      
    },

    create: function(options) {
      this.element = new button().create({
        id: 'game-object-remove-button',
        label: 'Remove all Game Objects',
        onClick: function(event) {
          gb.reclaimer.clearAllObjectsFromPools().now();
        }
      });

      $(this.element).button();

      return wrapper.wrap(this.element, {
        id: 'game-object-remove-button-wrapper',
        classNames: ['well', 'well-small']
      });
    },

    destroy: function() {
      $(this.element).button('destroy');      
    }
  });

  return GameObjectCreator;
});