define(['component', 'gb', 'timer-factory'], function(Component, Gb, TimerFactory){

	var PlayerDamageComponent = Component.extend({
		
		init: function() {
			this._super();

			this.startPos = false;
			this.lastX;
			this.lastY;
			
			this.amount = 1;
			this.damageExplosions = null;
			this.explosionsGenerator = null;
		},

		setExplosions: function(id) {
			this.damageExplosions = id;
		},

		enable: function() {
			this._super();
			
			this.startPos = false;

			this.explosionsGenerator = Gb.addComponentTo(this.parent, this.damageExplosions);
			
			if (this.disableTimer)
				this.disableTimer.remove();
			
			TimerFactory.get(this, 'disableTimer', 'disableTimer');
			this.disableTimer.configure({ delay: 1000 });

			this.disableTimer.on(this.disableTimer.COMPLETE, function() {
				this.disable();
				this.execute('complete');
			}, true);

      		this.explosionsGenerator.once(this.explosionsGenerator.STOP_CREATION, this, function() {
      			this.parent.removeComponent(this.explosionsGenerator);	
      			this.disableTimer.start();
      			this.explosionsGenerator = null;
      		});
		},	

		update: function(delta) {
			if(this.startPos) {
				this.parent.viewportOffsetX = this.lastX;
				this.parent.viewportOffsetY = this.lastY;
			} else {
				this.lastX = this.parent.viewportOffsetX;
				this.lastY = this.parent.viewportOffsetY;

				this.amount *= -1

				this.parent.viewportOffsetX += Math.random() * this.amount;
				this.parent.viewportOffsetY += Math.random() * this.amount;
			}

			this.startPos = !this.startPos;
		},

		recycle: function(parent) {
			if (this.disableTimer)
				this.disableTimer.remove();

			this._super(parent);
		}
	});

	return PlayerDamageComponent;
});