define(["child-generator"], function(ChildGenerator) {
	var OnCollisionChildGenerator = ChildGenerator.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			this._super();

			parent.once(parent.COLLIDE, this, onCollide);
		},

		editorUpdate: function() {

		}
	});

	var onCollide = function (other, response) {
		OnCollisionChildGenerator.args['vector'] = response.overlapV;
		this.spray(OnCollisionChildGenerator.args);
	}

	OnCollisionChildGenerator.args = {
		x: null,
		y: null,
		vector: null
	}

	return OnCollisionChildGenerator;
});