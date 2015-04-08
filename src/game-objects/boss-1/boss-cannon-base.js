define(["editor-game-object-container", "timer-factory"], function(GameObject, TimerFactory) {
  var BossCannon = GameObject.extend({
    init: function() {
      this._super();
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