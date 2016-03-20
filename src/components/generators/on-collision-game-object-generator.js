define(["game-object-generator"], function(GameObjectGenerator) {
	var OnCollisionGameObjectGenerator = GameObjectGenerator.extend({
		init: function() {
			this._super();

			this.excludeFromCollision = '';
			this.self = OnCollisionGameObjectGenerator;
		},

		editorStart: function(parent) {
			this._super();

			parent.once(parent.COLLIDE, this, onCollide);
		},

		editorUpdate: function() {

		}
	});

	var onCollide = function (other, response) {
		if (other.typeId === this.excludeFromCollision)
			return;

		this.self.args['vector'] = response.overlapV;
		this.spray(this.self.args);
	}

	OnCollisionGameObjectGenerator.args = {
		x: null,
		y: null,
		vector: null
	}

	return OnCollisionGameObjectGenerator;
});