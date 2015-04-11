define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
  var BossCable = GameObject.extend({
    init: function() {
      this._super();

      this.health = 40;
    },

    start: function() {
    	this._super();

    	this.particleGenerators = this.findComponents().allWithType('particle-generator');

      this.particleGenerators.forEach(function(generator) {
      	generator.disable();
      });
    },

    editorStart: function() {
      this.bossStarted = false;
    },

    editorUpdate: function(delta) {

    },

    onBossStart: function() {
   		this.bossStarted = true;
    },

    onCollide: function(other) {
    	if (this.bossStarted) {
    		if (this.health > 0) {
    			this.health--;	
    		} else {
    			// Enable the generator for the damage particles
    			this.particleGenerators.forEach(function(generator) {
		      	generator.enable();
		      });

      		// Change renderer 
      		Gb.setRendererTo(this, this.damageRendererId);
      		// Remove collision component
      		this.removeComponent(this.findComponents().firstWithType(this.colliderId));
      		// Notify
      		this.execute(this.DAMAGE);
    		}
    	}
    }
  });

  Object.defineProperty(BossCable.prototype, "DAMAGE", { get: function() { return 'damage'; } });

  return BossCable;
});

