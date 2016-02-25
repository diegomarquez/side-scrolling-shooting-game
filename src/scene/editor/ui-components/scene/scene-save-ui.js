define(function(require) {
	var localStorageWrapper = require('local-storage');
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
								name: 'Scene Name',
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
						            		return !localStorageWrapper.getScene(this.SceneName()); 
						          		},
						          		tip: "To overwrite the old scene click the 'Update' button"
									}
								]
							})
						],

						buttons: {
							'Save': function () {
								serializeAndStore.call(this);
							},

							'Update': function () {
								serializeAndStore.call(this);
							}
						},

						validateOnAction: {
							'Save': ['Scene Name', 'Scene Already Exists'],
							'Update': ['Scene Name']
						}
					},
					{
						name: 'Remote Storage',

						fields: [
							new dialogTextField({
								name: 'Scene Name',
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
											var isValid = false;

											$.ajax({
												url: remote,
												type: "GET",
												async: false,
												success: function() { 
													isValid = true; 
												},
												error: function() { 
													isValid = false;
												}
											});

											return isValid;  
										},
										tip: "Remote is not available"
									}
								]
							})
						],

						buttons: {
							'Upload': function () {
								$.post(this.RemoteUrl(), sceneSerializer.serialize(this.SceneName()));
								$(this).dialog('close');
							}
						},

						validateOnAction: {
							'Upload': ['Scene Name', 'Remote Url']
						}
					}
				]
			});						
		},

		open: function() {
			return this.saveSceneDialog.dialog('open');
		}
	});
		
	var serializeAndStore = function() { 
		var name = this.SceneName();

		if (localStorageWrapper.setScene(name, sceneSerializer.serialize(name))) {
			$(this).dialog('close');
		} else {
			$(this).dialog('option', 'setErrorFeedback')('No more space in local storage. Delete scenes to free up space.');
		}

		sceneName.set(name);
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