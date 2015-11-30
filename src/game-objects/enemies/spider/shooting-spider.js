define(["editor-game-object-container", "reclaimer", "player-getter", "timer-factory", "gb"], function(GameObject, Reclaimer, PlayerGetter, TimerFactory, Gb) {
	
	var targetDecompose = {};
	var targetMatrix = null;

	var selfDecompose = {};
	var selfMatrix = null;

	var ShootingSpider = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.speed = 0;
			this.angle = 0;

			this.shootingTime = 0;
			this.bulletType = '';
		},

		editorStart: function() {
			if (this.hp == 0)
				throw new Error('Shooting Spider is missing hp attribute');

			if (this.speed == 0)
				throw new Error('Shooting Spider is missing speed attribute');

			if (this.shootingTime == 0)
				throw new Error('Shooting Spider is missing shootingTime attribute');

			if (this.bulletType == 0)
				throw new Error('Shooting Spider is missing bulletType attribute');

			this.renderer.play();
			this.angle = this.rotation * (Math.PI/180);

			TimerFactory.get(this, "shootingTimer", "shootingTimer");
			
			this.shootingTimer.configure({ delay: this.shootingTime, removeOnComplete: false, repeatCount: -1 });

			this.shootingTimer.start();

			targetMatrix = PlayerGetter.get().getMatrix(targetMatrix);
			selfMatrix = this.getMatrix(selfMatrix);

			this.shootingTimer.on(this.shootingTimer.REPEATE, function() {

				targetDecompose = targetMatrix.decompose(targetDecompose);
				selfDecompose = selfMatrix.decompose(selfDecompose);
				
				var deltaX = targetDecompose.x - selfDecompose.x;
				var deltaY = targetDecompose.y - selfDecompose.y;

				Gb.create(this.bulletType, this.getUpdateGroup(), this.getViewportList(), {
					angle: Math.atan2(deltaY, deltaX) * (180 / Math.PI),
					x: selfDecompose.x,
					y: selfDecompose.y
				});

			});
		},

		deActivate: function() {
			Reclaimer.mark(this);
		},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			if (other.typeId == 'player-ship') {
				this.hp = 0;
			}
		},

		recycle: function(parent) {
			if (this.shootingTimer)
				this.shootingTimer.remove();

			this._super(parent);
		}
	});

	return ShootingSpider;
});

