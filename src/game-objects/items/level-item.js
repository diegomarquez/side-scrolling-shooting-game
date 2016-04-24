define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
  var LevelItem = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      this.counter = 0;
      this.startY = this.y;
    },

    editorUpdate: function(delta) {
    	this.y = this.startY + Math.cos(this.counter/20) * 10;
    	this.counter += 100 * delta;
    },

    onCollide: function(other) {
    	Reclaimer.mark(this);

    	this.execute("pick-up");
    }
  });

  return LevelItem;
});

