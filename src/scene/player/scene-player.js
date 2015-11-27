define(function(require) {
	var gb = require('gb');
	var canvasContainer = require('canvas-container');
	var keyboard = require('keyboard');
	var collisionResolver = require('collision-resolver');

	var ScenePlayer = require("ui-component").extend({
		init: function() {
			this._super();
		},

		pools: function() {
	    	require('common-bundle').create();
	    	require('hud-bundle').create();
	    	require('explosion-bundle').create();
	    	require('explosion-generator-bundle').create();
	    	require('particle-generator-bundle').create();
	    	require('particle-bundle').create();
	    	require('ship-bundle').create();
	    	require('cannon-bundle').create();
	    	require('bullets-bundle').create();
	    	require('obstacle-bundle').create();
	    	require('boss-bundle').create();
	    	require('messages-bundle').create();
	    	require('control-objects-bundle').create();
	    	require('items-bundle').create();
	    	require('laser-effects-bundle').create();
	    	require('mine-bundle').create();
	    	require('generator-bundle').create();
	    	require('enemy-ship-bundle').create();
	    	require('blob-bundle').create();
	    	require('spider-bundle').create();
		},

		setCollisionPairs: function() {
			collisionResolver.addCollisionPair('basicBulletColliderId', 'bossColliderId');
			collisionResolver.addCollisionPair('basicBulletColliderId', 'cannonColliderId');
			collisionResolver.addCollisionPair('basicBulletColliderId', 'laserBulletColliderId');
			collisionResolver.addCollisionPair('basicBulletColliderId', 'missilleColliderId');
			collisionResolver.addCollisionPair('basicBulletColliderId', 'mineColliderId');
			collisionResolver.addCollisionPair('basicBulletColliderId', 'generatorColliderId');
			collisionResolver.addCollisionPair('basicBulletColliderId', 'enemyShipColliderId');
			collisionResolver.addCollisionPair('basicBulletColliderId', 'blobColliderId');
			collisionResolver.addCollisionPair('basicBulletColliderId', 'enemySpiderColliderId');

			collisionResolver.addCollisionPair('obstacleColliderId', 'shipColliderId');
			collisionResolver.addCollisionPair('obstacleColliderId', 'cannonBulletColliderId');
			collisionResolver.addCollisionPair('obstacleColliderId', 'basicBulletColliderId');
			collisionResolver.addCollisionPair('obstacleColliderId', 'laserBulletColliderId');
			collisionResolver.addCollisionPair('obstacleColliderId', 'missilleColliderId');
			collisionResolver.addCollisionPair('obstacleColliderId', 'enemyShipColliderId');

			collisionResolver.addCollisionPair('shipColliderId', 'cannonBulletColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'bossColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'boss3ColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'levelItemColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'laserBulletColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'missilleColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'directionSetterColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'mineColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'generatorColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'enemyShipColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'blobColliderId');
			collisionResolver.addCollisionPair('shipColliderId', 'enemySpiderColliderId');
		},

		removeCollisionPairs: function() {
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'bossColliderId');
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'cannonColliderId');
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'laserBulletColliderId');
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'missilleColliderId');
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'mineColliderId');
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'generatorColliderId');
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'enemyShipColliderId');
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'blobColliderId');
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'enemySpiderColliderId');

			collisionResolver.removeCollisionPair('obstacleColliderId', 'shipColliderId');
			collisionResolver.removeCollisionPair('obstacleColliderId', 'cannonBulletColliderId');
			collisionResolver.removeCollisionPair('obstacleColliderId', 'basicBulletColliderId');
			collisionResolver.removeCollisionPair('obstacleColliderId', 'laserBulletColliderId');
			collisionResolver.removeCollisionPair('obstacleColliderId', 'missilleColliderId');
			collisionResolver.removeCollisionPair('obstacleColliderId', 'enemyShipColliderId');

			collisionResolver.removeCollisionPair('shipColliderId', 'cannonBulletColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'bossColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'boss3ColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'levelItemColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'laserBulletColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'missilleColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'directionSetterColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'mineColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'generatorColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'enemyShipColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'blobColliderId');
			collisionResolver.removeCollisionPair('shipColliderId', 'enemySpiderColliderId');
		},

		container: function() {
		    this.mainContainer = document.getElementById('main-player-container');

		    if (!this.mainContainer) {
		    	this.mainContainer = document.createElement('div');
				this.mainContainer.id = 'main-player-container';
				document.body.appendChild(this.mainContainer);
				canvasContainer.detachCanvas();
				this.mainContainer.appendChild(canvasContainer.getCanvasContainer());	
		    }
		},

		requiredViewports: function() {
			if (!gb.groups.exists("Second")) {
				gb.groups.add("Second");	
			}

			if (!gb.viewports.exists("Messages")) {
				var messagesViewport = gb.viewports.add('Messages', gb.canvas.width, gb.canvas.height);
				messagesViewport.addLayer('Front');
			}
		},

		load: function(sceneData) {
			
		},

		setKeyboardEvents: function() {
			keyboard.onKeyDown(keyboard.ESC, this, escape);
		},

		removeKeyboardEvents: function() {
      		keyboard.removeKeyDown(keyboard.ESC, this, escape);
		},

		setCompleteEvents: function() {
			
		},

		removeCompleteEvents: function() {
			
		},

		create: function(sceneData) {
			this.viewports = [{viewport: 'Main', layer: 'Front'}];

			this.container()
			this.pools();
			this.setCollisionPairs();
			this.load(sceneData);
			this.requiredViewports();
			this.setKeyboardEvents();
			this.setCompleteEvents();
			this.decorateContainer();
		},

		start: function() {
			
		},

		decorateContainer: function() {
			var titleContainer = document.createElement('div');
			var controlsContainer = document.createElement('div');

			titleContainer.id = 'player-title';
			controlsContainer.id = 'player-controls';

			this.mainContainer.appendChild(titleContainer);
			this.mainContainer.appendChild(controlsContainer);

			document.getElementById('player-controls').appendChild(document.createTextNode('ESC to Exit'));
			document.getElementById('player-controls').appendChild(document.createElement('br'));
			document.getElementById('player-controls').appendChild(document.createTextNode('Arrows to Move'));
			document.getElementById('player-controls').appendChild(document.createElement('br'));
			document.getElementById('player-controls').appendChild(document.createTextNode('A to Shoot'));
		},

		removeContainer: function() {			
  
		},

		cleanUp: function() {
			// Remove collisions detection
			this.removeCollisionPairs();
			// Remove listeners to exit the scene
			this.removeCompleteEvents()
			this.removeKeyboardEvents();
			// Remove the canvas container from the DOM 
			this.removeContainer();
			// Kill any tweens that are still running when the scene player is being destroyed
			TimelineLite.exportRoot().kill();
			// Clear as much references as posible
			this._super();
		}
	});

	var escape = function() {
		this.execute(this.ESCAPE);
	}

	Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });
	Object.defineProperty(ScenePlayer.prototype, "FAILURE", { get: function() { return 'exit'; } });
	Object.defineProperty(ScenePlayer.prototype, "ESCAPE", { get: function() { return 'escape'; } });

	return new ScenePlayer();
})