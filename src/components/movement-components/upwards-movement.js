define(['component', 'tweenlite'], function(Component, Tweenlite){
	
	var UpwardsMovement = Component.extend({
		start: function(parent) {
			this._super(parent);

			if (typeof this.endX === 'undefined' || this.endX === null)
				throw new Error('Missing endX property');

			if (typeof this.endY === 'undefined' || this.endY === null)
				throw new Error('Missing endY property');

			if (!this.time)
				throw new Error('Missing time property');

			TweenLite.to(this.parent, this.time, {
			    x: this.parent.X + this.endX,
			    y: this.parent.Y + this.endY,
			    
			    onCompleteScope: this, 
				
				onComplete: function() {
					if (this.parent)
						this.parent.execute('finish-upward-movement');
				}
			});
		},

		recycle: function(parent) {
			TweenLite.killTweensOf(parent);

			this._super(parent);
		}

	});

	return UpwardsMovement;
});