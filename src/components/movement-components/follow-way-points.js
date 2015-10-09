define(["editor-component", "tweenlite", "bezier", "util"], function(Component, TweenLite, BezierPlugin, Util) {
	var FollowWayPoints = Component.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			if (!this.parent.speed)
				throw new Error('Missing speed attribute');

			if (!this.parent.wayPoints)
				throw new Error('Missing wayPoints attribute');

			var time = Util.polylineLength(this.parent.wayPoints) / this.parent.speed;

			TweenLite.to(this.parent, time, {
			    bezier: {
			        curviness: 0,
			        autoRotate: true,
			        values: this.parent.wayPoints
			    },
			    ease: Linear.easeNone,
			    onCompleteScope: this, 
				onComplete: function() {
					this.parent.execute('finish-movement');
				}
			});

			this.parent.on('destroyed', this, function() {
				TweenLite.killTweensOf(this.parent);
			});
		},

		editorUpdate: function(delta) {
			
		},

		recycle: function() {
			TweenLite.killTweensOf(this.parent);
		}
	});

	return FollowWayPoints;
});