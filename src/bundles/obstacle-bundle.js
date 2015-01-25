define(function(require) {	
	var commonBundle = require('common-bundle');

	var obstacle = require("obstacle");
	var obstacleRenderer = require('obstacle-renderer');

	var Bullets = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('obstacle-renderer', obstacleRenderer);
			
			this.gameObjectPool.createDynamicPool('Obstacle', obstacle);
			
			this.componentPool.createConfiguration("ObstacleCollider4", commonBundle.getPolygonColliderPoolId())
				.args({ id:'obstacleColliderId', points: getPolygon(4, 20) });

			this.componentPool.createConfiguration("ObstacleCollider5", commonBundle.getPolygonColliderPoolId())
				.args({ id:'obstacleColliderId', points: getPolygon(5, 20) });

			this.componentPool.createConfiguration("ObstacleCollider6", commonBundle.getPolygonColliderPoolId())
				.args({ id:'obstacleColliderId', points: getPolygon(6, 20) });

			this.componentPool.createConfiguration("ObstacleCollider7", commonBundle.getPolygonColliderPoolId())
				.args({ id:'obstacleColliderId', points: getPolygon(7, 20) });

			this.componentPool.createConfiguration("ObstacleCollider8", commonBundle.getPolygonColliderPoolId())
				.args({ id:'obstacleColliderId', points: getPolygon(8, 20) });

			this.componentPool.createConfiguration("ObstacleRender", 'obstacle-renderer');

			this.gameObjectPool.createConfiguration("Obstacle_4", "Obstacle").addComponent("ObstacleCollider4").setRenderer("ObstacleRender");
			this.gameObjectPool.createConfiguration("Obstacle_5", "Obstacle").addComponent("ObstacleCollider5").setRenderer("ObstacleRender");
			this.gameObjectPool.createConfiguration("Obstacle_6", "Obstacle").addComponent("ObstacleCollider6").setRenderer("ObstacleRender");
			this.gameObjectPool.createConfiguration("Obstacle_7", "Obstacle").addComponent("ObstacleCollider7").setRenderer("ObstacleRender");
			this.gameObjectPool.createConfiguration("Obstacle_8", "Obstacle").addComponent("ObstacleCollider8").setRenderer("ObstacleRender");
		},
	});

	var getPolygon = function(vertexes, radius) {
		var result = [];
		var step = (Math.PI * 2)/vertexes;

		for (var i = 0; i < vertexes; i++) {
			var point = {};

			point.x = Math.sin(step*i) * radius; 
			point.y = Math.cos(step*i) * radius;

			result.push(point);
		}

		return result;
	}

	return new Bullets();
});