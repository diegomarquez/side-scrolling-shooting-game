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

			this.gameObjectPool.createConfiguration("scroll-stopper", "ScrollStopper")
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("absolute-scroll-stopper", "AbsoluteScrollStopper")
				.addComponent("AutoHide")
				.addComponent("ActivateControlOnView")
				.setRenderer("AbsoluteScrollStopperRenderer");
				
			this.gameObjectPool.createConfiguration("boss-warning", "BossWarning")
				.addComponent("ActivateControlOnView");

			this.gameObjectPool.createConfiguration("direction-right", "DirectionSetter")
				.args({
					angle: 0
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("direction-up", "DirectionSetter")
				.args({
					angle: 270
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("direction-left", "DirectionSetter")
				.args({
					angle: 180
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("direction-down", "DirectionSetter")
				.args({
					angle: 90
				})
				.addComponent("ActivateControlOnView");

			this.gameObjectPool.createConfiguration("start-position", "StartPosition");

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

		}
	});

	return new ControlObjectsBundle();
});