define(["editor-game-object-container", "timer-factory", "particles-bundle", "effects-bundle"], 
	function(GameObject, TimerFactory, ParticlesBundle, EffectsBundle) {

  var BossCannon = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	this._super();

    	// Reference to all explosion generators
    	this.explosionsGenerators = this.findComponents().allWithType(EffectsBundle.getExplosionsEffectId());

    	// Reference to all the particle systems
    	this.particleGenerators = this.findComponents().all(function (c) {
    		return c.typeId === ParticlesBundle.getCannonDamageParticles_1_Id() || 
    					 c.typeId === ParticlesBundle.getCannonDamageParticles_2_Id()
    	});

    	// Disable effects sistems
    	this.explosionsGenerators.forEach(function(generator) {
      	generator.disable();
      });

    	// Disable particle sistems
      this.particleGenerators.forEach(function(generator) {
      	generator.disable();
      });
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

    onCollide: function(other) {
    	if (this.started) {
    		if (this.health > 0) {
    			this.health--;	
    		} else {

    			// Enable Effects sistems
    			this.explosionsGenerators.forEach(function(generator) {
      			generator.enable();
      		});

    			// Enable particle sistems
    			this.particleGenerators.forEach(function(generator) {
		      	generator.enable();
		      });

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

    				// Disable effects sistems
    				this.explosionsGenerators.forEach(function(generator) {
      				generator.disable();
      			});

    				// Disable particle sistems
    				this.particleGenerators.forEach(function(generator) {
			      	generator.disable();
			      });

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
