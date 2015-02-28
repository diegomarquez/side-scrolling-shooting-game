define(["editor-game-object-container", "player-getter"], function(GameObject, PlayerGetter) {
  var Cannon = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
			this.target = PlayerGetter.get();     
    },

    editorUpdate: function(delta) {
      
    },

    onBossStart: function() {
    	console.log('Boss Cannon Start');
    },

    onCollide: function(other) {

    }
  });

  return Cannon;
});
