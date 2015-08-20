define(function(require) {	
	var commonBundle = require('common-bundle');

	var obstacle = require("obstacle");
	var obstacleRenderer = require('obstacle-renderer');

	var Obstacles = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('obstacle-renderer', obstacleRenderer);
			this.componentPool.createConfiguration("ActivateObstancleOnView", commonBundle.getActivateOnViewPoolId());

			this.gameObjectPool.createDynamicPool('Obstacle', obstacle);
			
			this.componentPool.createConfiguration("ObstacleCollider3", commonBundle.getPolygonColliderPoolId())
				.args({ id:'obstacleColliderId', points: getPolygon(3, 20) });

			this.componentPool.createConfiguration("ObstacleCollider4", commonBundle.getPolygonColliderPoolId())
				.args({ id:'obstacleColliderId', points: getPolygon(4, 20) });

			this.componentPool.createConfiguration("ObstacleRender", 'obstacle-renderer');

			this.gameObjectPool.createConfiguration("obstacle-3", "Obstacle")
				.addComponent("ObstacleCollider3")
				.addComponent("ActivateObstancleOnView")
				.setRenderer("ObstacleRender")
				.obstacleCategory();

			this.gameObjectPool.createConfiguration("obstacle-4", "Obstacle")
				.addComponent("ObstacleCollider4")
				.addComponent("ActivateObstancleOnView")
				.setRenderer("ObstacleRender")
				.obstacleCategory();
		},
	});

	var getPolygon = function(vertexes, radius) {
		var result = [];
		var step = (Math.PI * 2) / vertexes;

		for (var i = vertexes-1; i >= 0; i--) {
			var point = {};

			point.x = Math.sin(step*i) * radius; 
			point.y = Math.cos(step*i) * radius;

			result.push(point);
		}

		return result;
	}

	return new Obstacles();
});