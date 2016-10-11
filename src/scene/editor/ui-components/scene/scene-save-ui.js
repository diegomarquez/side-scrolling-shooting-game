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
							'Update': ['Scene Name']
						}
					},
					{
						name: 'Remote Storage',

						fields: [
							new dialogTextField({
								name: 'Remote Scene Name',
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
								name: 'Remote Url',
								validations: [
									{
										check: function() {
											return levelRequester.pingRemote(getRemoteUrl());  
										},

										tip: "Remote is not available"
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
							'Upload': ['Remote Scene Name', 'Remote Url']
						}
					}
				]
			});						
		},

		open: function() {
			return this.saveSceneDialog.dialog('open');
		}
	});
		
	var getRemoteUrl = function() {
		var hostname = window.location.hostname;

		if (hostname === 'localhost')
			return 'http://localhost:3000';

		if (hostname === '')
			return 'http://localhost:3000';

		return 'http://scene-store.herokuapp.com';
	}

	var serializeAndStoreLocal = function() {
		var name = this.LocalSceneName();

		var serializedScene = sceneSerializer.serialize(name);

		if (serializedScene === false) {
			$(self).dialog('option').showErrorFeedback('Error saving then scene.');

			return;
		}

		if (localStorageWrapper.setScene(name, serializedScene)) {
			$(this).dialog('close');
		} else {
			$(self).dialog('option').showErrorFeedback('No more space in local storage.');
		}

		sceneName.set(name);
	}

	var serializeAndStoreRemote = function() {
		var name = this.RemoteSceneName();

		var self = this;

		var serializedScene = sceneSerializer.serialize(name); 
		
		if (serializedScene === false) {
			$(self).dialog('option').showErrorFeedback('Error saving the scene.');

			return;
		}

		levelRequester.post(serializedScene, getRemoteUrl() + '/add',
			function (successResult) {
				$(self).dialog('close');

				var response = JSON.parse(successResult);

				localStorageWrapper.setRemoteId(response.name, response.id, response.remote);
			},
			function (failureResult) {
				$(self).dialog('option').showErrorFeedback('Error posting to the remote.');
			});

		sceneName.set(name);
	}
	
	SceneSave.serializeAndStoreRemoteShare = function(onComplete) {
		var self = this;

		var serializedScene = sceneSerializer.serialize(util.generateUUID()); 
		
		if (serializedScene === false) {
			// TODO: Implement this
			// Show proper feedback if there was a problem sharing

			return;
		}

		levelRequester.post(serializedScene, getRemoteUrl() + '/add',
			function (successResult) {
				$(self).dialog('close');

				var response = JSON.parse(successResult);

				onComplete(response.name, response.id, response.remote);
			},
			function (failureResult) {
				// TODO: Implement this
				// Show proper feedback if there was a problem sharing
			});
	}

	return SceneSave;
});