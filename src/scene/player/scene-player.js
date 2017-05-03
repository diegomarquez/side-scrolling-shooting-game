define(function(require) {
	var gb = require('gb');
	var canvasContainer = require('canvas-container');
	var keyboard = require('keyboard');
	var collisionResolver = require('collision-resolver');
	var util = require('util');
	var soundPlayer = require('sound-player');
	var assetPreloader = require('asset-preloader');
	var editorConfig = require('editor-config');

	var ScenePlayer = require("ui-component").extend({
		init: function() {
			this._super();

			this.blockEscape = true;
		},

		pools: function() {
			require('common-bundle').create();
			require('sound-bundle').create();
			require('add-components-bundle').create();
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
			collisionResolver.addCollisionPair('shipColliderId', 'webBulletColliderId');
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
			collisionResolver.removeCollisionPair('shipColliderId', 'webBulletColliderId');
		},

		container: function() {
			this.mainContainer = document.getElementById('main-player-container');

			if (!this.mainContainer) {
				this.mainContainer = document.createElement('div');
				this.mainContainer.id = 'main-player-container';
				document.body.appendChild(this.mainContainer);
			}

			canvasContainer.detachCanvas();
			this.mainContainer.appendChild(canvasContainer.getCanvasContainer());
		},

		requiredViewports: function() {
			if (!gb.groups.exists("Second")) {
				gb.groups.add("Second");
			}

			if (!gb.viewports.exists("Messages")) {
				var messagesViewport = gb.viewports.add('Messages', gb.canvas.width, gb.canvas.height);
				messagesViewport.addLayer('Front');
			}

			var mainViewport = gb.viewports.get("Main");

			if (!mainViewport.layerExists("Effects"))
				mainViewport.addLayer("Effects");
		},

		load: function(sceneData) {

		},

		setKeyboardEvents: function() {
			keyboard.onKeyDown(keyboard.ESC, this, this.escape);
		},

		removeKeyboardEvents: function() {
			keyboard.removeKeyDown(keyboard.ESC, this, this.escape);
		},

		escape: function() {

			if (this.blockEscape)
				return;

			this.blockEscape = true;

			this.execute(this.ESCAPE);
		},

		enableEscape: function() {
			this.blockEscape = false;
		},

		setCompleteEvents: function() {

		},

		removeCompleteEvents: function() {

		},

		create: function(sceneData) {
			this.viewports = [{viewport: 'Main', layer: 'Front'}];

			this.blockEscape = true;

			this.container()
			this.pools();
			this.preloadAssets(sceneData);
			this.setCollisionPairs();
			this.load(sceneData);
			this.requiredViewports();
			this.setKeyboardEvents();
			this.setCompleteEvents();
			this.decorateContainer(sceneData);

			assetPreloader.once(assetPreloader.ON_LOAD_ALL_COMPLETE, this, function() {
				this.execute(this.CREATION_COMPLETE);
			});

			assetPreloader.loadAll();

			soundPlayer.playLoop('INTRO');
		},

		getSceneLoader: function() {

		},

		preloadAssets: function(sceneData) {
			function isAssetUrl(url) {
				var pattern = /^assets[\/|\\].*?[\/|\\].*?\?b=.*?$/;

				if(!pattern.test(url)) {
					return false;
				} else {
					return true;
				}
			}

			function inspectStringArgument(string) {
				if (!util.isString(string))
					return;
				
				// Does it look like a URL?
				if (isAssetUrl(string)) {
					if (urls.indexOf(string) === -1) {
						urls.push(string);
					}
				}

				// Is it a Configuration ID for a game object?
				if (gb.goPool.configurationExists(string)) {
					if (configurationsUsed.indexOf(string) === -1) {
						configurationsUsed.push(string);
					}
				}

				// Is it a configuration ID for a component?
				if (gb.coPool.configurationExists(string)) {
					if (configurationsUsed.indexOf(string) === -1) {
						configurationsUsed.push(string);
					}
				}

				if (soundPlayer.hasId(string)) {
					var soundResourceUrl = soundPlayer.getResourcePath(string);

					if (urls.indexOf(soundResourceUrl) === -1) {
						urls.push(soundResourceUrl);
					}
				}
			}
			
			function inspectObjectArgument(object) {
				if (!util.isObject(object))
					return;
				
				inspectArguments(object);
			}
			
			function inspectArrayArgument(array) {
				if (!util.isArray(array))
					return;
				
				inspectArguments(array);
			}

			function inspectArguments(args) {
				for (var k in args) {
					var arg = args[k];
					
					// Inspect strings looking for paths and configuration ids
					inspectStringArgument(arg);
					
					// Inspect object recusively looking for string arguments
					inspectObjectArgument(arg);
					
					// Inspect arrays recursively looking for string arguments
					inspectArrayArgument(arg);
				}
			}

			function inspectComponent(componentId) {
				if (!gb.coPool.configurationExists(componentId))
					return;

				// Check the arguments of the renderer component
				inspectArguments(gb.coPool.getConfigurationObject(componentId).componentArgs);
			}

			var configurationsUsed = this.getSceneLoader().getConfigurationsUsedInScene(sceneData);
			var inspectedConfigurations = [];

			var urls = [];

			for (var i = 0; i < configurationsUsed.length; i++) {
				var configurationId = configurationsUsed[i];

				// Skip configuration which have already been inspected
				if (inspectedConfigurations.indexOf(configurationId) !== -1)
					continue;

				inspectedConfigurations.push(configurationId);

				// Filter out non inspectable objects
				if (editorConfig.isNonInspectableGameObject(configurationId))
					continue;

				var isGameObject = false;
				var isComponent = false;

				var configuration = null;

				if (gb.goPool.configurationExists(configurationId)) {
					isGameObject = true;
					configuration = gb.goPool.getConfigurationObject(configurationId);
				}

				if (gb.coPool.configurationExists(configurationId)) {
					isComponent = true;
					configuration = gb.coPool.getConfigurationObject(configurationId);
				}

				if (isGameObject) {
					// Check the arguments of this configuration
					inspectArguments(configuration.hardArguments);

					// Check the children, and query the game object pool to look at the hard arguments
					if (configuration.childs) {
						for (var j = 0; j < configuration.childs.length; j++) {
							var childId = configuration.childs[j].childId;

							// Check the argument of the configured child
							inspectArguments(configuration.childs[j].args);

							// Add the child to the check list
							if (configurationsUsed.indexOf(childId) === -1) {
								configurationsUsed.push(childId);
							}
						}
					}

					// Check the components, and query the component pool to look at hard arguments
					if (configuration.components) {
						for (var j = 0; j < configuration.components.length; j++) {
							// Check the argument of the configured component
							inspectArguments(configuration.components[j].args);
							// Check the arguments of the component
							inspectComponent(configuration.components[j].componentId);
						}
					}

					if (configuration.renderer) {
						// Check the arguments of the configured renderer
						inspectArguments(configuration.renderer.args);
						// Check the arguments of the renderer component
						inspectComponent(configuration.renderer.componentId);
					}
				}

				if (isComponent) {
					// Check the arguments of the configured component
					inspectArguments(configuration.componentArgs);
					// Check the arguments of the component
					inspectComponent(configuration.componentId);
				}
			}

			for (var i = 0; i < urls.length; i++) {
				var url = urls[i];

				assetPreloader.addAsset(url);
			}
		},

		start: function() {

		},

		decorateContainer: function(sceneData) {
			var titleContainer = document.createElement('div');
			var controlsContainer = document.createElement('div');

			titleContainer.id = 'player-title';
			controlsContainer.id = 'player-controls';

			this.mainContainer.appendChild(titleContainer);
			this.mainContainer.appendChild(controlsContainer);

			let controls = document.getElementById('player-controls');

			this.addText(controls, '"← ↑ → ↓"');
			this.addText(controls, ' to Move');
			controls.appendChild(document.createElement('br'));
			this.addText(controls, '"A"');
			this.addText(controls, ' to Shoot');
			controls.appendChild(document.createElement('br'));
			this.addText(controls, '"ESC"');
			this.addText(controls, ' to Exit');

			var name;

			if (util.isString(sceneData)) {
				name = JSON.parse(sceneData)['name'];
			}
			else if (util.isObject(sceneData)) {
				name = sceneData['name'];
			}

			if (name === '!@<share>@!') {
				name = 'Space Maze';
			}
			else {
				name = 'Space Maze: ' + name;
			}

			document.getElementById('player-title').appendChild(document.createTextNode(name));
		},

		addText: function(parent, text) {
			var child = document.createElement('span');

			child.textContent = text;

			parent.appendChild(child);
		},

		removeContainer: function() {

		},

		cleanUp: function() {
			var title = document.getElementById('player-title');
			var controls = document.getElementById('player-controls');

			if (title) {
				title.parentNode.removeChild(title);
			}

			if (controls) {
				controls.parentNode.removeChild(controls);
			}
			
			soundPlayer.enableNewPlayback();
			soundPlayer.stopAll().now();
			require("bgm-sound").clearLastBGMId();

			// Remove collisions detection
			this.removeCollisionPairs();
			// Remove listeners to exit the scene
			this.removeCompleteEvents();
			this.removeKeyboardEvents();
			// Remove the canvas container from the DOM
			this.removeContainer();
			// Kill any tweens that are still running when the scene player is being destroyed
			TimelineLite.exportRoot().kill();
			// Clear as much references as posible
			this._super();
		}
	});

	Object.defineProperty(ScenePlayer.prototype, "EXIT", { get: function() { return 'exit'; } });
	Object.defineProperty(ScenePlayer.prototype, "FAILURE", { get: function() { return 'failure'; } });
	Object.defineProperty(ScenePlayer.prototype, "ESCAPE", { get: function() { return 'escape'; } });
	Object.defineProperty(ScenePlayer.prototype, "CREATION_COMPLETE", { get: function() { return 'creation_complete'; } });

	return new ScenePlayer();
})