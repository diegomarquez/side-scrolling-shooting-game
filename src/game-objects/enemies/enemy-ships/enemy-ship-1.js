define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
	var EnemyShip_1 = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.angle = 0;
			this.speed = 0;
			this.moveTime = 0;
		},

		editorStart: function() {
			if (this.hp == 0)
				throw new Error('Enemy ship is missing hp attribute');

			if (this.speed == 0)
				throw new Error('Enemy ship is missing speed attribute');

			if (this.moveTime == 0)
				throw new Error('Enemy ship is missing moveTime attribute');

			this.renderer.play();

			this.once('finish-movement', this, function() {
				this.angle = 0;
				this.rotation = 0;

				this.findComponents().firstWithType('AngleMovement').enable();
			});
		},

		deActivate: function() {
			Reclaimer.mark(this);
		},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			
		}
	});

	return EnemyShip_1;
});

