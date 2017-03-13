define(function(require) {
	var soundPlayer = require("sound-player");
	var gb = require("gb");
	var lastBGMSoundId = "";

	var viewport = [{viewport: 'Main', layer: 'Front'}];

	var BGMSound = require("editor-game-object-container").extend({
		init: function() {
			this._super();

			this.soundId = "";
			this.playLast = false;
			this.stopCurrent = false;
			this.storeLast = true;
			this.inmediateRecycle = false;
			this.stopSoundOnRecycle = false;

			this.messageGameObjectId = null;
			this.messageGameObject = null;
		},

		editorStart: function() {
			if (this.stopCurrent) {
				soundPlayer.stopAll().which(function(id, source) {
					return id === 'INTRO' || id === 'LEVEL_1' || id === 'LEVEL_2' || id === 'LEVEL_3' || id === 'LEVEL_4' || id === 'BOSS';
				});

				return;
			}

			if (this.playLast) {
				if (lastBGMSoundId !== "") {
					soundPlayer.stopAll().which(function(id, source) {
						return id === 'INTRO' || id === 'LEVEL_1' || id === 'LEVEL_2' || id === 'LEVEL_3' || id === 'LEVEL_4' || id === 'BOSS';
					});

					soundPlayer.playLoop(lastBGMSoundId);
				}

				return;
			}

			if (lastBGMSoundId !== "")
				soundPlayer.stop(lastBGMSoundId);

			if (this.messageGameObjectId) {
				this.messageGameObject = gb.create(this.messageGameObjectId, 'First', viewport, {
					onComplete: function() {

						gb.reclaimer.mark(this.messageGameObject);

					}.bind(this)
				});
			}

			soundPlayer.playLoop(this.soundId);

			if (this.storeLast && this.soundId !== "")
				lastBGMSoundId = this.soundId;

			if (this.inmediateRecycle)
				require("reclaimer").mark(this);
		},

		deActivate: function() {

		},

		recycle: function() {
			if (this.soundId !== "" && this.stopSoundOnRecycle)
				soundPlayer.stop(this.soundId);

			this.playLast = false;
			this.stopCurrent = false;
			this.storeLast = true;
			this.inmediateRecycle = false;
			this.stopSoundOnRecycle = false;

			this.soundId = "";
			this.messageGameObjectId = null;

			this._super();
		}
	});

	BGMSound.clearLastBGMId = function() {
		lastBGMSoundId = "";
	}

	return BGMSound;
});

