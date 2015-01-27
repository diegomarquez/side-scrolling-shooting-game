define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
  var Obstacle = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      
    },

    editorUpdate: function(delta) {
    	
    },

    onCollide: function(other) {

    }
  });

  return Obstacle;
});
