define(["editor-game-object-container", "plater-getter"], function(GameObject, PlayerGetter) {
  var Cannon = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
			this.target = PlayerGetter.get();     
    },

    editorUpdate: function(delta) {
      
    },

    onCollide: function(other) {

    }
  });

  return Cannon;
});
