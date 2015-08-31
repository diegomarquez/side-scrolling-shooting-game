define(["editor-game-object-container", "player-getter"], function(GameObject, PlayerGetter) {
	var HpMeter = GameObject.extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.renderer.play('5Hp');

			var player = PlayerGetter.get();

			PlayerGetter.get().on(player.HEALTH_DOWN, this, function(playerHp) {
				this.renderer.play(playerHp + 'Hp');
			});

			PlayerGetter.get().on(player.HEALTH_UP, this, function(playerHp) {
				this.renderer.play(playerHp + 'Hp');
			});
		},

		editorUpdate: function(delta) {

		}
	});

	return HpMeter;
});
