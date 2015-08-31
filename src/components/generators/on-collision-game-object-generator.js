define(["game-object-generator"], function(GameObjectGenerator) {
	var OnCollisionGameObjectGenerator = GameObjectGenerator.extend({
		init: function() {
			this._super();

			this.excludeFromCollision = '';
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

		OnCollisionGameObjectGenerator.args['vector'] = response.overlapV;
		this.spray(OnCollisionGameObjectGenerator.args);
	}

	OnCollisionGameObjectGenerator.args = {
		x: null,
		y: null,
		vector: null
	}

	return OnCollisionGameObjectGenerator;
});