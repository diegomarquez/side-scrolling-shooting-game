define(["util"], function (Util) {
	return function (object) {
		object['x'] += Util.rand_f(this.lineVertex1.x, this.lineVertex2.x);
		object['y'] += Util.rand_f(this.lineVertex1.y, this.lineVertex2.y);
	};
});