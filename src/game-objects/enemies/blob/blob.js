define(["editor-game-object-container", "reclaimer", "player-getter"], function(GameObject, Reclaimer, PlayerGetter) {
	var Blob = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.speed = 0;
			this.target = null;
		},

		editorStart: function() {
			if (this.hp == 0)
				throw new Error('Blob is missing hp attribute');

			if (this.speed == 0)
				throw new Error('Blob is missing speed attribute');

			this.target = PlayerGetter.get();

			this.renderer.play();
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
		}
	});

	return Blob;
});

