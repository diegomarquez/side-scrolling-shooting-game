define(["editor-game-object-container"], function(GameObject) {
  var BasicBullet = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      
    },

    editorUpdate: function(delta) {
    	
    },

    onBossStart: function() {
   		console.log('Boss Cable Start');
    },

    onCollide: function(other) {

    }
  });

  return BasicBullet;
});

