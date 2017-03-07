define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
  var LaserBase = GameObject.extend({
    init: function() {
      this._super();

      this.destroyExplosions = null;
    },

    editorStart: function() {
		this.health = 10;
    },

    editorUpdate: function(delta) {
      
    },

    onCollide: function(other) {
  		if (this.health > 0) {
  			this.health--;
  		} else {
  			var explosionsGenerator = Gb.addComponentTo(this, this.destroyExplosions);

  			// When the explosion generator is finished, hide the cannon
    		explosionsGenerator.once(explosionsGenerator.STOP_CREATION, this, function() {
     	  		this.hide(true).not().allWithType(explosionsGenerator.objectType);
     	 	});

     	 	// When the last explosion is done with it's animation, mark the cannon for recycling
      		explosionsGenerator.once(explosionsGenerator.STOP_AND_ALL_RECYCLED, this, function() {
      			Gb.reclaimer.mark(this);
      		});

      		// Disable the collider component
    		this.findComponents().firstWithProp('collider').disable();

      		// Notify damage
	      	this.execute(this.DAMAGE);
  		}
    }
  });

  Object.defineProperty(LaserBase.prototype, "DAMAGE", { get: function() { return 'damage'; } });

  return LaserBase;
});
