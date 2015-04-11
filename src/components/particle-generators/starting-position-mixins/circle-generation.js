define(["util"], function (Util) {
	return function (radius) {
		return function (object) {
			var angle = Util.rand_f(0, Math.PI*2);

			object['x'] += Math.cos(angle) * radius;
			object['y'] += Math.sin(angle) * radius;
		}
	}
});