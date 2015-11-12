define(['component', 'gb'], function(Component, Gb){

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
			
      		this.explosionsGenerator.once(this.explosionsGenerator.STOP_CREATION, this, function() {
      			this.parent.removeComponent(this.explosionsGenerator);	

      			this.disable();

      			this.explosionsGenerator = null;

      			this.execute('complete');
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
		}
	});

	return PlayerDamageComponent;
});