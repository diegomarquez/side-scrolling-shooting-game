define(["extension", "gb", "timelinelite"], function(Extension, Gb, TimelineLite) {
	var game = Gb.game;

  	var TweensControl = Extension.extend({
		type: function() {
			return Gb.game.CREATE;
		},

		execute: function() {
			game.on(game.BLUR, this, function() {
				this.tweensTimeline = TimelineLite.exportRoot();
				this.tweensTimeline.pause();
			}, false, false, false, 'tweens');

			game.on(game.FOCUS, this, function() {
				this.tweensTimeline.resume();
			}, false, false, false, 'tweens');
		},

		destroy: function() {
			game.levelCleanUp('tweens');
		}
  	});

  	return TweensControl;
});
