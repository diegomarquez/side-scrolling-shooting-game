define(['component'], function(Component){
	
	var TwitchComponent = Component.extend({
		
		start: function() {
			this.startPos = false;
			this.lastX;
			this.lastY;
		},

		update: function() {
			if(this.startPos){
				this.parent.x = this.lastX;
				this.parent.y = this.lastY;
			}else {
				this.lastX = this.parent.x;
				this.lastY = this.parent.y;

				this.amount *= -1

				this.parent.x += Math.random() * this.amount;
				this.parent.y += Math.random() * this.amount;
			}

			this.startPos = !this.startPos;
		}
	});

	return TwitchComponent;
});