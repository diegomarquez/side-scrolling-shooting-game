define(['component'], function(Component){
	
	var RotateComponent = Component.extend({
		init: function() {
			this._super();

			this.amount = 0;
		},

		update: function() {
			this.parent.rotation += this.amount;
		}
	});

	return RotateComponent;
});