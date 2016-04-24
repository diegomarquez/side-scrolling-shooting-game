define(function(require) {	
	var commonBundle = require("common-bundle");
	var gb = require("gb");

	var ControlObjectsBundle = require("bundle").extend({
		create: function(args) {	
				
			this.componentPool.createPool("AutoHide", require('auto-hide'));
			this.componentPool.createConfiguration("AutoHide", "AutoHide");

			this.componentPool.createConfiguration("ActivateControlOnView", commonBundle.getActivateOnViewPoolId());

			this.gameObjectPool.createDynamicPool("ScrollStopper", require('scroll-stopper'));
			this.gameObjectPool.createDynamicPool("AbsoluteScrollStopper", require('absolute-scroll-stopper'));
			this.gameObjectPool.createDynamicPool("BossWarning", require('boss-warning'));
			this.gameObjectPool.createDynamicPool("DirectionSetter", require('direction-setter'));
			this.gameObjectPool.createDynamicPool("StartPosition", require('start-position'));			
			this.gameObjectPool.createDynamicPool("AngleDirectionSetter", require('angle-direction-setter'));

			this.gameObjectPool.createDynamicPool("TwoWayDirectionSetter", require('two-way-direction-setter'));
			this.gameObjectPool.createDynamicPool("BGMSound", require('bgm-sound'));

			this.componentPool.createConfiguration("DirectionSetterCollider", commonBundle.getCircleColliderPoolId())
				.args({ 
					id:'directionSetterColliderId',
					radius:10
				});

			this.componentPool.createConfiguration("AngleDirectionSetterRenderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					loop: true,
					frameWidth: 32,
					frameHeight: 32,
					frameDelay: 1,
					path: gb.assetMap()["ANIMATEDARROW.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("AbsoluteScrollStopperRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["STOP.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("TwoWayDirectionSetterRenderer1", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["DOWNLEFTARROW.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("TwoWayDirectionSetterRenderer2", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["DOWNRIGHTARROW.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("TwoWayDirectionSetterRenderer3", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["UPLEFTARROW.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("TwoWayDirectionSetterRenderer4", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["UPRIGHTARROW.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("SoundPlayerRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["SOUND.PNG"],
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("scroll-stopper", "ScrollStopper")
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("absolute-scroll-stopper", "AbsoluteScrollStopper")
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("AbsoluteScrollStopperRenderer");
				
			this.gameObjectPool.createConfiguration("boss-warning", "BossWarning")
				.addComponent("ActivateControlOnView")
				.addComponent("WarningSound")

			this.gameObjectPool.createConfiguration("direction-right", "DirectionSetter")
				.args({
					angle: 0,
					type: 'decrease',
					amount: 200,
					cap: 200
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("direction-up", "DirectionSetter")
				.args({
					angle: 270,
					type: 'decrease',
					amount: 200,
					cap: 200
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("direction-left", "DirectionSetter")
				.args({
					angle: 180,
					type: 'decrease',
					amount: 200,
					cap: 200
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("direction-down", "DirectionSetter")
				.args({
					angle: 90,
					type: 'decrease',
					amount: 200,
					cap: 200
				})
				.addComponent("ActivateControlOnView");

			this.gameObjectPool.createConfiguration("fast-direction-right", "DirectionSetter")
				.args({
					angle: 0,
					type: 'increase',
					amount: 200,
					cap: 2000

				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("fast-direction-up", "DirectionSetter")
				.args({
					angle: 270,
					type: 'increase',
					amount: 200,
					cap: 2000
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("fast-direction-left", "DirectionSetter")
				.args({
					angle: 180,
					type: 'increase',
					amount: 200,
					cap: 2000
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("fast-direction-down", "DirectionSetter")
				.args({
					angle: 90,
					type: 'increase',
					amount: 200,
					cap: 2000
				})
				.addComponent("ActivateControlOnView");

			this.gameObjectPool.createConfiguration("direction-down-left", "TwoWayDirectionSetter")
				.args({
					type: 'down-left'
				})
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("TwoWayDirectionSetterRenderer1");
			
			this.gameObjectPool.createConfiguration("direction-down-right", "TwoWayDirectionSetter")
				.args({
					type: 'down-right'
				})
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("TwoWayDirectionSetterRenderer2");
			
			this.gameObjectPool.createConfiguration("direction-up-left", "TwoWayDirectionSetter")
				.args({
					type: 'up-left'
				})
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("TwoWayDirectionSetterRenderer3");
			
			this.gameObjectPool.createConfiguration("direction-up-right", "TwoWayDirectionSetter")
				.args({
					type: 'up-right'
				})
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("TwoWayDirectionSetterRenderer4");

			
			this.gameObjectPool.createConfiguration("start-position-right", "StartPosition")
				.args({
					type: "right"
				});
			this.gameObjectPool.createConfiguration("start-position-left", "StartPosition")
				.args({
					type: "left"
				});
			this.gameObjectPool.createConfiguration("start-position-up", "StartPosition")
				.args({
					type: "up"
				});
			this.gameObjectPool.createConfiguration("start-position-down", "StartPosition")
				.args({
					type: "down"
				});

			this.gameObjectPool.createConfiguration("choose-direction-right", "AngleDirectionSetter")
				.args({ 
					angle: 0,
					rotation: 0
				})
				.addComponent("DirectionSetterCollider")
				.addComponent("ActivateControlOnView")
				.setRenderer("AngleDirectionSetterRenderer");

			this.gameObjectPool.createConfiguration("choose-direction-up", "AngleDirectionSetter")
				.args({ 
					angle: 270,
					rotation: 270
				})
				.addComponent("DirectionSetterCollider")
				.addComponent("ActivateControlOnView")
				.setRenderer("AngleDirectionSetterRenderer");

			this.gameObjectPool.createConfiguration("choose-direction-left", "AngleDirectionSetter")
				.args({ 
					angle: 180,
					rotation: 180
				})
				.addComponent("DirectionSetterCollider")
				.addComponent("ActivateControlOnView")
				.setRenderer("AngleDirectionSetterRenderer");

			this.gameObjectPool.createConfiguration("choose-direction-down", "AngleDirectionSetter")
				.args({ 
					angle: 90,
					rotation: 90
				})
				.addComponent("DirectionSetterCollider")
				.addComponent("ActivateControlOnView")
				.setRenderer("AngleDirectionSetterRenderer");

			this.gameObjectPool.createConfiguration("bgm-1", "BGMSound")
				.args({
					soundId: 'LEVEL_1'
				})
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("SoundPlayerRenderer");

			this.gameObjectPool.createConfiguration("bgm-2", "BGMSound")
				.args({
					soundId: 'LEVEL_2'
				})
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("SoundPlayerRenderer");

			this.gameObjectPool.createConfiguration("bgm-3", "BGMSound")
				.args({
					soundId: 'LEVEL_3'
				})
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("SoundPlayerRenderer");

			this.gameObjectPool.createConfiguration("bgm-4", "BGMSound")
				.args({
					soundId: 'LEVEL_4'
				})
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("SoundPlayerRenderer");

			this.gameObjectPool.createConfiguration("bgm-boss", "BGMSound")
				.args({
					soundId: 'BOSS',
					storeLast: false,
					inmediateRecycle: true
				});

			this.gameObjectPool.createConfiguration("bgm-last", "BGMSound")
				.args({
					playLast: true,
					inmediateRecycle: true
				});

			this.gameObjectPool.createConfiguration("bgm-stop-current", "BGMSound")
				.args({
					stopCurrent: true,
					inmediateRecycle: true
				});
		}
	});

	return new ControlObjectsBundle();
});