define(function(require) {	
	
	var commonBundle = require("common-bundle");
	var particleBundle = require('particle-generator-bundle');

	var AddComponentsBundle = require("bundle").extend({
		create: function(args) {			
			
			this.componentPool.createConfiguration("BossTwitch", commonBundle.getTwitchPoolId());

			this.componentPool.createConfiguration("AddBoss_1_OnDestroyParticles_1", commonBundle.getAddComponentPoolId())
				.args({
					componentId: particleBundle.getBoss_1_DestroyParticlesGenerator_1_Id(),
					parentEvent: 'stop_creation',
					executeOnce: true,
					componentArgs: null
				});

			this.componentPool.createConfiguration("AddBoss_1_OnDestroyParticles_2", commonBundle.getAddComponentPoolId())
				.args({
					componentId: particleBundle.getBoss_1_DestroyParticlesGenerator_2_Id(),
					parentEvent: 'stop_creation',
					executeOnce: true,
					componentArgs: null
				});

			this.componentPool.createConfiguration("AddBoss_1_OnDestroyParticles_3", commonBundle.getAddComponentPoolId())
				.args({
					componentId: particleBundle.getBoss_1_DestroyParticlesGenerator_3_Id(),
					parentEvent: 'stop_creation',
					executeOnce: true,
					componentArgs: null
				});

			this.componentPool.createConfiguration("AddBoss_2_OnDestroyParticles_1", commonBundle.getAddComponentPoolId())
				.args({
					componentId: particleBundle.getBoss_2_DestroyParticlesGenerator_1_Id(),
					parentEvent: 'stop_creation',
					executeOnce: true,
					componentArgs: null
				});

			this.componentPool.createConfiguration("AddBoss_2_OnDestroyParticles_2", commonBundle.getAddComponentPoolId())
				.args({
					componentId: particleBundle.getBoss_2_DestroyParticlesGenerator_2_Id(),
					parentEvent: 'stop_creation',
					executeOnce: true,
					componentArgs: null
				});

			this.componentPool.createConfiguration("AddBoss_3_OnDestroyParticles_1", commonBundle.getAddComponentPoolId())
				.args({
					componentId: particleBundle.getBoss_3_DestroyParticlesGenerator_1_Id(),
					parentEvent: 'stop_creation',
					executeOnce: true,
					componentArgs: null
				});

			this.componentPool.createConfiguration("AddBoss_3_OnDestroyParticles_2", commonBundle.getAddComponentPoolId())
				.args({
					componentId: particleBundle.getBoss_3_DestroyParticlesGenerator_2_Id(),
					parentEvent: 'stop_creation',
					executeOnce: true,
					componentArgs: null
				});

			this.componentPool.createConfiguration("AddBoss_4_OnDestroyParticles_1", commonBundle.getAddComponentPoolId())
				.args({
					componentId: particleBundle.getBoss_4_DestroyParticlesGenerator_1_Id(),
					parentEvent: 'stop_creation',
					executeOnce: true,
					componentArgs: null
				});

			this.componentPool.createConfiguration("AddBossTwitchOnDestroy", commonBundle.getAddComponentPoolId())
				.args({
					componentId: 'BossTwitch',
					parentEvent: 'destroyed',
					executeOnce: true,
					componentArgs: {
						amount: 5
					}
				});

			this.componentPool.createConfiguration("BulletHitFlash", commonBundle.getDamageFlashPoolId());

			this.componentPool.createConfiguration("AddBulletHitFlash", commonBundle.getAddComponentPoolId())
				.args({
					componentId: 'BulletHitFlash',
					parentEvent: 'hit',
					executeOnce: false,
					componentArgs: {
						flashTime: 20
					}
				});

			this.componentPool.createConfiguration("AddPlayerHitFlash", commonBundle.getAddComponentPoolId())
				.args({
					componentId: 'BulletHitFlash',
					parentEvent: 'damage',
					executeOnce: false,
					componentArgs: {
						flashTime: 200
					}
				});

			this.componentPool.createConfiguration("RestartLastBGM", commonBundle.getAddGameObjectPoolId())
				.args({
					goId: 'bgm-last',
					parentEvent: 'all-bosses-destroyed',
					group: "First",
					viewports: [{viewport: 'Main', layer: 'Front'}],
					executeOnce: false
				});

			this.componentPool.createConfiguration("StopCurrentBGM", commonBundle.getAddGameObjectPoolId())
				.args({
					goId: 'bgm-stop-current',
					parentEvent: 'last-boss-destroyed',
					group: "First",
					viewports: [{viewport: 'Main', layer: 'Front'}],
					executeOnce: false
				});

			this.componentPool.createConfiguration("StopCurrentAndRestartLastBGM", commonBundle.getAddGameObjectPoolId())
				.args({
					goId: 'bgm-last',
					parentEvent: 'boss-stop',
					group: "First",
					viewports: [{viewport: 'Main', layer: 'Front'}],
					executeOnce: false
				});

			this.componentPool.createConfiguration("PlayerStopCurrentBGM", commonBundle.getAddGameObjectPoolId())
				.args({
					goId: 'bgm-stop-current',
					parentEvent: 'no_control',
					group: "First",
					viewports: [{viewport: 'Main', layer: 'Front'}],
					executeOnce: false
				});

			this.componentPool.createConfiguration("LevelItemStopCurrentBGM", commonBundle.getAddGameObjectPoolId())
				.args({
					goId: 'bgm-stop-current',
					parentEvent: 'pick-up',
					group: "First",
					viewports: [{viewport: 'Main', layer: 'Front'}],
					executeOnce: false
				});
		}
	});

	return new AddComponentsBundle();
});