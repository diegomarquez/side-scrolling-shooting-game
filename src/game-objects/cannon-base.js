define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
  var Cannon = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
			     
			this.health = 5;
    },

    editorUpdate: function(delta) {
      
    },

    onCollide: function(other) {
  		if (this.health > 0) {
  			this.health--;	
  		} else {
  			Reclaimer.mark(this);	    			
  		}
    }
  });

  return Cannon;
});
