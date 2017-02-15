define(function(require) {
	var localStorageWrapper = require('local-storage');
	var levelRequester = require('level-requester');
	var sceneSerializer = require('scene-serializer');

	var dialogTabbedModular = require('dialog-tabbed-modular');
	var dialogTextField = require('dialog-text-field');
	var dialogHiddenField = require('dialog-hidden-field');

	var sceneName = require('scene-name');
	var util = require('util');

	var SceneSave = require('ui-component').extend({
		init: function() {
			// Scene Save Dialog
			this.saveSceneDialog = new dialogTabbedModular().create({
				id: 'save-scene-dialog',
				title: 'Save the current scene',
				tip: 'Set a name',
				autoOpen: false,
				height: 'auto',
				width: 'auto',
				minWidth: 300,
				modal: true,

				tabs: [
					{
						name: 'Local Storage',

						fields: [
							new dialogTextField({
								name: 'Local Scene Name',
								value: function() {
									return sceneName.get();
								},
								validations: [
									{
										check: function(sceneName) {
											return sceneName != '';
										},

										tip: "Scene name can't be empty"
									}
								]
							}),
							new dialogHiddenField({
								name: 'Scene Already Exists',
								validations: [
									{
										check: function() {
											return !localStorageWrapper.getScene(this.LocalSceneName());
										},
										tip: "To overwrite the old scene click 'Update'"
									}
								]
							})
						],

						buttons: {
							'Save': function () {
								serializeAndStoreLocal.call(this);
							},

							'Update': function () {
								serializeAndStoreLocal.call(this);
							}
						},

						validateOnAction: {
							'Save': ['Local Scene Name', 'Scene Already Exists'],
							'Update': ['Local Scene Name']
						}
					},
					{
						name: 'Dropbox',

						fields: [
							new dialogTextField({
								name: 'Dropbox Scene Name',
								value: function() {
									return sceneName.get();
								},
								validations: [
									{
										check: function(sceneName) {
											return sceneName != '';
										},

										tip: "Scene name can't be empty"
									}
								]
							})
						],

						buttons: {
							'Upload': function () {
								serializeAndStoreRemote.call(this);
							}
						},

						validateOnAction: {
							'Upload': ['Dropbox Scene Name']
						}
					}
				]
			});
		},

		open: function() {
			return this.saveSceneDialog.dialog('open');
		}
	});

	var serializeAndStoreLocal = function() {
		var dialogOptions = $(this).dialog('option');
		
		dialogOptions.showLoadingFeedback();
		
		var name = this.LocalSceneName();

		var serializedScene = sceneSerializer.serialize(name);
		
		dialogOptions.hideLoadingFeedback();
		
		if (serializedScene === false) {
			dialogOptions.showErrorFeedback('Error saving then scene.');
			
			return;
		}

		if (localStorageWrapper.setScene(name, serializedScene)) {
			$(this).dialog('close');
			
			require('gb').game.get_extension(require('logger')).success('Scene saved to local storage successfully!');
			require('gb').game.get_extension(require('logger')).show();
		} else {
			dialogOptions.showErrorFeedback('No more space in local storage.');
		}

		sceneName.set(name);
	}

	var serializeAndStoreRemote = function() {
		var name = this.DropboxSceneName();

		var self = this;
		var dialogOptions = $(self).dialog('option');

		dialogOptions.showLoadingFeedback();

		var serializedScene = sceneSerializer.serialize(name);

		if (serializedScene === false) {
			dialogOptions.hideLoadingFeedback();
			dialogOptions.showErrorFeedback('Error saving the scene.');

			return;
		}

		levelRequester.post(serializedScene,
			function (successResult) {
				dialogOptions.hideLoadingFeedback();
				$(self).dialog('close');
				
				require('gb').game.get_extension(require('logger')).success('Scene saved to Dropbox successfully!');
				require('gb').game.get_extension(require('logger')).show();
			},
			function (failureResult) {
				dialogOptions.hideLoadingFeedback();
				dialogOptions.showErrorFeedback('Error posting to dropbox.');
			});

		sceneName.set(name);
	}
	
	SceneSave.serializeAndStoreLocal = function(onComplete, onError) {
		var hasScene = localStorageWrapper.getScene(sceneName.get());
		var d = new Date();
		
		var name = "";
		
		if (hasScene) {
			name = sceneName.get() + " " + d.toLocaleString();
		} else {
			name = sceneName.get();
		}
		
		serializedScene = sceneSerializer.serialize(name);
		
		if (serializedScene === false) {
			onError();
			return;
		}

		if (localStorageWrapper.setScene(name, serializedScene)) {
			require('gb').game.get_extension(require('logger')).success('Scene saved to local storage successfully!');
			require('gb').game.get_extension(require('logger')).show();
			
			onComplete();
		} else {
			onError();
		}
	}
	
	SceneSave.serializeAndStoreRemoteShare = function(onComplete, onError) {
		var serializedScene = sceneSerializer.serialize(sceneName.get());
	
		if (serializedScene === false) {
			onError();
			return;
		}
	
		levelRequester.postToFacebook(serializedScene,
			function (successResult) {
				onComplete(successResult);
			},
			function (failureResult) {
				onError(failureResult);
			});
	}

	return SceneSave;
});