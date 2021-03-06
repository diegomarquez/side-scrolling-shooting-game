define(function(require) {	
	var gb = require('gb');
	var commonBundle = require('common-bundle');
	var draw = require('draw');

	var Particles = require("bundle").extend({
		create: function(args) {						
			this.componentPool.createPool('movement-angle', require('movement-angle'));
			this.componentPool.createPool('angle-modifier', require('angle-modifier'));
			this.componentPool.createPool('rotate', require('rotate'));
			this.componentPool.createPool('cosine-angle-modifier', require('cosine-angle-modifier'));
			this.componentPool.createPool('straight-line-movement-angle', require('straight-line-movement-angle'));
			this.componentPool.createPool('straight-line-movement-vector', require('straight-line-movement-vector'));
			this.componentPool.createPool('claim-on-life-depleted', require('claim-on-life-depleted'));
			this.componentPool.createPool('claim-on-out-screen-bounds', require('claim-on-out-screen-bounds'));
			this.componentPool.createPool('check-out-of-bounds', require('check-out-of-bounds'));

			this.componentPool.createConfiguration("WhiteSquareParticle", commonBundle.getPathRendererPoolId())
				.args({
					name: 'white-square-particle',
					width: 2,
					height: 2,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#FFFFFF', 1)
					}
				});

			this.componentPool.createConfiguration("SmokeSquareParticle_1", commonBundle.getPathRendererPoolId())
				.args({
					name: 'smoke-square-particle-1',
					width: 3,
					height: 3,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#FFFFFF', 1)
					}
				});

			this.componentPool.createConfiguration("SmokeSquareParticle_2", commonBundle.getPathRendererPoolId())
				.args({
					name: 'smoke-square-particle-2',
					width: 5,
					height: 5,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#FFFFFF', 1)
					}
				});

			this.componentPool.createConfiguration("YellowSquareParticle", commonBundle.getPathRendererPoolId())
				.args({
					name: 'yellow-square-particle',
					width: 4,
					height: 4,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#FFFFFF', 1)
					}
				});

			this.componentPool.createConfiguration("Boss_1_DestroyParticleRenderer_1", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS1CABLEDAMAGED.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("Boss_1_DestroyParticleRenderer_2", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS1CHUNK1.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("Boss_1_DestroyParticleRenderer_3", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS1CHUNK2.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("Boss_2_DestroyParticleRenderer_1", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS2CHUNK1.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("Boss_2_DestroyParticleRenderer_2", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS2CHUNK2.PNG"],
					offset: 'center'
				});

			this.componentPool.createPool('Boss_3_DestroyParticleRenderer', require('boss-3-body-renderer'));
			
			this.componentPool.createConfiguration('Boss_3_DestroyParticleRenderer_1', 'Boss_3_DestroyParticleRenderer')
				.args({
					name: 'Boss_3_DestroyParticle_1',
					width: 50,
					height: 50,
					largeAnchor: 10,
					largeAnchorMultiplier: 10,
					pointOffsetMultiplier: 3,
					horizontalCounterMultiplier: 15,
					offset1: 20,
					offset2: 25,
					lineWidth: 2
				});

			this.componentPool.createConfiguration('Boss_3_DestroyParticleRenderer_2', 'Boss_3_DestroyParticleRenderer')
				.args({
					name: 'Boss_3_DestroyParticle_2',
					width: 25,
					height: 25,
					largeAnchor: 5,
					largeAnchorMultiplier: 5,
					pointOffsetMultiplier: 2,
					horizontalCounterMultiplier: 10,
					offset1: 10,
					offset2: 12,
					lineWidth: 1
				});

			this.componentPool.createConfiguration("Boss_4_DestroyParticleRenderer_1", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS4CHUNK1.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("Boss_4_DestroyParticleRenderer_2", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS4CHUNK2.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("Boss_4_DestroyParticleRenderer_3", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS4CHUNK3.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("Boss_4_DestroyParticleRenderer_4", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS4CHUNK4.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("MovementAngle", 'movement-angle');
			this.componentPool.createConfiguration("AngleModifier", 'angle-modifier');
			this.componentPool.createConfiguration("Rotate", 'rotate');
			this.componentPool.createConfiguration("CosineAngleModifier", 'cosine-angle-modifier');
			this.componentPool.createConfiguration("StraightMovementAngle", 'straight-line-movement-angle');
			this.componentPool.createConfiguration("StraightMovementVectorReverse", 'straight-line-movement-vector')
				.args({
					direction: -1
				});
			this.componentPool.createConfiguration("ClaimOnLifeDepleted", 'claim-on-life-depleted');
			this.componentPool.createConfiguration("CheckOutOfBounds", 'check-out-of-bounds');
			this.componentPool.createConfiguration("ClaimOnOutOfScreenBounds", 'claim-on-out-screen-bounds');
			
			this.gameObjectPool.createDynamicPool('particle', require('particle'))			

			this.gameObjectPool.createConfiguration("StraightParticle_1", 'particle')
				.args({ 
					speedRange: { min: 15, max: 15 },
					angleRange: { min: 180, max: 180 },
					lifeRange: { min: 0.3, max: 0.8 }
				})
				.addComponent("StraightMovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("WhiteSquareParticle");

			this.gameObjectPool.createConfiguration("StraightParticle_2", 'particle')
				.args({ 
					speedRange: { min: 250, max: 250 },
					spreadRange: { min: -20, max: 20 },
					lifeRange: { min: 30, max: 60 }
				})
				.addComponent("StraightMovementVectorReverse")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("WhiteSquareParticle");

			this.gameObjectPool.createConfiguration("StraightParticle_3", 'particle')
				.args({ 
					speedRange: { min: 150, max: 200 },
					spreadRange: { min: -45, max: 45 },
					lifeRange: { min: 20, max: 50 }
				})
				.addComponent("StraightMovementVectorReverse")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("WhiteSquareParticle");

			this.gameObjectPool.createConfiguration("ArchingParticle_1", 'particle')
				.args({ 
					angleRange: { min: -135, max: -135 },
					speedRange: { min: 150, max:250 },
					spreadRange: { min: -10, max: 10 },
					lifeRange: { min: 40, max: 50 }
				})
				.addComponent("AngleModifier", {
					step: -5 * (Math.PI/180)
				})
				.addComponent("MovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("YellowSquareParticle");

			this.gameObjectPool.createConfiguration("ArchingParticle_2", 'particle')
				.args({ 
					angleRange: { min: -45, max: -45 },
					speedRange: { min: 150, max:250 },
					spreadRange: { min: 10, max: 10 },
					lifeRange: { min: 40, max: 50 }
				})
				.addComponent("AngleModifier", {
					step: 5 * (Math.PI/180)
				})
				.addComponent("MovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("YellowSquareParticle");

			this.gameObjectPool.createConfiguration("CosineParticle_1", 'particle')
				.args({ 
					angleRange: { min: -90, max: -90 },
					speedRange: { min: 50, max:70 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 50, max: 70 }
				})
				.addComponent("CosineAngleModifier", {
					period: 5,
					amplitude: 0.5,
					angleOffset: 90,
					initCount: function() {
						return Math.random() * 360; 
					}
				})
				.addComponent("MovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("SmokeSquareParticle_1");

			this.gameObjectPool.createConfiguration("CosineParticle_2", 'particle')
				.args({ 
					angleRange: { min: -90, max: -90 },
					speedRange: { min: 50, max:70 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 50, max: 70 }
				})
				.addComponent("CosineAngleModifier", {
					period: 3,
					amplitude: 1,
					angleOffset: 90,
					initCount: function() {
						return Math.random() * 360; 
					}
				})
				.addComponent("MovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("SmokeSquareParticle_2");

			this.componentPool.createConfiguration("BossParticleTween", commonBundle.getTweenPoolId());

			this.gameObjectPool.createConfiguration("Boss_1_DestroyParticle_1", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_1_DestroyParticleRenderer_1");

			this.gameObjectPool.createConfiguration("Boss_1_DestroyParticle_2", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_1_DestroyParticleRenderer_2");

			this.gameObjectPool.createConfiguration("Boss_1_DestroyParticle_3", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_1_DestroyParticleRenderer_3");

			this.gameObjectPool.createConfiguration("Boss_2_DestroyParticle_1", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_2_DestroyParticleRenderer_1");

			this.gameObjectPool.createConfiguration("Boss_2_DestroyParticle_2", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_2_DestroyParticleRenderer_2");

			this.gameObjectPool.createConfiguration("Boss_3_DestroyParticle_1", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_3_DestroyParticleRenderer_1");

			this.gameObjectPool.createConfiguration("Boss_3_DestroyParticle_2", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_3_DestroyParticleRenderer_2");

			this.gameObjectPool.createConfiguration("Boss_4_DestroyParticle_1", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_4_DestroyParticleRenderer_1");

			this.gameObjectPool.createConfiguration("Boss_4_DestroyParticle_2", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_4_DestroyParticleRenderer_2");

			this.gameObjectPool.createConfiguration("Boss_4_DestroyParticle_3", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_4_DestroyParticleRenderer_3");

			this.gameObjectPool.createConfiguration("Boss_4_DestroyParticle_4", "particle")
				.args({ 
					angleRange: { min: 0, max: 360 },
					speedRange: { min: 0, max: 0 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 0, max: 0 }
				})
				.addComponent("ClaimOnOutOfScreenBounds")
				.addComponent("CheckOutOfBounds")
				.addComponent("StraightMovementAngle")
				.addComponent("Rotate", { amount: 0.3 })
				.addComponent("BossParticleTween", { 
					properties: {
						speed: true
					},
					tweenProperties: {
						time: 2,
						tweenStartProperties: {
							speed: 250
						},
						tweenEndProperties: {
							speed: 10,
							ease: Power2.easeOut
						}
					}, 
				})
				.setRenderer("Boss_4_DestroyParticleRenderer_4");
		},

		getStraightParticle_1_Id: function() {
			return "StraightParticle_1"
		},

		getStraightParticle_2_Id: function() {
			return "StraightParticle_2"
		},

		getStraightParticle_3_Id: function() {
			return "StraightParticle_3"
		},

		getArchingParticle_1_Id: function() {
			return "ArchingParticle_1";
		},

		getArchingParticle_2_Id: function() {
			return "ArchingParticle_2";
		},

		getCosineParticle_1_Id: function() {
			return "CosineParticle_1";
		},

		getCosineParticle_2_Id: function() {
			return "CosineParticle_2";
		},

		getBoss_1_DestroyParticle_1_Id: function() {
			return "Boss_1_DestroyParticle_1";
		},

		getBoss_1_DestroyParticle_2_Id: function() {
			return "Boss_1_DestroyParticle_2";
		},

		getBoss_2_DestroyParticle_1_Id: function() {
			return "Boss_2_DestroyParticle_1";
		},

		getBoss_2_DestroyParticle_2_Id: function() {
			return "Boss_2_DestroyParticle_2";
		},

		getBoss_1_DestroyParticle_3_Id: function() {
			return "Boss_1_DestroyParticle_3";
		},

		getBoss_3_DestroyParticle_1_Id: function() {
			return "Boss_3_DestroyParticle_1";
		},

		getBoss_3_DestroyParticle_2_Id: function() {
			return "Boss_3_DestroyParticle_2";
		},

		getBoss_4_DestroyParticle_1_Id: function() {
			return "Boss_4_DestroyParticle_1";
		},

		getBoss_4_DestroyParticle_2_Id: function() {
			return "Boss_4_DestroyParticle_2";
		},

		getBoss_4_DestroyParticle_3_Id: function() {
			return "Boss_4_DestroyParticle_3";
		},

		getBoss_4_DestroyParticle_4_Id: function() {
			return "Boss_4_DestroyParticle_4";
		}

	});

	return new Particles();
});