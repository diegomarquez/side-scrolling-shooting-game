define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
	
	var viewport = [{viewport: 'Main', layer: 'Front'}];

	var BossWarning = GameObject.extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.execute("warning");

			Gb.create('WarningMessage', 'First', viewport, {
				onComplete: function() {
					Gb.create("bgm-boss", "First", viewport);

					Gb.reclaimer.mark(this);
				}.bind(this)
			});
		},

		deActivate: function() {

		},

		editorUpdate: function(delta) {

		}
	});

	return BossWarning;
});

