define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
  var Cannon = GameObject.extend({
    init: function() {
      this._super();

      this.destroyExplosions = null;
      this.hp = 1;
      this.explosionsGenerator = null;
    },

    editorStart: function() {
		
    },

    editorUpdate: function(delta) {
      
    },

    regen: function(hp) {
    	this.hp = hp;

    	this.explosionsGenerator.stop();
    	this.show(true).not().allWithType(this.explosionsGenerator.objectType);
    	this.removeComponent(this.explosionsGenerator);
    	this.findComponents().firstWithProp('collider').enable();
    	this.explosionsGenerator = null;

    	this.execute('repair');
    },

    onCollide: function(other) {
    	if (!this.started)
    		return;

    	if (this.hp > 0) {
			this.hp--;

			if (this.hp == 0) {
				this.explosionsGenerator = Gb.addComponentTo(this, this.destroyExplosions);

	  			// When the explosion generator is finished, hide the cannon
	    		this.explosionsGenerator.once(this.explosionsGenerator.STOP_CREATION, this, function() {
	     	  		this.hide(true).not().allWithType(this.explosionsGenerator.objectType);
	     	 	});

	     	 	// When the last explosion is done with it's animation, mark the cannon for recycling
	      		this.explosionsGenerator.once(this.explosionsGenerator.STOP_AND_ALL_RECYCLED, this, function() {
	      			Gb.reclaimer.mark(this);
	      		});

	      		// Disable the collider component
	    		this.findComponents().firstWithProp('collider').disable();

	      		// Notify damage
		      	this.execute(this.DAMAGE);	
			}
		}
    }
  });

  Object.defineProperty(Cannon.prototype, "DAMAGE", { get: function() { return 'damage'; } });
  Object.defineProperty(Cannon.prototype, "REPAIR", { get: function() { return 'repair'; } });

  return Cannon;
});
