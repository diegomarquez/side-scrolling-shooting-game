define(['component', 'gb'], function(Component, Gb){

	var PlayerExplodeComponent = Component.extend({
		
		init: function() {
			this._super();

			this.damageExplosions = null;
		},

		enable: function() {
			this._super();

			this.parent.damageComponent.setExplosions(this.damageExplosions);
			this.parent.damageComponent.enable();

			this.parent.damageComponent.once('complete_explosions', this, function() {
				Gb.reclaimer.mark(this.parent);
				this.execute('complete');
			});

		},

		update: function(delta) {
			
		}
	});

	return PlayerExplodeComponent;
});