define(["editor-game-object-container", "player-getter"], function(GameObject, PlayerGetter) {
	var HpMeter = GameObject.extend({
		init: function() {
			this._super();
			
			this.lowHpComponent = null;
		},

		editorStart: function() {
			this.renderer.play('5Hp');

			var player = PlayerGetter.get();

			this.lowHpComponent = this.findComponents().firstWithType('LowHpColorBlink');

			player.on(player.HEALTH_DOWN, this, function(playerHp) {
				
				if (playerHp === 1)
					this.lowHpComponent.enable();
				
				this.renderer.play(playerHp + 'Hp');
			});

			player.on(player.HEALTH_UP, this, function(playerHp) {
				
				this.lowHpComponent.disable();
				
				this.renderer.play(playerHp + 'Hp');
			});
		},

		editorUpdate: function(delta) {

		}
	});

	return HpMeter;
});
