define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
  var Mine = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      this.counter = Math.random() * 100;
      this.startY = this.y;

      this.renderer.play();
    },

    editorUpdate: function(delta) {
    	this.y = this.startY + Math.cos(this.counter/20) * 10;
    	this.counter += 100 * delta;
    },

    onCollide: function(other) {
    	
    }
  });

  return Mine;
});

