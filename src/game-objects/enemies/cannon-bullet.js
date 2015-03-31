define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
  var CannonBullet = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
    	this.life = 50000;
    	this.speed = 100;

    	this.x = this.x + Math.cos(this.angle * (Math.PI/180)) * 20; 
      this.y = this.y + Math.sin(this.angle * (Math.PI/180)) * 20;
    },

    editorUpdate: function(delta) {
      this.rotation += 5;

      this.x += Math.cos(this.angle * (Math.PI/180)) * delta * this.speed; 
      this.y += Math.sin(this.angle * (Math.PI/180)) * delta * this.speed; 

      if (this.life > 0) {
      	this.life -= this.speed;
      } else {
      	Reclaimer.claim(this);
      }
    },

    onCollide: function(other) {
    	Reclaimer.claim(this);
    }
  });

  return CannonBullet;
});
