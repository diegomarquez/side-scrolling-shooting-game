define(["editor-game-object-container", "timer-factory"], function(GameObject, TimerFactory) {
	var Boss_2_Body = GameObject.extend({
		init: function() {
			this._super();

			this.destroyEffect = null;
			this.colliderId = null;

			this.collider = null;
		},

		editorStart: function() {
			this.renderer.play('closed');

			TimerFactory.get(this, 'openTimer', 'openTimer');
			TimerFactory.get(this, 'attackTimer', 'attackTimer');
			TimerFactory.get(this, 'closeTimer', 'closeTimer');

			this.collider = this.findComponents().firstWithProp('collider');
		},

		editorUpdate: function(delta) {
								
		},

		onBossStart: function() {
			this.openTimer.configure({ delay: 6000, removeOnComplete:false });
			this.attackTimer.configure({ delay: 3000, removeOnComplete:false });
			this.closeTimer.configure({ delay: 2000, removeOnComplete:false });

			this.openTimer.start();

			this.openTimer.on(this.openTimer.COMPLETE, function() {
				this.renderer.play('opening');

				this.renderer.once('complete', this, function() {

					this.collider.disable();

					this.renderer.play('opened');

					this.attackTimer.start();
				});
			});

			this.attackTimer.on(this.attackTimer.COMPLETE, function() {
				
				// TODO: Attack logic
				
				this.closeTimer.start();

			});

			this.closeTimer.on(this.closeTimer.COMPLETE, function() {
				this.renderer.play('closing');
				this.collider.enable();

				this.renderer.once('complete', this, function() {
					
					this.renderer.play('closed');

					this.openTimer.start();
				});
			});
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
		}
	});

	return Boss_2_Body;
});

