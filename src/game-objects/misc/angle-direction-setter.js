define(function(require) {

	var AngleDirectionSetter = require("editor-game-object-container").extend({
		
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.mainViewport = require('gb').viewports.get("Main");
			this.player = require('player-getter').get();
			
			this.renderer.play();
			this.hide();

			this.player.once(this.player.STOP, this, this.onPlayerStop);
		},

		onPlayerStop: function() {
			this.show();
		},

		deActivate: function() {
			this.player.removeDelegate(this.player.STOP, this, this.onPlayerStop);
    	},

		editorUpdate: function(delta) {
			
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
    		other.move(this.rotation)

    		var self = this;

    		require('root').findChildren().recurse().all(function(child) {
				return child.poolId == self.poolId && child.getViewportVisibility('Main'); 
			}).forEach(function(sibling) {
				sibling.hide();
			});
    	}

	});

	return AngleDirectionSetter;
});

