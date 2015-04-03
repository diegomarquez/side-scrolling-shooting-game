define(function(require) {
	var canvasContainer = require('canvas-container');
	var keyboard = require('keyboard');
	var collisionResolver = require('collision-resolver');

	require('timelinelite');

	var ScenePlayer = require("ui-component").extend({
		init: function() {
			this._super();
		},

		pools: function() {
    	require('common-bundle').create();
    	require('particles-bundle').create();
    	require('ship-bundle').create();
    	require('cannon-bundle').create();
    	require('bullets-bundle').create();
    	require('obstacle-bundle').create();
    	require('boss-bundle').create();
    	require('messages-bundle').create();
    	require('control-objects-bundle').create();
    	require('items-bundle').create(); 
		},

		setCollisionPairs: function() {
			collisionResolver.addCollisionPair('basicBulletColliderId', 'bossColliderId');
	    collisionResolver.addCollisionPair('basicBulletColliderId', 'cannonColliderId');
	    
	    collisionResolver.addCollisionPair('obstacleColliderId', 'shipColliderId');
	    collisionResolver.addCollisionPair('obstacleColliderId', 'cannonBulletColliderId');
	    collisionResolver.addCollisionPair('obstacleColliderId', 'basicBulletColliderId');
	    
	    collisionResolver.addCollisionPair('shipColliderId', 'cannonBulletColliderId');
	    collisionResolver.addCollisionPair('shipColliderId', 'levelItemColliderId');
		},

		removeCollisionPairs: function() {
			collisionResolver.removeCollisionPair('basicBulletColliderId', 'bossColliderId');
	    collisionResolver.removeCollisionPair('basicBulletColliderId', 'cannonColliderId');
	    
	    collisionResolver.removeCollisionPair('obstacleColliderId', 'shipColliderId');
	    collisionResolver.removeCollisionPair('obstacleColliderId', 'cannonBulletColliderId');
	    collisionResolver.removeCollisionPair('obstacleColliderId', 'basicBulletColliderId');
	    
	    collisionResolver.removeCollisionPair('shipColliderId', 'cannonBulletColliderId');
	    collisionResolver.removeCollisionPair('shipColliderId', 'levelItemColliderId');
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
			this.setKeyboardEvents();
			this.setCompleteEvents();
			this.decorateContainer();
		},

		start: function() {
			
		},

		decorateContainer: function() {
			var titleContainer = document.createElement('div');
			var controlsContainer = document.createElement('div');
			var captionContainer = document.createElement('div');

			titleContainer.id = 'player-title';
			controlsContainer.id = 'player-controls';
			captionContainer.id = 'player-caption';

			this.mainContainer.appendChild(titleContainer);
			this.mainContainer.appendChild(controlsContainer);
			this.mainContainer.appendChild(captionContainer);
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
	Object.defineProperty(ScenePlayer.prototype, "ESCAPE", { get: function() { return 'escape'; } });

	return new ScenePlayer();
})