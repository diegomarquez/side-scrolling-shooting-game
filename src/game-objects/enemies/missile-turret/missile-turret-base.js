define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
	
	var MissileTurretBase = GameObject.extend({
		init: function() {
			this._super();

			this.destroyExplosions = null;
			this.hp = 0;
		},

		editorStart: function() {
		
		},

		editorUpdate: function(delta) {
			
		},

		onCollide: function(delta) {
			if (!this.started)
	    		return;

	    	if (this.hp > 0) {
				this.hp--;

				if (this.hp == 0) {
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
		}
	});

	Object.defineProperty(MissileTurretBase.prototype, "DAMAGE", { get: function() { return 'damage'; } });

	return MissileTurretBase;
});
