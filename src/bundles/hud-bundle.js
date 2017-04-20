define(function(require) {
	var commonBundle = require('common-bundle');
	var gb = require('gb');

	var Hud = require("bundle").extend({
		create: function(args) {
			this.gameObjectPool.createDynamicPool('HpMeterType', require('hp-meter'));

			this.componentPool.createConfiguration("HpMeterRenderer", commonBundle.getAnimationsBitmapRendererPoolId())
				.args({
					startingLabel: '5Hp',

					frameWidth: 256,
					frameHeight: 64,
					frameDelay: 1,
					frameCount: 6,
					path: gb.assetMap()["HPMETER.PNG"],

					labels: {
						'0Hp': {
							loop: false,
							frames: [0]
						},
						'1Hp': {
							loop: false,
							frames: [1]
						},
						'2Hp': {
							loop: false,
							frames: [2]
						},
						'3Hp': {
							loop: false,
							frames: [3]
						},
						'4Hp': {
							loop: false,
							frames: [4]
						},
						'5Hp': {
							loop: false,
							frames: [5]
						}
					}
				});

			this.gameObjectPool.createConfiguration('HpMeter', 'HpMeterType')
				.addComponent('LowHpColorBlink', { enabled: false, interval: 30 })
				.setRenderer('HpMeterRenderer');

			this.componentPool.createPool("UpwardsMovement", require('upwards-movement'));
			this.componentPool.createPool("ClaimOnDelegate", require('claim-on-delegate'));

			this.componentPool.createConfiguration("UpwardsMovement", "UpwardsMovement")
				.args({
					endX: 0,
					endY: -100,
					time: 1.5
				});

			this.componentPool.createConfiguration("ClaimOnDelegate", "ClaimOnDelegate")
				.args({
					delegateName: 'finish-upward-movement'
				});

			this.componentPool.createConfiguration("TextRenderer", commonBundle.getTextRendererPoolId());
			
			this.gameObjectPool.createConfiguration("PowerDown", commonBundle.getGameObjectPoolId())
				.addComponent('UpwardsMovement')
				.addComponent('ClaimOnDelegate')
				.setRenderer("TextRenderer", {
					name: 'power-down',
					text: 'POWER DOWN',
					fillColor: "#000000",
					strokeColor: "#FFFFFF",
					font: 'CGFLocustResistance',
					padding: 3,
					size: 20,
					offset: 'center',
					lineWidth: 1
				});

			this.gameObjectPool.createConfiguration("SpeedDown", commonBundle.getGameObjectPoolId())
				.addComponent('UpwardsMovement')
				.addComponent('ClaimOnDelegate')
				.setRenderer("TextRenderer", {
					name: 'speed-down',
					text: 'SPEED DOWN',
					fillColor: "#000000",
					strokeColor: "#FFFFFF",
					font: 'CGFLocustResistance',
					padding: 3,
					size: 20,
					offset: 'center',
					lineWidth: 1
				});

			this.gameObjectPool.createConfiguration("HpDown", commonBundle.getGameObjectPoolId())
				.addComponent('UpwardsMovement')
				.addComponent('ClaimOnDelegate')
				.setRenderer("TextRenderer", {
					name: 'hp-down',
					text: 'HP DOWN',
					fillColor: "#000000",
					strokeColor: "#FFFFFF",
					font: 'CGFLocustResistance',
					padding: 3,
					size: 20,
					offset: 'center',
					lineWidth: 1
				});

			this.gameObjectPool.createConfiguration("PowerUp", commonBundle.getGameObjectPoolId())
				.addComponent('UpwardsMovement')
				.addComponent('ClaimOnDelegate')
				.setRenderer("TextRenderer", {
					name: 'power-up',
					text: 'POWER UP',
					fillColor: "#000000",
					strokeColor: "#FFFFFF",
					font: 'CGFLocustResistance',
					padding: 3,
					size: 20,
					offset: 'center',
					lineWidth: 1
				});

			this.gameObjectPool.createConfiguration("SpeedUp", commonBundle.getGameObjectPoolId())
				.addComponent('UpwardsMovement')
				.addComponent('ClaimOnDelegate')
				.setRenderer("TextRenderer", {
					name: 'speed-up',
					text: 'SPEED UP',
					fillColor: "#000000",
					strokeColor: "#FFFFFF",
					font: 'CGFLocustResistance',
					padding: 3,
					size: 20,
					offset: 'center',
					lineWidth: 1
				});

			this.gameObjectPool.createConfiguration("HpUp", commonBundle.getGameObjectPoolId())
				.addComponent('UpwardsMovement')
				.addComponent('ClaimOnDelegate')
				.setRenderer("TextRenderer", {
					name: 'hp-up',
					text: 'HP UP',
					fillColor: "#000000",
					strokeColor: "#FFFFFF",
					font: 'CGFLocustResistance',
					padding: 3,
					size: 20,
					offset: 'center',
					lineWidth: 1
				});
		},
	});

	return new Hud();
});