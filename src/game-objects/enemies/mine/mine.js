define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
	var Mine = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.angle = 0;
			this.speed = 0;
			this.moveTime = 0;
		},

		editorStart: function() {
			if (this.hp == 0)
				throw new Error('Mine is missing hp attribute');

			this.renderer.play();
		},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			
			if (other.typeId == 'player-ship') {
				this.destroyMine();

				return;
			}

			if (this.hp > 0) {
				this.hp--;
			} else {
				this.destroyMine();
			}
		},

		destroyMine: function() {
			if (this.isActive()) {
				var collider = this.findComponents().firstWithProp('collider');
				collider.disable();

				this.execute('destroyed');
			}
		}
	});

	return Mine;
});

