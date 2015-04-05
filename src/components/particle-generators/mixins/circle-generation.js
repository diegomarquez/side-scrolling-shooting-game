define(["util"], function (Util) {
	return function (object) {
		var angle = Util.rand_f(0, Math.PI*2);

		object['x'] += Math.cos(angle) * this.radius;
		object['y'] += Math.sin(angle) * this.radius;
	};
});