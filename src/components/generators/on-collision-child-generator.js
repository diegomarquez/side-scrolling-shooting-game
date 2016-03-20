define(["child-generator"], function(ChildGenerator) {
	var OnCollisionChildGenerator = ChildGenerator.extend({
		init: function() {
			this._super();

			this.excludeFromCollision = '';
			this.self = OnCollisionChildGenerator;
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

	OnCollisionChildGenerator.args = {
		x: null,
		y: null,
		vector: null
	}

	return OnCollisionChildGenerator;
});