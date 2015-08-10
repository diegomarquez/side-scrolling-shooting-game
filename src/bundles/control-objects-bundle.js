define(function(require) {	
	var commonBundle = require("common-bundle");
	var gb = require("gb");

	var ControlObjectsBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createConfiguration("ActivateControlOnView", commonBundle.getActivateOnViewPoolId());

			this.gameObjectPool.createDynamicPool("ScrollStopper", require('scroll-stopper'));
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

			this.gameObjectPool.createConfiguration("ScrollStopper", "ScrollStopper")
				.addComponent("ActivateControlOnView");
			this.gameObjectPool.createConfiguration("BossWarning", "BossWarning")
				.addComponent("ActivateControlOnView");

			this.gameObjectPool.createConfiguration("DirectionRight", "DirectionSetter")
				.args({
					angle: 0
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("DirectionUp", "DirectionSetter")
				.args({
					angle: 270
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("DirectionLeft", "DirectionSetter")
				.args({
					angle: 180
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("DirectionDown", "DirectionSetter")
				.args({
					angle: 90
				})
				.addComponent("ActivateControlOnView");

			this.gameObjectPool.createConfiguration("StartPosition", "StartPosition");

			this.gameObjectPool.createConfiguration("ChooseDirectionRight", "AngleDirectionSetter")
				.args({ 
					angle: 0,
					rotation: 0
				})
				.addComponent("DirectionSetterCollider")
				.addComponent("ActivateControlOnView")
				.setRenderer("AngleDirectionSetterRenderer");

			this.gameObjectPool.createConfiguration("ChooseDirectionUp", "AngleDirectionSetter")
				.args({ 
					angle: 270,
					rotation: 270
				})
				.addComponent("DirectionSetterCollider")
				.addComponent("ActivateControlOnView")
				.setRenderer("AngleDirectionSetterRenderer");

			this.gameObjectPool.createConfiguration("ChooseDirectionLeft", "AngleDirectionSetter")
				.args({ 
					angle: 180,
					rotation: 180
				})
				.addComponent("DirectionSetterCollider")
				.addComponent("ActivateControlOnView")
				.setRenderer("AngleDirectionSetterRenderer");

			this.gameObjectPool.createConfiguration("ChooseDirectionDown", "AngleDirectionSetter")
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