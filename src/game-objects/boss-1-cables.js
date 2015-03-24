define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
  var BossCable = GameObject.extend({
    init: function() {
      this._super();

      this.health = 40;
      this.started = false;
    },

    editorStart: function() {
      
    },

    editorUpdate: function(delta) {

    },

    onBossStart: function() {
   		this.started = true;
    },

    onCollide: function(other) {
    	if (this.started) {
    		if (this.health > 0) {
    			this.health--;	
    		} else {
      		// Change renderer 
      		Gb.setRendererTo(this, this.damageRendererId);
      		// Remove collision component
      		this.removeComponent(this.findComponents().firstWithType(this.colliderId))
      		// Notify
      		this.execute(this.DAMAGE);
    		}
    	}
    }
  });

  Object.defineProperty(BossCable.prototype, "DAMAGE", { get: function() { return 'damage'; } });

  return BossCable;
});

