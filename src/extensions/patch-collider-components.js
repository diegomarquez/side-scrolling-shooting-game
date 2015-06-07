define(function(require) {
	var gb = require('gb');
	var circleCollider = require('circle-collider');
	var polygonCollider = require('polygon-collider');
	var fixedPolygonCollider = require('fixed-polygon-collider');

	var PatchColliderComponents = require('extension').extend({
		init: function() {
 
		},

		type: function() {
			return gb.game.CREATE;
		},

		execute: function() { 
			Object.defineProperty(circleCollider.prototype, "Attributes", { 
				configurable: true,

				get: function() { 
					return { 
						radius: this.Radius 
					} 
				},

				set: function(value) {
					this.Radius = value.radius; 
				}
			});

			Object.defineProperty(circleCollider.prototype, "Radius", { 
				configurable: true,

				get: function() { 
					return this.collider.r; 
				},

				set: function(value) {
					this.collider.r = value;
					this.execute(this.CHANGE_RADIUS, value);
				} 
			});

			Object.defineProperty(polygonCollider.prototype, "Attributes", { 
				configurable: true,

				get: function() { 
					return { 
						points: this.Points 
					} 
				},

				set: function(value) {
					this.Points = value.points;
				}
			});

			Object.defineProperty(polygonCollider.prototype, "Points", { 
				configurable: true,

				get: function() { 
					return this.pointsCopy; 
				},

				set: function(value) {
					this.pointsCopy = value;
					this.execute(this.CHANGE_POINTS, value);
				} 
			});

			Object.defineProperty(fixedPolygonCollider.prototype, "Attributes", { 
				configurable: true,

				get: function() { 
					return { 
						points: this.Points 
					} 
				},

				set: function(value) {
					this.Points = value.points;
				}
			});

			Object.defineProperty(fixedPolygonCollider.prototype, "Points", { 
				configurable: true,

				get: function() { 
					return this.pointsCopy; 
				},

				set: function(value) {
					this.pointsCopy = value;
					this.execute(this.CHANGE_POINTS, value);
				} 
			});
			
			Object.defineProperty(circleCollider.prototype, "CHANGE_RADIUS", { 
				configurable: true,

				get: function() { 
					return 'change_radius'; 
				} 
			});

			Object.defineProperty(polygonCollider.prototype, "CHANGE_POINTS", { 
				configurable: true,

				get: function() { 
					return 'change_points'; 
				} 
			});

			Object.defineProperty(fixedPolygonCollider.prototype, "CHANGE_POINTS", { 
				configurable: true,

				get: function() { 
					return 'change_points'; 
				} 
			});
		},

		destroy: function() {
			delete circleCollider.prototype.Attributes;
			delete circleCollider.prototype.Radius;
		
			delete polygonCollider.prototype.Attributes;
			delete polygonCollider.prototype.Points;

			delete fixedPolygonCollider.prototype.Attributes;
			delete fixedPolygonCollider.prototype.Points;

			delete circleCollider.prototype.CHANGE_RADIUS;
			delete polygonCollider.prototype.CHANGE_POINTS;
			delete fixedPolygonCollider.prototype.CHANGE_POINTS;
		}    
	});

	return PatchColliderComponents;
});


