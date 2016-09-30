define(['component'], function(Component){
	
	var RotateComponent = Component.extend({
		init: function() {
			this._super();

			this.amount = 0;
		},

		start: function() {
			this.amount += Math.random();
			
			var dir = Math.random() > 0.5 ? 1 : -1;

			this.amount *= dir;
		},

		update: function() {
			this.parent.rotation += this.amount;
		}
	});

	return RotateComponent;
});