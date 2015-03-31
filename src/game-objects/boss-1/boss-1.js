define(["editor-game-object-container", "player-getter", "root", "reclaimer"], function(GameObject, PlayerGetter, Root, Reclaimer) {
  var Boss_1 = GameObject.extend({
    init: function() {
      this._super();

      this.health = 40;
      this.cableCount = null;
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
    			var cannons = Root.findChildren().recurse().allWithType("boss-cannon");

    			for (var i=0; i < cannons.length; i++) {
    				if (cannons[i].getViewportVisibility('Main')) {
      				Reclaimer.mark(cannons[i]);
      			}
      		}

      		Reclaimer.mark(this);

      		PlayerGetter.get().move();
    		}
    	}
    }
  });

  return Boss_1;
});

