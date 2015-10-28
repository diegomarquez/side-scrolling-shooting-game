define(["editor-game-object-container"], function(GameObject) {
	var LevelFrame = GameObject.extend({
		init: function() {
			this._super();
		},

		editorStart: function() {
			this.renderer.play('unselected');
		},

		select: function() {
			this.renderer.play('selected');
		},

		unselect: function() {
			this.renderer.play('unselected');
		},

		editorUpdate: function(delta) {

		}
	});

	return LevelFrame;
});
