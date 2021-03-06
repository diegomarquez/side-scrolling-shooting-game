define(function(require) {
	var commonBundle = require('common-bundle');
	var gb = require('gb');
	var explosionsBundle = require('explosion-generator-bundle');

	var Blob = require("bundle").extend({
		create: function(args) {

			this.gameObjectPool.createDynamicPool('BlobType', require('blob'));
			
			this.componentPool.createPool('DestroyExplosions', require('destroy-explosions'));
			this.componentPool.createPool('DestroyOnHpDepleted', require('destroy-on-hp-depleted'));
			this.componentPool.createPool('FollowTarget', require('follow-target'));

			this.componentPool.createPool('BlobShrapnel', require('blob-shrapnel'));
			this.componentPool.createPool('BlobDivide', require('blob-divide'));

			this.componentPool.createConfiguration("BlobCircleCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id: 'blobColliderId',
					radius: 10
				});

			this.componentPool.createConfiguration("Activate_Blob_On_View", commonBundle.getActivateOnViewPoolId());
			
			this.componentPool.createConfiguration("BlobDestroyExplosions", "DestroyExplosions")
				.args({
					effect: explosionsBundle.getMediumExplosionsEffectId()
				});

			this.componentPool.createConfiguration("BlobDestroyOnHpDepleted", "DestroyOnHpDepleted");

			this.componentPool.createConfiguration("BlobFollowTarget", "FollowTarget");

			this.componentPool.createConfiguration("BlobShrapnel", "BlobShrapnel");
			this.componentPool.createConfiguration("BlobDivide", "BlobDivide");

			this.componentPool.createConfiguration("BlobRenderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					frameWidth: 40,
					frameHeight: 40,
					frameDelay: 0.1,
					frameCount: 11,
					loop: true,
					offset: 'center',
					path: gb.assetMap()["BLOB.PNG"]
				});

			this.gameObjectPool.createConfiguration('blob-explode-0', 'BlobType')
				.args({
					hp: 10,
					speed: 20
				})
				.addComponent('BlobCircleCollider')
				.addComponent('Activate_Blob_On_View')
				.addComponent('BlobDestroyExplosions')
				.addComponent('BlobDestroyOnHpDepleted')
				.addComponent('BlobFollowTarget')
				.addComponent('BlobShrapnel', { objectType: 'blob-bullet-slow', amount: 'x4' })
				.addComponent('EnemyShipExplosion3')
				.addComponent("AddBulletHitFlash")
				.setRenderer('BlobRenderer')
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration('blob-explode-1', 'BlobType')
				.args({
					hp: 5,
					speed: 10
				})
				.addComponent('BlobCircleCollider')
				.addComponent('Activate_Blob_On_View')
				.addComponent('BlobDestroyExplosions')
				.addComponent('BlobDestroyOnHpDepleted')
				.addComponent('BlobFollowTarget')
				.addComponent('EnemyShipExplosion3')
				.addComponent('BlobShrapnel', { objectType: 'blob-bullet-slow', amount: 'x8' })
				.addComponent("AddBulletHitFlash")
				.setRenderer('BlobRenderer')
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration('blob-divide-0', 'BlobType')
				.args({
					hp: 10,
					speed: 20
				})
				.addComponent('BlobCircleCollider')
				.addComponent('Activate_Blob_On_View')
				.addComponent('BlobDestroyExplosions')
				.addComponent('BlobDestroyOnHpDepleted')
				.addComponent('BlobFollowTarget')
				.addComponent('EnemyShipExplosion1')
				.addComponent('BlobDivide', { objectType: 'blob-explode-0', amount: 'x2' })
				.addComponent("AddBulletHitFlash")
				.setRenderer('BlobRenderer')
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration('blob-divide-1', 'BlobType')
				.args({
					hp: 10,
					speed: 20
				})
				.addComponent('BlobCircleCollider')
				.addComponent('Activate_Blob_On_View')
				.addComponent('BlobDestroyExplosions')
				.addComponent('BlobDestroyOnHpDepleted')
				.addComponent('BlobFollowTarget')
				.addComponent('EnemyShipExplosion1')
				.addComponent('BlobDivide', { objectType: 'blob-explode-1', amount: 'x3' })
				.addComponent("AddBulletHitFlash")
				.setRenderer('BlobRenderer')
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration('blob-divide-2', 'BlobType')
				.args({
					hp: 15,
					speed: 20
				})
				.addComponent('BlobCircleCollider')
				.addComponent('Activate_Blob_On_View')
				.addComponent('BlobDestroyExplosions')
				.addComponent('BlobDestroyOnHpDepleted')
				.addComponent('BlobFollowTarget')
				.addComponent('BlobDivide', { objectType: 'blob-divide-0', amount: 'x2' })
				.addComponent("AddBulletHitFlash")
				.addComponent('EnemyShipExplosion1')
				.setRenderer('BlobRenderer')
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration('blob-divide-3', 'BlobType')
				.args({
					hp: 15,
					speed: 20
				})
				.addComponent('BlobCircleCollider')
				.addComponent('Activate_Blob_On_View')
				.addComponent('BlobDestroyExplosions')
				.addComponent('BlobDestroyOnHpDepleted')
				.addComponent('BlobFollowTarget')
				.addComponent('BlobDivide', { objectType: 'blob-divide-1', amount: 'x3' })
				.addComponent("AddBulletHitFlash")
				.addComponent('EnemyShipExplosion1')
				.setRenderer('BlobRenderer')
				.enemyCategory()
				.strongEnemyTier();
		},
	});

	return new Blob();
});