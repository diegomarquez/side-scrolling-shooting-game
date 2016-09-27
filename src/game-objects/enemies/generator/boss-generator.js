define(["editor-game-object-container", "timer-factory", "util", "gb"], function(GameObject, TimerFactory, Util, Gb) {
	
	var selfDecompose = {};
	var r = {};

	var Generator = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.amount = 0;
			this.objectType = '';
		},

		canCollide: function() {
			return this.started;
		},

		editorStart: function() {
			this.started = false;	
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
			this.deActivate();
			this.cleanUpRendererDelegates();

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
					child.getMatrix().decompose(r);

					return { x: r.x, y: r.y };
				})
			});

			var viewportList = object.getViewportList();

			for (var i = 0; i < viewportList.length; i++) {
				Gb.viewports.get(viewportList[i].viewport).getLayer(viewportList[i].layer).moveGameObjectToBack(object);
			}
		},

		onBossStart: function() {
			if (this.started)
				return;

			this.started = true;

			if (this.hp == 0)
				throw new Error('Missing hp');

			if (this.amount == 0)
				throw new Error('Missing amount');

			if (this.objectType == '')
				throw new Error('Missing objectType');	

			this.closingAnimation();

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

				this.addRendererDelegate('complete', function() {
					this.renderer.play('opened');

					this.attackTimer.start();
				});
			});

			this.attackTimer.on(this.attackTimer.COMPLETE, function() {
				this.generateTimer.start();
			});

			this.closeTimer.on(this.closeTimer.COMPLETE, function() {
				this.renderer.play('closing');

				this.addRendererDelegate('complete', function() {
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
				if (!this.started)
					return;

				this.openTimer.stop();
				this.closeTimer.stop();
				this.attackTimer.stop();
				this.generateTimer.stop();

				this.closingAnimation();
			});

			this.on('repaired', this, function() {
				if (!this.started)
					return;

				this.openTimer.start();
			});
		},

		onBossStop: function() {
			this.started = false;

			this.deActivate();
			this.cleanUpRendererDelegates();
			this.closingAnimation();
		},

		closingAnimation: function() {
			if (this.renderer.isAtLabel('opened')) {
				this.renderer.play('closing');
				
				this.addRendererDelegate('complete', function() {
					this.renderer.play('closed');
				});
			}
			else if (this.renderer.isAtLabel('opening')) {
				this.renderer.reverse();
				
				this.addRendererDelegate('complete_back', function() {
					this.renderer.play('closed');
				});
			}
			else if (this.renderer.isAtLabel('closing')) {
				this.addRendererDelegate('complete', function() {
					this.renderer.play('closed');
				});
			}
			else if (this.renderer.isAtLabel('half-open')) {
				this.renderer.play('half-open-close');

				this.addRendererDelegate('complete', function() {
					this.renderer.play('closed');
				});
			}
		},

		onBossDestroy: function() {
			this.execute('destroyed');
		},

		addRendererDelegate: function(name, handler) {
			this.renderer.once(name, this, handler, "boss-generator-renderer-handler");
		},

		cleanUpRendererDelegates: function() {
			this.renderer.levelCleanUp("boss-generator-renderer-handler");
		}

	});

	return Generator;
});

