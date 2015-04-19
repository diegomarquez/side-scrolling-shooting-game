define(["util"], function (Util) {
	return function (vertex1, vertex2) {
		return function (object) {
			object['x'] += Util.rand_f(vertex1.x, vertex2.x);
			object['y'] += Util.rand_f(vertex1.y, vertex2.y);
		}
	}
});