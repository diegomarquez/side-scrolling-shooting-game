define(["editor-game-object-container", "timer-factory", "util", "gb"], function(GameObject, TimerFactory, Util, Gb) {
	
	var selfDecompose = {};

	var Generator = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.amount = 0;
			this.objectType = '';
		},

		editorStart: function() {
				
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

			Gb.create(this.objectType, this.getUpdateGroup(), this.getViewportList(), {
				angle: (selfDecompose.rotation - 90) * (Math.PI/180),
				rotation: (selfDecompose.rotation - 90),
				x: selfDecompose.x,
				y: selfDecompose.y
			});
		},

		onBossStart: function() {
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

			this.openTimer.configure({ delay: 6000, removeOnComplete:false });
			this.attackTimer.configure({ delay: 3000, removeOnComplete:false });
			this.closeTimer.configure({ delay: 2000, removeOnComplete:false });
			this.generateTimer.configure({ delay: 1000, repeatCount: this.amount, removeOnComplete:false });

			this.openTimer.start();

			this.openTimer.on(this.openTimer.COMPLETE, function() {
				this.renderer.play('opening');

				this.renderer.once('complete', this, function() {

					this.renderer.play('opened');

					this.attackTimer.start();
				});
			});

			this.attackTimer.on(this.attackTimer.COMPLETE, function() {
				this.generateTimer.start();
			});

			this.closeTimer.on(this.closeTimer.COMPLETE, function() {
				this.renderer.play('closing');
			
				this.renderer.once('complete', this, function() {
					
					this.renderer.play('closed');

					this.openTimer.start();
				});
			});

			this.generateTimer.on(this.generateTimer.REPEATE, function() {
				this.generate();
			});

			this.generateTimer.on(this.generateTimer.COMPLETE, function() {
				this.closeTimer.start();
			});

			this.on('damaged', this, function() {
				this.openTimer.stop();
				this.closeTimer.stop();
				this.attackTimer.stop();
				this.generateTimer.stop();

				this.renderer.play('closing');
			});

			this.on('repaired', this, function() {
				this.openTimer.start();
			});
		},

		onBossDestroy: function() {
			this.execute('destroyed');
		}

	});

	return Generator;
});

