define(function(require) {
  var wrapper = require('wrap-in-div');

  var boundingBoxesToggleUI = require('bounding-boxes-toggle-ui');
  var collidersToggleUI = require('colliders-toggle-ui');
  var registrationPointsToggleUI = require('registration-points-toggle-ui');

  var GameObjectControls = require('class').extend({
    init: function() {
      
    },

    create: function() {
      var bounding = (new boundingBoxesToggleUI()).create();
      var colliders = (new collidersToggleUI()).create();
      var registration = (new registrationPointsToggleUI()).create();
      
      var label = document.createElement('label');
      label.innerHTML = 'Game Object Controls';

      return wrapper.wrap([label, bounding, colliders, registration], {
        id: 'game-object-control-buttons',
        classNames: ['well', 'well-small']
      });
    }
  });
  
  return GameObjectControls;
});