define(["editor-game-object-container", "reclaimer", "effects-bundle"], function(GameObject, Reclaimer, EffectsBundle) {
  var Cannon = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	this._super();

    	// Reference to the explosions generator
    	this.explosionsGenerators = this.findComponents().allWithType(EffectsBundle.getExplosionsEffectId());

    	// Disable effects sistems
    	this.explosionsGenerators.forEach(function(generator) {
      	generator.disable();
      });

    	// When the explosion generator is finished, hide the cannon
    	this.explosionsGenerators[0].once(this.explosionsGenerators[0].STOP_CREATION, this, function() {
      	this.hide(true).not().allWithType(EffectsBundle.getExplosionsId());
      }); 
    	
    	// When the last explosion is done with it's animation, mark the cannon for recycling
      this.explosionsGenerators[0].once(this.explosionsGenerators[0].STOP_AND_ALL_RECYCLED, this, function() {
      	Reclaimer.mark(this);
      });
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

				// Enable effects sistems
	    	this.explosionsGenerators.forEach(function(generator) {
	      	generator.enable();
	      });  

	      this.execute(this.DAMAGE);

	      // Disable the collider component
    		this.findComponents().firstWithProp('collider').disable();
  		}
    }
  });

  Object.defineProperty(Cannon.prototype, "DAMAGE", { get: function() { return 'damage'; } });

  return Cannon;
});
