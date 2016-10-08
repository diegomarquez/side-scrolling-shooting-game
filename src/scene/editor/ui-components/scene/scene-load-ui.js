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

								try {
									var scene = localStorageWrapper.getScene(this.LocalSceneSelector());
									sceneLoader.load(JSON.parse(scene));
									sceneLoader.layout();
									$(this).dialog('close');
								} catch (e) {
									// Restore the initial scene and show error feedback
									sceneLoader.load(localStorageWrapper.getBackUpScene());
									sceneLoader.layout();

									$(this).dialog('option').showErrorFeedback('Error opening scene.');
								}
							}
						},

						validateOnAction: {
							'Open Local': ['Local Scene Selector']
						}
					},
					{
						name: 'Remote Scenes',	

						activate: function() {
							var self = this;
							var dialogOptions = $(self).dialog('option');

							dialogOptions.showLoadingFeedback();

							if (!levelRequester.pingRemote(getRemoteUrl()))
							{
								dialogOptions.disableField('Remote Scenes', 'Remote Scene Selector');
								dialogOptions.showErrorFeedback('Remote is not available');
								dialogOptions.hideLoadingFeedback();

								return;
							}

							// Initial Request
							levelRequester.get(
								getRemoteUrl() + "/view/" + getRemoteStartingIndex(),
								function (data) {
									dialogOptions.enableField('Remote Scenes', 'Remote Scene Selector');

									var d = JSON.parse(data).map(function (pair) {
										return {
											"displaytext": pair.name,
											"id": pair.id
										}
									});

									if (lastConnectedRemote !== getRemoteUrl()) {
										dialogOptions.resetField('Remote Scenes', 'Remote Scene Selector');
									}

									dialogOptions.updateField('Remote Scenes', 'Remote Scene Selector', d);
									dialogOptions.hideLoadingFeedback();

									lastConnectedRemote = getRemoteUrl();
								},
								function (error) {
									dialogOptions.disableField('Remote Scenes', 'Remote Scene Selector');
									dialogOptions.showErrorFeedback('Error connecting to the remote.');
									dialogOptions.hideLoadingFeedback();
								}
							);
						},

						fields: [
							new dialogPagingField({
								name: 'Remote Scene Selector',
								itemsPerPage: 10,
								disabled: true,
								next: function() {
									var self = this.getDialog();

									$(self).dialog('option').showLoadingFeedback();

									levelRequester.get(
										getRemoteUrl() + "/view/" + this.currentPage() + getRemoteStartingIndex(),
										function (data) {
											$(self).dialog('option').enableField('Remote Scenes', 'Remote Scene Selector');

											var d = JSON.parse(data).map(function (pair) {
												return {
													"displaytext": pair.name,
													"id": pair.id
												}
											});

											$(self).dialog('option').updateField('Remote Scenes', 'Remote Scene Selector', d);
											$(self).dialog('option').hideLoadingFeedback();
										},
										function (error) {
											$(self).dialog('option').disableField('Remote Scenes', 'Remote Scene Selector');
											$(self).dialog('option').updateField('Remote Scenes', 'Remote Scene Selector', []);
											$(self).dialog('option').showErrorFeedback('Error getting more scenes.');
											$(self).dialog('option').hideLoadingFeedback();
										}
									);
								},

								validations: [
									{
										check: function() {
											return this.RemoteSceneSelector();
										},
										
										tip: "No scene selected"
									}
								]
							}),
							new dialogHiddenField({
								name: 'Remote Availability',
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
							'Open Remote Scene': function () {
								var self = this;
								var sceneRemoteId = this.RemoteSceneSelector()["id"];

								// Store a backup of the current scene in case something goes wrong while loading the new one
								localStorageWrapper.setBackUpScene(sceneSerializer.serialize(require('scene-name').get()));

								levelRequester.getLevel(
									getRemoteUrl() + "/data/" + sceneRemoteId,
									function (data) {
										try {
											sceneLoader.load(data);
											sceneLoader.layout();
											$(self).dialog('close');
										} catch (e) {
											// Restore the initial scene and show error feedback
											sceneLoader.load(localStorageWrapper.getBackUpScene());
											sceneLoader.layout();

											$(self).dialog('option').showErrorFeedback('Error opening scene.');
										}
									},
									function (error) {
										$(self).dialog('option').showErrorFeedback('Error opening scene.');
									}
								);
							},
						},

						validateOnAction: {
							'Open Remote Scene': ['Remote Input', 'Remote Availability', 'Remote Scene Selector']
						}
					},
					{
						name: 'Built In Scenes',
						
						fields: [
							new dialogPagingField({
								name: 'Built Scene Selector',
								itemsPerPage: 4,
								hideNavagationButtons: true,
								data: function() {
									return require('level-storage').getLevelNames();
								},
								validations: [ 
									{
										check: function() {
											return this.BuiltSceneSelector();
										},
										
										tip: "No scene selected"
									}
								]
							})
						],
						
						buttons: {
							'Open Built In': function () {

								// Store a backup of the current scene in case something goes wrong while loading the new one
								localStorageWrapper.setBackUpScene(sceneSerializer.serialize(require('scene-name').get()));

								try {
									var scene = require('level-storage').getLevelFromName(this.BuiltSceneSelector());
									sceneLoader.load(scene);
									sceneLoader.layout();
									$(this).dialog('close');	
								} catch (e) {

									// Restore the initial scene and show error feedback
									sceneLoader.load(localStorageWrapper.getBackUpScene());
									sceneLoader.layout();

									$(self).dialog('option').showErrorFeedback('Error opening scene.');
								}
							}
						},

						validateOnAction: {
							'Open Built In': ['Built Scene Selector']
						}
					},
					{
						name: 'My Remote Scenes',
						
						fields: [
							new dialogPagingField({
								name: 'My Remote Scenes Selector',
								itemsPerPage: 10,
								data: function() {  
									return localStorageWrapper.getRemoteIdNames().map(function(nameAndId) {
										return {
											"displaytext": nameAndId.match(/^(.*) => .*$/)[1], 
											"id": nameAndId.match(/^.* => (.*)$/)[1]
										}
									});
								},
								validations: [ 
									{
										check: function() {
											return this.MyRemoteScenesSelector();
										},
										
										tip: "No scene selected"
									}
								]
							})
						],
						
						buttons: {
							'Open My Remote Scene': function () {
								var name = this.MyRemoteScenesSelector()["displaytext"];
								var id = this.MyRemoteScenesSelector()["id"];

								var remote = localStorageWrapper.getRemoteIdRemote(name, id);

								var self = this;

								// Store a backup of the current scene in case something goes wrong while loading the new one
								localStorageWrapper.setBackUpScene(sceneSerializer.serialize(require('scene-name').get()));

								levelRequester.getLevel(
									remote + "/data/" + id,
									function (data) {
										try {
											sceneLoader.load(data);
											sceneLoader.layout();
											$(self).dialog('close');
										} catch (e) {
											// Restore the initial scene and show error feedback
											sceneLoader.load(localStorageWrapper.getBackUpScene());
											sceneLoader.layout();

											$(self).dialog('option').showErrorFeedback('Error opening scene.');
										}
									},
									function (error) {
										$(self).dialog('option').showErrorFeedback('Error opening scene.');
									}
								);
							}
						},

						validateOnAction: {
							'Open Known Remote Scene': ['Known Remote Scene Selector']
						}
					}
				]
			});
		},

		open: function() {
			return this.loadSceneDialog.dialog('open');
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

	var getRemoteStartingIndex = function() {
		var hostname = window.location.hostname;

		if (hostname === 'localhost')
			return 0;

		if (hostname === '')
			return 0;

		return 1;
	}

	return SceneLoad;
});

