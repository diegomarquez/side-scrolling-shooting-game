define(["editor-component", "timer-factory"], function(Component, TimerFactory) {
	var DamageOnHpDepleted = Component.extend({
		init: function() {
			this._super();

			this.initHp = 0;
		},

		editorStart: function(parent) {

			TimerFactory.get(this, 'repairTimer', 'repairTimer');

			this.repairTimer.configure({ delay: 10000, removeOnComplete:false });
			this.initHp = this.parent.hp;

			if (!this.parent.hp)
				throw new Error("Parent has no hp, it's either 0 or missing");

			this.parent.once('destroyed', this, function() {
				this.parent.findComponents().firstWithProp('collider').disable();
			});

      		this.parent.on('collide', this, function() {
      			if (this.parent.hp > 0) {
      				this.parent.hp--;
      			} else {
      				// Disable the collider on the parent
      				this.parent.findComponents().firstWithProp('collider').disable();
      				// This will trigger explosions in another component
      				this.parent.execute('damaged');

					this.repairTimer.start();

					this.repairTimer.on(this.repairTimer.COMPLETE, function() {
						// Reset damage
						this.parent.hp = this.initHp;
						// Enable the collider component
						this.parent.findComponents().firstWithProp('collider').enable();
						// Notify Repair
						this.parent.execute('repaired');
					}, true);
      			}
      		});
		},

		recycle: function() {
			if (this.repairTimer)
				this.repairTimer.remove();
		}	
	});

	return DamageOnHpDepleted;
});