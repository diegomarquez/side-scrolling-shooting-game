define(function(require) {

	var AngleDirectionSetter = require("editor-game-object-container").extend({
		
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.mainViewport = require('gb').viewports.get("Main");
			this.player = require('player-getter').get();
			
			this.renderer.play();
			
			this.player.once(this.player.STOP, this, this.onPlayerStop);

			var collisionComponent = this.findComponents().firstWithProp('collider');
		
			if (collisionComponent)
				collisionComponent.disable();
		},

		onPlayerStop: function() {
			var collisionComponent = this.findComponents().firstWithProp('collider');
		
			if (collisionComponent)
				collisionComponent.enable();
		},

		deActivate: function() {
			this.player.removeDelegate(this.player.STOP, this, this.onPlayerStop);
    	},

		editorUpdate: function(delta) {
			
		},

    	onCollide: function(other) {
    		other.move(this.rotation)

    		var self = this;

    		require('root').findChildren().recurse().all(function(child) {
				return child.poolId == self.poolId && child.getViewportVisibility('Main'); 
			}).forEach(function(sibling) {
				
				var collisionComponent = sibling.findComponents().firstWithProp('collider');
		
				if (collisionComponent)
					collisionComponent.disable();
				
			});
    	},

    	getDirection: function() {
    		return this.rotation;
    	}

	});

	return AngleDirectionSetter;
});

