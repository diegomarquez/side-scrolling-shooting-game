define(["editor-component", "gb"], function(Component, Gb) {
	var DestroyExplosions = Component.extend({
		init: function() {
			this._super();

			this.effect = null
		},

		start: function(parent) {
			this.parent.once('destroyed', this, function() {
				var explosionsGenerator = Gb.addComponentTo(this.parent, this.effect);

	    		explosionsGenerator.once(explosionsGenerator.STOP_CREATION, this, function() {
	     	  		this.parent.hide(true).not().allWithType(explosionsGenerator.objectType);
	     	 	});  
	     	 	
	      		explosionsGenerator.once(explosionsGenerator.STOP_AND_ALL_RECYCLED, this, function() {
	      			Gb.reclaimer.mark(this.parent);
	      		});

			});
		},

		update: function(delta) {
			
		}
	});

	return DestroyExplosions;
});