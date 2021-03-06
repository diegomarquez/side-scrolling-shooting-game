define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
	var BossCable = GameObject.extend({
		init: function() {
			this._super();

			this.health = 40;
			this.destroyEffect = null;
			this.destroyParticles = null;

		},

		start: function() {
			this._super();
		},

		editorStart: function() {
			this.bossStarted = false;
		},

		editorUpdate: function(delta) {

		},

		deActivate: function() {

		},

		onBossStart: function() {
			this.bossStarted = true;
		},

		onBossStop: function() {
			this.bossStarted = false;	
		},

		onCollide: function(other) {
			if (this.bossStarted) {
				if (this.health > 0) {
					this.health--;  
				} else {
					// Add the effects components
					Gb.addComponentTo(this, this.destroyEffect);
					Gb.addComponentsTo(this, this.destroyParticles);

					// Change renderer 
					Gb.setRendererTo(this, this.damageRendererId);
					// Remove collision component
					this.removeComponent(this.findComponents().firstWithType(this.colliderId));
					// Notify
					this.execute(this.DAMAGE);
				}
			}
		}
	});

	Object.defineProperty(BossCable.prototype, "DAMAGE", { get: function() { return 'damage'; } });

	return BossCable;
});

