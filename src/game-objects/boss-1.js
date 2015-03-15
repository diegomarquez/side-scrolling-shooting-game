define(["editor-game-object-container", "player-getter", "root", "reclaimer"], function(GameObject, PlayerGetter, Root, Reclaimer) {
  var Boss_1 = GameObject.extend({
    init: function() {
      this._super();

      this.health = 40;
      this.started = false;
    },

    editorStart: function() {
      
    	var player = PlayerGetter.get();
    	var lastEditorUpdate = this.editorUpdate;

    	this.editorUpdate = function() {};

      player.once(player.STOP, this, function() {      	
      	var cables = this.findChildren().allWithType("boss-1-cables");

      	// Signal boss weak spots to start
      	for (var i=0; i < cables.length; i++) {
      		cables[i].onBossStart();
      	}

      	var cannons = Root.findChildren().recurse().allWithType("boss-cannon");

      	// Signal boss cannos to start
      	for (var i=0; i < cannons.length; i++) {
      		cannons[i].onBossStart();
      	}

      	this.editorUpdate = lastEditorUpdate;

      	this.started = true;
      });
    },

    editorUpdate: function(delta) {
    	    	
    },

    onCollide: function(other) {
    	if (this.started) {
    		if (this.health > 0) {
    			this.health--;	
    		} else {
    			var cannons = Root.findChildren().recurse().allWithType("boss-cannon");

    			for (var i=0; i < cannons.length; i++) {
      			Reclaimer.mark(cannons[i]);
      		}

      		Reclaimer.mark(this);

      		PlayerGetter.get().move();
    		}
    	}
    }
  });

  return Boss_1;
});

