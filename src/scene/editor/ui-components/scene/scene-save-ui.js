define(function(require) {
	var localStorageWrapper = require('local-storage');
	var levelRequester = require('level-requester');
	var sceneSerializer = require('scene-serializer');
	
	var dialogTabbedModular = require('dialog-tabbed-modular');	
	var dialogTextField = require('dialog-text-field');
	var dialogHiddenField = require('dialog-hidden-field');

	var sceneName = require('scene-name');

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
						          		tip: "To overwrite the old scene click the 'Update' button"
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
							new dialogTextField({
								name: 'Remote Url',
								value: 'http://localhost:3000',
								validations: [
									{
										check: function(remote) { 
										    return validateURL(remote);  
										},
										tip: "Remote url is not valid"
									},
									{
										check: function(remote) { 
											return levelRequester.pingRemote(remote);  
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
		
	var serializeAndStoreLocal = function() {
		var name = this.LocalSceneName();

		if (localStorageWrapper.setScene(name, sceneSerializer.serialize(name))) {
			$(this).dialog('close');
		} else {
			$(self).dialog('option').showErrorFeedback('No more space in local storage. Delete scenes to free up space.');
		}

		sceneName.set(name);
	}

	var serializeAndStoreRemote = function() {
		var self = this;

		var serializedScene = sceneSerializer.serialize(this.RemoteSceneName()); 
		
		levelRequester.post(serializedScene, this.RemoteUrl() + '/add',
			function (successResult) {
				$(self).dialog('close');

				var response = JSON.parse(successResult);

				localStorageWrapper.setRemoteId(response.name, response.id, response.remote);
			},
			function (failureResult) {
				$(self).dialog('option').showErrorFeedback('There was an error posting to the remote');
			});
	}

	var validateURL = function(url) {
		var parser = document.createElement('a');
		
		try {
			parser.href = url;
			return !!parser.hostname;
		} catch (e) {
			return false;
		}
	}
		
	return SceneSave;
});