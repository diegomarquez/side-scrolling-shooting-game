define(["editor-component", "gb", "player-getter"], function(Component, Gb, PlayerGetter) {
	
	var StopBoss = Component.extend({
		init: function() {
			this._super();

			this.isPlayerStopped = false;
		},

		editorStart: function(parent) {

			if (!parent.stopLogic)
				throw new Error("missing stopLogic method");

			PlayerGetter.get().on(PlayerGetter.get().STOP, this, this.onPlayerStop);
			PlayerGetter.get().on(PlayerGetter.get().MOVE, this, this.onPlayerMove);
		},

		onPlayerStop: function() {
			if (!this.parent)
				return;

			if (!this.parent.isActive())
				return;

			if (this.isPlayerStopped)
				return;

			this.isPlayerStopped = true;
		},

		onPlayerMove: function() {
			if (!this.parent)
				return;

			if (!this.parent.isActive())
				return;

			if (!this.isPlayerStopped)
				return;

			this.isPlayerStopped = false;

			this.parent.stopLogic();
		},

		recycle: function() {
			this._super();

			this.isPlayerStopped = false;

			if (PlayerGetter.exists()) {
				PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);
				PlayerGetter.get().removeDelegate(PlayerGetter.get().MOVE, this, this.onPlayerMove);	
			}
		}
	});

	return StopBoss;
});