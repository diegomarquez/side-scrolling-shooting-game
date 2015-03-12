define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
  var BasicBullet = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      this.life = 50;
    },

    editorUpdate: function(delta) {
      this.x += 10;

      if (this.life < 0) {
       Reclaimer.claim(this);
      } else {
       this.life--;
      }
    },

    onCollide: function(other) {
    	Reclaimer.claim(this);
    }
  });

  return BasicBullet;
});

