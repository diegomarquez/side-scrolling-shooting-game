define(["editor-game-object-container"], function(GameObject) {
  var Cannon = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
			this.started = false;
    },

    editorUpdate: function(delta) {
      
    },

    onBossStart: function() {
    	this.started = true;
    },

    onCollide: function(other) {

    }
  });

  return Cannon;
});
