define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
  
	var decompose = {};

  	var DoubleCannon = GameObject.extend({
	    init: function() {
	    	this._super();

	    	this.destroyExplosions = null;
	    	this.completeCount = 0;
	    	this.completeAnimationsBeforeFire = -1;
	    	this.bulletType = '';
	    	this.hp = 0;
	    },

	    editorStart: function() {
			this.renderer.play();

			this.completeCount = 1;
			this.renderer.on(this.renderer.COMPLETE_BACK, this, this.onCompleteBackAnimation);
	    },

	    deActivate: function() {
	    	this.renderer.remove(this.renderer.COMPLETE_BACK, this, this.onCompleteBackAnimation);	
	    },

	    onCompleteBackAnimation: function() {
	    	if (this.completeCount % this.completeAnimationsBeforeFire == 0) {

	    		var firePositions = this.findChildren().allWithType("FirePosition");

	    		for (var i = 0; i < firePositions.length; i++) {
	    			decompose = firePositions[i].getMatrix().decompose(decompose);

	    			Gb.create(this.bulletType, this.getUpdateGroup(), this.getViewportList(), {
						angle: this.rotation - 90 + firePositions[i].angle,
						x: decompose.x,
						y: decompose.y
					});
	    		}	
	    	}

	    	this.completeCount++;
	    },

	    editorUpdate: function(delta) {
	    	  
	    },

	    onCollide: function(other) {
	    	if (!this.started)
    			return;

	  		if (this.hp > 0) {
	  			this.hp--;	
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

  Object.defineProperty(DoubleCannon.prototype, "DAMAGE", { get: function() { return 'damage'; } });

  return DoubleCannon;
});
