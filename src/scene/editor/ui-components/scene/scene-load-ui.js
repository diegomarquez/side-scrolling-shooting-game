define(function(require) {
	var localStorageWrapper = require('local-storage');
	var levelRequester = require('level-requester');
	var levelCompressor = require('level-compressor');
	var sceneLoader = require('editor-scene-loader');
	var sceneSerializer = require('scene-serializer');

	var dialogTabbedModular = require('dialog-tabbed-modular');
	
	var dialogTextField = require('dialog-text-field');
	var dialogPagingField = require('dialog-paging-field');
	var dialogHiddenField = require('dialog-hidden-field');

	var lastConnectedRemote = "";

	var SceneLoad = require('ui-component').extend({
		init: function() {
			this.loadSceneDialog = new dialogTabbedModular().create({
				id: 'load-scene-dialog',
				title: 'Open a scene',
				tip: 'Choose a scene to load',
				autoOpen: false,
				height: 'auto',
				width: 'auto',
				minWidth: 300,
				modal: true,

				tabs: [
					{
						name: 'Local Scenes',

						fields: [
							new dialogPagingField({
								name: 'Local Scene Selector',
								itemsPerPage: 10,
								data: function() {
									return localStorageWrapper.getAllScenes();
								},
								validations: [
									{
										check: function() {
											return this.LocalSceneSelector();
										},
										
										tip: "No scene selected"
									}
								]
							})
						],

						buttons: {
							'Open Local': function () {
								// Store a backup of the current scene in case something goes wrong while loading the new one
								localStorageWrapper.setBackUpScene(sceneSerializer.serialize(require('scene-name').get()));

								var dialogOptions = $(this).dialog('option');
								dialogOptions.showLoadingFeedback();

								try {
									var scene = localStorageWrapper.getScene(this.LocalSceneSelector());
									sceneLoader.load(JSON.parse(scene));
									sceneLoader.layout();
									
									dialogOptions.hideLoadingFeedback();
									$(this).dialog('close');
									
									require('gb').game.get_extension(require('logger')).success('Local scene loaded successfully!');
									require('gb').game.get_extension(require('logger')).show();
								} catch (e) {
									// Restore the initial scene and show error feedback
									sceneLoader.load(localStorageWrapper.getBackUpScene());
									sceneLoader.layout();
									
									dialogOptions.hideLoadingFeedback();
									dialogOptions.showErrorFeedback('Error opening scene.');
								}
							}
						},

						validateOnAction: {
							'Open Local': ['Local Scene Selector']
						}
					},
					{
						name: 'Dropbox Scenes',

						activate: function() {
							var self = this;
							var dialogOptions = $(self).dialog('option');

							dialogOptions.showLoadingFeedback();

							// Initial Request
							levelRequester.list(
								function (data) {
									dialogOptions.enableField('Dropbox Scenes', 'Dropbox Scene Selector');

									var d = data.map(function (pair) {
										return {
											"displaytext": pair['name'].replace('.bin', ''),
											"id": pair['id']
										}
									});

									dialogOptions.updateField('Dropbox Scenes', 'Dropbox Scene Selector', d);
									dialogOptions.hideLoadingFeedback();
								},
								function (error) {
									dialogOptions.disableField('Dropbox Scenes', 'Dropbox Scene Selector');
									dialogOptions.showErrorFeedback('Error connecting to Dropbox.');
									dialogOptions.hideLoadingFeedback();
								}
							);
						},

						fields: [
							new dialogPagingField({
								name: 'Dropbox Scene Selector',
								itemsPerPage: 10,
								disabled: true,
								next: function() {
									var self = this.getDialog();
									var dialogOptions = $(self).dialog('option');

									dialogOptions.showLoadingFeedback();

									levelRequester.listMore(
										function (data) {
											dialogOptions.enableField('Dropbox Scenes', 'Dropbox Scene Selector');

											if (data === false)
											{
												dialogOptions.updateField('Dropbox Scenes', 'Dropbox Scene Selector', []);
												dialogOptions.hideLoadingFeedback();
											}
											else
											{
												var d = data.map(function (pair) {
													return {
														"displaytext": pair['name'].replace('.bin', ''),
														"id": pair['id']
													}
												});
												
												dialogOptions.updateField('Dropbox Scenes', 'Dropbox Scene Selector', d);
												dialogOptions.hideLoadingFeedback();
											}
										},
										function (error) {
											dialogOptions.disableField('Dropbox Scenes', 'Dropbox Scene Selector');
											dialogOptions.updateField('Dropbox Scenes', 'Dropbox Scene Selector', []);
											dialogOptions.showErrorFeedback('Error getting more scenes.');
											dialogOptions.hideLoadingFeedback();
										}
									);
								},

								validations: [
									{
										check: function() {
											return this.DropboxSceneSelector();
										},
										
										tip: "No scene selected"
									}
								]
							})
						],

						buttons: {
							'Open Dropbox Scene': function () {
								var self = this;
								var dropboxFileId = this.DropboxSceneSelector()["id"];

								var dialogOptions = $(self).dialog('option');
								dialogOptions.showLoadingFeedback();

								// Store a backup of the current scene in case something goes wrong while loading the new one
								localStorageWrapper.setBackUpScene(sceneSerializer.serialize(require('scene-name').get()));

								levelRequester.getScene(dropboxFileId,
									function (data) {
										try {
											sceneLoader.load(data);
											sceneLoader.layout();
											
											dialogOptions.hideLoadingFeedback();
											$(self).dialog('close');
											
											require('gb').game.get_extension(require('logger')).success('Dropbox scene loaded successfully!');
											require('gb').game.get_extension(require('logger')).show();
										} catch (e) {
											// Restore the initial scene and show error feedback
											sceneLoader.load(localStorageWrapper.getBackUpScene());
											sceneLoader.layout();
								
											dialogOptions.hideLoadingFeedback();
											dialogOptions.showErrorFeedback('Error opening scene.');
										}
									},
									function (error) {
										dialogOptions.hideLoadingFeedback();
										dialogOptions.showErrorFeedback('Error opening scene.');
									}
								);
							},
						},

						validateOnAction: {
							'Open Dropbox Scene': ['Dropbox Scene Selector']
						}
					},
					{
						name: 'Built In Scenes',
						
						fields: [
							new dialogPagingField({
								name: 'Built In Scene Selector',
								itemsPerPage: 4,
								hideNavagationButtons: true,
								data: function() {
									return require('level-storage').getLevelNames();
								},
								validations: [
									{
										check: function() {
											return this.BuiltInSceneSelector();
										},
										
										tip: "No scene selected"
									}
								]
							})
						],
						
						buttons: {
							'Open Built In': function () {
								var dialogOptions = $(this).dialog('option');
								dialogOptions.showLoadingFeedback();

								// Store a backup of the current scene in case something goes wrong while loading the new one
								localStorageWrapper.setBackUpScene(sceneSerializer.serialize(require('scene-name').get()));

								try {
									var scene = require('level-storage').getLevelFromName(this.BuiltInSceneSelector());
									sceneLoader.load(scene);
									sceneLoader.layout();
									
									dialogOptions.hideLoadingFeedback();
									$(this).dialog('close');
									
									require('gb').game.get_extension(require('logger')).success('Built-in scene loaded successfully!');
									require('gb').game.get_extension(require('logger')).show();
								} catch (e) {
									// Restore the initial scene and show error feedback
									sceneLoader.load(localStorageWrapper.getBackUpScene());
									sceneLoader.layout();

									dialogOptions.hideLoadingFeedback();
									dialogOptions.showErrorFeedback('Error opening scene.');
								}
							}
						},

						validateOnAction: {
							'Open Built In': ['Built In Scene Selector']
						}
					}
				]
			});
		},

		open: function() {
			return this.loadSceneDialog.dialog('open');
		}
	});

	return SceneLoad;
});

