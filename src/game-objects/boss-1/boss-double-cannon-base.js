define(["editor-game-object-container", "gb", "timer-factory"], function(GameObject, Gb, TimerFactory) {

	var decompose = {};

	var BossDoubleCannon = GameObject.extend({
		init: function() {
			this._super();

			this.damageExplosions = null;
			this.damageParticles = null;
			this.completeCount = 0;
	    	this.completeAnimationsBeforeFire = -1;
		},

		editorStart: function() {
			this.started = false;
			this.health = 20;

			TimerFactory.get(this, 'repairTimer', 'repairTimer');

			this.completeCount = 1;
		},

		deActivate: function() {
	    	this.renderer.remove(this.renderer.COMPLETE_BACK, this, this.onCompleteBackAnimation);	
	    },

	    onCompleteBackAnimation: function() {
	    	if (this.completeCount % this.completeAnimationsBeforeFire == 0) {

	    		var firePositions = this.findChildren().allWithType("FirePosition");

	    		for (var i = 0; i < firePositions.length; i++) {
	    			decompose = firePositions[i].getMatrix().decompose(decompose);

	    			Gb.create('double-cannon-bullet', this.getUpdateGroup(), this.getViewportList(), {
						angle: this.rotation - 90 + firePositions[i].angle,
						x: decompose.x,
						y: decompose.y
					});
	    		}	
	    	}

	    	this.completeCount++;
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
			this.renderer.play();
			this.renderer.on(this.renderer.COMPLETE_BACK, this, this.onCompleteBackAnimation);
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
			if (!this.started) {
				return;
			}
			
			if (this.health > 0) {
				this.health--;	
			} else {

				// Add the effects components
				var explosionsGenerator = Gb.addComponentTo(this, this.damageExplosions);
				var particleGenerators = Gb.addComponentsTo(this, this.damageParticles);

				// Disable the collider component
				this.findComponents().firstWithProp('collider').disable();

				// Start reapir timer
				this.repairTimer.configure({ delay: 10000, removeOnComplete:false });
				this.repairTimer.start();

				this.renderer.pause();

				this.repairTimer.on(this.repairTimer.COMPLETE, function() {
					this.renderer.play();

					// Reset damage
					this.health = 20; 
					// Enable the collider component
					this.findComponents().firstWithProp('collider').enable();

					// Remove the effects components
					this.removeComponent(explosionsGenerator);
					this.removeComponents(particleGenerators);
				}, true);    			
			}
		}
	});

  return BossDoubleCannon;
});
