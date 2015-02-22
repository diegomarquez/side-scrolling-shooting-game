define(["editor-game-object-container", "gb", "player-getter"], function(GameObject, Gb, PlayerGetter) {
  var ScrollStopper = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      this.mainViewport = Gb.viewports.get("Main");
      this.player = PlayerGetter.get();
    },

    editorUpdate: function(delta) {
      if (Math.floor(this.mainViewport.x + this.X) <= 0) {
      	this.player.stop();
      }
    }
  });

  return ScrollStopper;
});

