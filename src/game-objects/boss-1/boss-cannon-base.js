define(["editor-game-object-container", "gb", "timer-factory"], function(GameObject, Gb, TimerFactory) {

	var BossCannon = GameObject.extend({
		init: function() {
			this._super();

			this.damageExplosions = null;
			this.damageParticles = null;
		},

		editorStart: function() {
			this.started = false;
			this.health = 20;

			TimerFactory.get(this, 'repairTimer', 'repairTimer');
		},

		editorUpdate: function(delta) {

		},

		recycle: function() {
			if (this.repairTimer) {
				this.repairTimer.remove();	
			}

			this._super();
		},

		onBossStart: function() {
			this.started = true;
		},

		onBossDestroy: function() {
			this.repairTimer.stop();

			this.findComponents().firstWithProp('collider').disable();

			var explosionsGenerator = Gb.addComponentTo(this, this.damageExplosions);

			// When the explosion generator is finished, hide the cannon
			explosionsGenerator.once(explosionsGenerator.STOP_CREATION, this, function() {
				this.hide(true).not().allWithType(explosionsGenerator.objectType);
			});

			// When the last explosion is done with it's animation, mark the cannon for recycling
			explosionsGenerator.once(explosionsGenerator.STOP_AND_ALL_RECYCLED, this, function() {
				Gb.reclaimer.mark(this);
			});
		},

		onCollide: function(other) {
			if (this.started) {
				if (this.health > 0) {
					this.health--;	
				} else {
					// Add the effects components
					var explosionsGenerator = Gb.addComponentTo(this, this.damageExplosions);
					var particleGenerators = Gb.addComponentsTo(this, this.damageParticles);

					// Disable the collider component
					this.findComponents().firstWithProp('collider').disable();
					// Notify Damage
					this.execute(this.DAMAGE);

					// Start reapir timer
					this.repairTimer.configure({ delay: 10000, removeOnComplete:false });
					this.repairTimer.start();

					this.repairTimer.on(this.repairTimer.COMPLETE, function() {
						// Reset damage
						this.health = 20; 
						// Enable the collider component
						this.findComponents().firstWithProp('collider').enable();

						// Remove the effects components
						this.removeComponent(explosionsGenerator);
						this.removeComponents(particleGenerators);

						// Notify Repair
						this.execute(this.REPAIR);
					}, true);    			
				}
			}
		}
	});

  Object.defineProperty(BossCannon.prototype, "DAMAGE", { get: function() { return 'damage'; } });
  Object.defineProperty(BossCannon.prototype, "REPAIR", { get: function() { return 'repair'; } });

  return BossCannon;
});
