define(function(require) {
  var wrapper = require('wrap-in-div');

  var boundingBoxesToggleUI = require('bounding-boxes-toggle-ui');
  var collidersToggleUI = require('colliders-toggle-ui');
  var registrationPointsToggleUI = require('registration-points-toggle-ui');
  var rotationsToggleUI = require('rotation-toggle-ui');

  var GameObjectControls = require('ui-component').extend({
    init: function() {
      this.boundings = null;
      this.colliders = null;
      this.centers = null;
    },

    create: function() {
      this.boundings = (new boundingBoxesToggleUI()).create();
      this.colliders = (new collidersToggleUI()).create();
      this.centers = (new registrationPointsToggleUI()).create();
      this.rotations = (new rotationsToggleUI()).create();

      var label = document.createElement('label');
      label.innerHTML = 'Game Object Controls';

      return wrapper.wrap([label, this.boundings, this.colliders, this.centers, this.rotations], {
        id: 'game-object-control-buttons',
        classNames: ['well', 'well-small']
      });
    }
  });
  
  return GameObjectControls;
});