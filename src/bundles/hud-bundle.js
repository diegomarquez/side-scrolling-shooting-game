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
				.setRenderer('HpMeterRenderer');
		},
	});

	return new Hud();
});