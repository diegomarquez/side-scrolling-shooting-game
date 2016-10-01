define(['component', "TweenLite", "EasePack"], function(Component, TweenLite) {
	
	var Tween = Component.extend({
		start: function(parent) {
			this._super(parent);

			if (!this.properties)
				throw new Error('Missing properties to tween object');

			for (var k in this.properties) {	
				if (typeof parent[k] !== 'number')
					throw new Error('Parent does not have property to to tween');
			}

			if (!this.tweenProperties)
				throw new Error('Missing tween properties object');

			if (!this.tweenProperties.time)
				throw new Error('Missing time property');

			if (!this.tweenProperties.tweenStartProperties)
				throw new Error('Missing tweenStartProperties property');

			if (!this.tweenProperties.tweenEndProperties)
				throw new Error('Missing tweenEndProperties property');

			var tweenInitArgs = this.tweenProperties.tweenStartProperties;
			var tweenEndArgs = this.tweenProperties.tweenEndProperties;

			TweenLite.fromTo(this.parent, this.tweenProperties.time, tweenInitArgs, tweenEndArgs);
		},

		recycle: function(parent) {
			TweenLite.killTweensOf(parent);

			this._super(parent);
		}

	});

	return Tween;
});