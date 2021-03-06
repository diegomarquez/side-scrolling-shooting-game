define(["editor-game-object-container", "timer-factory", "util", "matrix-3x3", "gb"], function(GameObject, TimerFactory, Util, Matrix, Gb) {
	
	var selfDecompose = {};
	var r = {};
	var m = new Matrix();

	var Generator = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.amount = 0;
			this.objectType = '';
		},

		editorStart: function() {
				
			if (this.hp == 0)
				throw new Error('Missing hp');

			if (this.amount == 0)
				throw new Error('Missing amount');

			if (this.objectType == '')
				throw new Error('Missing objectType');	

			this.renderer.play('closed');

			TimerFactory.get(this, 'openTimer', 'openTimer');
			TimerFactory.get(this, 'attackTimer', 'attackTimer');
			TimerFactory.get(this, 'closeTimer', 'closeTimer');
			TimerFactory.get(this, 'generateTimer', 'generateTimer');

			this.openTimer.configure({ delay: 2000, removeOnComplete:false });
			this.attackTimer.configure({ delay: 1000, removeOnComplete:false });
			this.closeTimer.configure({ delay: 1000, removeOnComplete:false });
			this.generateTimer.configure({ delay: 1000, repeatCount: this.amount, removeOnComplete:false });

			this.openTimer.start();

			this.openTimer.on(this.openTimer.COMPLETE, function() {
				this.renderer.play('opening');

				this.renderer.once('complete', this, function() {

					this.renderer.play('opened');

					if (this.attackTimer)
						this.attackTimer.start();
				});
			});

			this.attackTimer.on(this.attackTimer.COMPLETE, function() {
				if (this.generateTimer)
					this.generateTimer.start();
			});

			this.closeTimer.on(this.closeTimer.COMPLETE, function() {
				this.renderer.play('closing');
			
				this.renderer.once('complete', this, function() {
					
					this.renderer.play('closed');

					if (this.openTimer)
						this.openTimer.start();
				});
			});

			this.generateTimer.on(this.generateTimer.REPEATE, function() {
				this.generate();
			});

			this.generateTimer.on(this.generateTimer.COMPLETE, function() {
				if (this.closeTimer)
					this.closeTimer.start();
			});
		},

		deActivate: function() {
			if (this.openTimer)
				this.openTimer.remove();
			
			if (this.attackTimer)
				this.attackTimer.remove();
			
			if (this.closeTimer)
				this.closeTimer.remove();

			if (this.generateTimer)
				this.generateTimer.remove();
		},

		editorUpdate: function(delta) {
								
		},

		onCollide: function(other) {
			
		},

		recycle: function() {
			if (this.openTimer)
				this.openTimer.remove();

			if (this.closeTimer)
				this.closeTimer.remove();

			if (this.attackTimer)
				this.attackTimer.remove();

			if (this.generateTimer)
				this.generateTimer.remove();

			this._super();
		},

		generate: function() {
			selfDecompose = this.getMatrix().decompose(selfDecompose);

			var object = Gb.create(this.objectType, this.getUpdateGroup(), this.getViewportList(), {
				angle: (selfDecompose.rotation - 90) * (Math.PI/180),
				rotation: (selfDecompose.rotation - 90),
				x: selfDecompose.x,
				y: selfDecompose.y,
				wayPoints: this.findChildren().allWithType('GeneratorWayPoint').map(function (child) {
					child.getTransform(r, m);

					return { x: r.x, y: r.y };
				})
			});

			var viewportList = object.getViewportList();

			for (var i = 0; i < viewportList.length; i++) {
				Gb.viewports.get(viewportList[i].viewport).getLayer(viewportList[i].layer).moveGameObjectToBack(object);
			}
		}

	});

	return Generator;
});

