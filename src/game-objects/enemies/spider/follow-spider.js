define(["editor-game-object-container", "player-getter", "root", "timer-factory", "gb", "TweenLite", "EasePack"], function(GameObject, PlayerGetter, Root, TimerFactory, Gb, TweenLite) {
	var SpiderFollow = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.speed = 0;

			this.target = null;
			this.movementAngleComponent = null;

			this.angle = 0;
		},

		editorStart: function() {
			
			this.target = PlayerGetter.get();

			this.movementAngleComponent = this.findComponents().firstWithType('AngleMovement');
			
			this.findComponents().firstWithType('Activate_Spider_On_View').disable();

			this.angle = this.rotation * (Math.PI/180);

			TimerFactory.get(this, "waitTimer", "waitTimer");
			
			this.waitTimer.configure({ delay: 1000, removeOnComplete: false });

			this.renderer.play();

			this.waitTimer.on('complete', function() {
				
				if (!this.target)
					return;

				this.show();

				var side = parseInt((Math.random() - 0.000000000001) * 4);

				var playerX = this.target.x;
				var playerY = this.target.y;

				if (side == 0) {
					// top

					this.x = playerX + Gb.canvas.width/2;
					this.y = playerY - this.renderer.rendererHeight()/2;

				} else if (side == 1) {
					// right
					
					this.x = playerX + Gb.canvas.width + this.renderer.rendererHeight()/2;
					this.y = playerY + Gb.canvas.height/2;

				} else if (side == 2) {
					// down
					 
					this.x = playerX + Gb.canvas.width/2;
					this.y = playerY + Gb.canvas.height + this.renderer.rendererHeight()/2;

				} else if (side == 3) {
					// left

					this.x = playerX - this.renderer.rendererHeight()/2;
					this.y = playerY + Gb.canvas.height/2;

				}

				var deltaX = this.target.X - this.x;
				var deltaY = this.target.Y - this.y;

				this.angle = Math.atan2(deltaY, deltaX);

				if (this.angle < 0)
					this.angle += 2 * Math.PI;

				this.rotation = (this.angle * (180/Math.PI));

				this.movementAngleComponent.enable();
			});
			
			this.on('out-of-screen-bounds', this, function() {
				this.waitTimer.start();
				this.movementAngleComponent.disable();
				this.hide();
			});
		},

		deActivate: function() {
			this.target = null;
    	},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			if (other.typeId == 'player-ship') {
				this.hp = 0;
			}
		},

		recycle: function() {
			if (this.waitTimer)
				this.waitTimer.remove();
			
			this._super();
		}
	});

	return SpiderFollow;
});

