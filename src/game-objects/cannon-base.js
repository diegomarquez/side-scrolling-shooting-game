define(["editor-game-object-container"], function(GameObject) {
  var Cannon = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
			this.started = true;     
    },

    editorUpdate: function(delta) {
      
    },

    onCollide: function(other) {

    }
  });

  return Cannon;
});
