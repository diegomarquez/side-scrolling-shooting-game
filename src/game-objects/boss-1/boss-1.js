define(["editor-game-object-container", "player-getter", "root", "gb"], function(GameObject, PlayerGetter, Root, Gb) {
  var Boss_1 = GameObject.extend({
    init: function() {
      this._super();

      this.health = 40;
      this.cableCount = null;
      this.destroyEffect = null;
      this.colliderId = null;
    },

    editorStart: function() {
      
    	var player = PlayerGetter.get();
    	var lastEditorUpdate = this.editorUpdate;

    	this.editorUpdate = function() {};

      player.once(player.STOP, this, function() {      	
      	var cables = this.findChildren().allWithType("boss-1-cables");

      	this.cableCount = cables.length;

      	// Signal boss weak spots to start
      	for (var i=0; i < this.cableCount; i++) {
      		cables[i].onBossStart();
      		cables[i].on(cables[i].DAMAGE, this, this.onDamage);
      	}

      	var cannons = Root.findChildren().recurse().allWithType("boss-cannon");

      	// Signal boss cannos to start
      	for (var i=0; i < cannons.length; i++) {
      		if (cannons[i].getViewportVisibility('Main')) {
      			cannons[i].onBossStart();	
      		}
      	}

      	this.editorUpdate = lastEditorUpdate;
      });
    },

    editorUpdate: function(delta) {
    	    	
    },

    onDamage: function (cable) {
    	this.cableCount--;
    },

    onCollide: function(other) {
    	if (this.cableCount !== null && this.cableCount <= 0) {
    		if (this.health > 0) {
    			this.health--;	
    		} else {
    			var explosionsGenerator = Gb.addComponentTo(this, this.destroyEffect);

    			// Remove collision component
      		this.removeComponent(this.findComponents().firstWithType(this.colliderId));

	  			// When the explosion generator is finished, hide the cannon
	    		explosionsGenerator.once(explosionsGenerator.STOP_CREATION, this, function() {
	     	  	// Do something to to hide properly the removal of the boss
	     	 	});  

					Root.findChildren().recurse().allWithType("boss-cannon").forEach(function (cannon) {
      			if (cannon.getViewportVisibility('Main')) {
							cannon.onBossDestroy();
      			}
      		});

	     	 	// When the last explosion is done with it's animation, mark the cannon for recycling
	      	explosionsGenerator.once(explosionsGenerator.STOP_AND_ALL_RECYCLED, this, function() {
	      		Gb.reclaimer.mark(this);
	      		PlayerGetter.get().move();
	      	});
    		}
    	}
    }
  });

  return Boss_1;
});

