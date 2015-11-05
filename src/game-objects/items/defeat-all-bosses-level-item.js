define(["editor-game-object-container", "root", "reclaimer"], function(GameObject, Root, Reclaimer) {
  var DefeatAllBossesLevelItem = GameObject.extend({
    init: function() {
      this._super();

      this.bosses = null;
    },

    editorStart: function() {
      	this.counter = 0;
      	this.startY = this.y;

      	this.hide();

      	this.bosses = Root.findChildren().recurse().all(function(child) {
			return (child.typeId == "boss-1" || child.typeId == "boss-2" || child.typeId == "boss-3" || child.typeId == "boss-4");
		});

      	for (var i = 0; i < this.bosses.length; i++) {
      		this.bosses[i].once('destroyed', this, function(boss) {
				this.bosses.splice(this.bosses.indexOf(boss), 1);

				if (this.bosses.length == 0) {
					this.show();
				}
			});
      	}
    },

    editorUpdate: function(delta) {
    	this.y = this.startY + Math.cos(this.counter/20) * 10;
    	this.counter += 100 * delta;
    },

    show: function() {
		this._super();

		var collisionComponent = this.findComponents().firstWithProp('collider');
	
		if (collisionComponent)
			collisionComponent.enable();
	},

	hide: function() {
		this._super();

		var collisionComponent = this.findComponents().firstWithProp('collider');
	
		if (collisionComponent)
			collisionComponent.disable();
	},

    onCollide: function(other) {
    	Reclaimer.mark(this);
    }
  });

  return DefeatAllBossesLevelItem;
});

