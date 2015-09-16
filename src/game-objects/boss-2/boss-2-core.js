define(["editor-game-object-container", "player-getter", "root"], function(GameObject, PlayerGetter, Root) {
	var Boss_2_Core = GameObject.extend({
		init: function() {
			this._super();

			this.health = 40;
			// this.destroyEffect = null;
			// this.destroyParticles = null;
		},

		start: function() {
			this._super();
		},

		editorStart: function() {
			PlayerGetter.get().once(PlayerGetter.get().STOP, this, this.onPlayerStop);
		},

		deActivate: function() {
			PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);
    	},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			
		},

		onPlayerStop: function() {
			var body = this.findChildren().firstWithType("boss-body");

			// Start the body
			body.onBossStart();
			
			var cannons = Root.findChildren().recurse().all(function(child) {
				return child.poolId == "BossCannonBase" || child.poolId == "BossDoubleCannonBase"; 
			});

			// Signal boss cannos to start
			for (var i=0; i < cannons.length; i++) {
				if (cannons[i].getViewportVisibility('Main')) {
					cannons[i].onBossStart();
				}
			}
		}
	});

	// Object.defineProperty(Boss_2_Core.prototype, "DAMAGE", { get: function() { return 'damage'; } });

	return Boss_2_Core;
});

