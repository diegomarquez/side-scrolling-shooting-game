define(['component', 'gb'], function(Component, Gb, TimerFactory){

	var PlayerLowHpComponent = Component.extend({
		init: function() {
			this._super();

			this.damageExplosions = null;
			this.colorBlinkComponent = null;
			
			this.explosionsGenerator = null;
			this.colorComponent = null;
			
			this.frameCounter = 0;
			this.isTinting = true;
		},

		enable: function() {
			this._super();

			if (this.explosionsGenerator) {
				this.explosionsGenerator.enable();
			} else {
				this.explosionsGenerator = Gb.addComponentTo(this.parent, this.damageExplosions);
			}
			
			if (this.colorComponent) {
				this.colorComponent.enable();
			} else {
				this.colorComponent = Gb.addComponentTo(this.parent, this.colorBlinkComponent);
			}
		},
		
		disable: function() {
			this._super();
			
			if (this.explosionsGenerator)
				this.explosionsGenerator.disable();
			
			if (this.colorComponent)
				this.colorComponent.disable();
		}
	});

	return PlayerLowHpComponent;
});