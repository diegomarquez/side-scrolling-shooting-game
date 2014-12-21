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
				get: function() { 
					return { radius: this.Radius } 
				},

				set: function(value) {
					this.Radius = value.radius;
					this.execute(this.CHANGE_RADIUS, value);
				}
			});

			Object.defineProperty(circleCollider.prototype, "Radius", { 
				get: function() { return this.collider.r; },

				set: function(value) {
					this.collider.r = value;
					this.execute(this.CHANGE_RADIUS, value);
				} 
			});

			Object.defineProperty(polygonCollider.prototype, "Attributes", { 
				get: function() { 
					return { points: this.Points } 
				},

				set: function(value) {
					this.Points = value.points;
					this.execute(this.CHANGE_POINTS, value);
				}
			});

			Object.defineProperty(polygonCollider.prototype, "Points", { 
				get: function() { return this.pointsCopy; },

				set: function(value) {
					this.pointsCopy = value;
					this.execute(this.CHANGE_POINTS, value);
				} 
			});

			Object.defineProperty(fixedPolygonCollider.prototype, "Attributes", { 
				get: function() { 
					return { points: this.Points } 
				},

				set: function(value) {
					this.Points = value.points;
					this.execute(this.CHANGE_POINTS, value);
				}
			});

			Object.defineProperty(fixedPolygonCollider.prototype, "Points", { 
				get: function() { return this.pointsCopy; },

				set: function(value) {
					this.pointsCopy = value;
					this.execute(this.CHANGE_POINTS, value);
				} 
			});
    	
    	Object.defineProperty(circleCollider.prototype, "CHANGE_RADIUS", { get: function() { return 'change_radius'; } });
			Object.defineProperty(polygonCollider.prototype, "CHANGE_POINTS", { get: function() { return 'change_points'; } });
			Object.defineProperty(fixedPolygonCollider.prototype, "CHANGE_POINTS", { get: function() { return 'change_points'; } });
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


