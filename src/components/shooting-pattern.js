define(["editor-component", "gb"], function(Component, Gb) {

	var originDecompose = {};
	
	var ShootingPattern = Component.extend({
		init: function() {
			this._super();

			this.pattern = null;
			this.objectType = null;
			this.originMatrix = null;
			this.index = 0;

			this.timeoutId = -1;
		},

		editorStart: function(parent) {
			this.index = 0;

			if (!this.pattern)
				throw new Error('Missing pattern attribute');

			if (!this.objectType)
				throw new Error('Missing objectType attribute');
		},

		shootVolley: function() {
			var self = this;
			var p = this.pattern[this.index];

			for (var i = 0; i < p.angles.length; i++) {
				originDecompose = this.originMatrix.decompose(originDecompose);

				Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
					angle: originDecompose.rotation + p.angles[i] + p.offset,
					x: originDecompose.x,
					y: originDecompose.y
				});
			}

			if (this.index < this.pattern.length-1) {
				this.index++;

				this.timeoutId = setTimeout(function() {
					self.shootVolley();
				}, p.waitTime)
			} else {
				this.index = 0;
				this.parent.execute('finish-shot-pattern')
			}
		},

		setOrigin: function(origin) {
			this.originMatrix = origin.getMatrix(this.originMatrix);

			this.parent.on('start-shot-pattern', this, function() {
				this.shootVolley();				
			});
		},

		recycle: function() {
			this.pattern = null;
			this.originMatrix = null;
			this.objectType = null;

			clearTimeout(this.timeoutId);

			this._super();	
		}
	});

	return ShootingPattern;
});