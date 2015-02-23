define(["editor-game-object-container", "player-getter", "root"], function(GameObject, PlayerGetter, Root) {
  var Boss_1 = GameObject.extend({
    init: function() {
      this._super();
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

      	var cannons = Root.findChildren().recurse().allWithType("boss-1-cannons");

      	// Signal boss cannos to start
      	for (var i=0; i < cables.length; i++) {
      		cannons[i].onBossStart();
      	}

      	this.editorUpdate = lastEditorUpdate
      });
    },

    editorUpdate: function(delta) {
    	    	
    },

    onCollide: function(other) {

    }
  });

  return Boss_1;
});

