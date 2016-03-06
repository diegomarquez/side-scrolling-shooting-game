define(function(require) {
	var localStorageWrapper = require('local-storage');
	var levelRequester = require('level-requester');
	var levelCompressor = require('level-compressor');
	var sceneLoader = require('editor-scene-loader');

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
								}
							})
						],

						buttons: {
							'Open Local': function () {
								if (this.LocalSceneSelector() != 'no-data') {
									var scene = localStorageWrapper.getScene(this.LocalSceneSelector());
									sceneLoader.load(JSON.parse(scene));
									sceneLoader.layout();
									$(this).dialog('close');
								}
							}
						},

						validateOnAction: {
							'Open Local': []
						}	
					},
					{
						name: 'Remote Scenes',	

						fields: [
							new dialogPagingField({
								name: 'Remote Scene Selector',
								itemsPerPage: 10,
								disabled: true,
								next: function() {
									var self = this.getDialog();

									$(self).dialog('option').showLoadingFeedback();

									levelRequester.get(
										self.RemoteInput() + "/view/" + this.currentPage(),
										function (data) {
											$(self).dialog('option').enableField('Remote Scenes', 'Remote Scene Selector');

											var d = JSON.parse(data).map(function (pair) {
												return pair.name + " => " + pair.id;
											});

											$(self).dialog('option').updateField('Remote Scenes', 'Remote Scene Selector', d);
											$(self).dialog('option').hideLoadingFeedback();
										},
										function (error) {
											$(self).dialog('option').disableField('Remote Scenes', 'Remote Scene Selector');
											$(self).dialog('option').updateField('Remote Scenes', 'Remote Scene Selector', []);
											$(self).dialog('option').showErrorFeedback('There was an error getting more scenes');
											$(self).dialog('option').hideLoadingFeedback();
										}
									);
								}
							}),
							new dialogTextField({
								name: 'Remote Input',
								value: 'http://localhost:3000',
								validations: [ 
									{
										check: function(remote) {
											return this.RemoteSceneSelector();
										},
										
										tip: "Remote scene selector is empty"
									}
								]
							}),
							new dialogHiddenField({
								name: 'Remote Availability',
								validations: [
									{
										check: function() {
											return levelRequester.pingRemote(this.RemoteInput());   
										 },

										 tip: "Remote is not available"
									}
								]
							}),
							new dialogHiddenField({
								name: 'Remote Url Validity',
								validations: [
									{
										check: function() { 
											return validateURL(this.RemoteInput());   
										},
										
										tip: "Remote url is not valid"
									}
								]
							})
						],

						buttons: {
							'Open Remote Scene': function () {
								var self = this;
								var sceneRemoteId = this.RemoteSceneSelector().match(/=>\s+(.*?)$/)[1];

								levelRequester.getLevel(
									this.RemoteInput() + "/data/" + sceneRemoteId,
									function (data) {
										sceneLoader.load(data);
										sceneLoader.layout();
										$(self).dialog('close');
									},
									function (error) {
										$(self).dialog('option').showErrorFeedback('There was an error getting the scene');
									});
							},

							'Connect With Remote': function() {           
								var self = this;

								$(self).dialog('option').showLoadingFeedback();

								// Initial Request
								levelRequester.get(
									this.RemoteInput() + "/view/0",
									function (data) {
										$(self).dialog('option').enableField('Remote Scenes', 'Remote Scene Selector');

										var d = JSON.parse(data).map(function (pair) {
											return pair.name + " => " + pair.id;
										});

										if (lastConnectedRemote !== self.RemoteInput()) {
											$(self).dialog('option').resetField('Remote Scenes', 'Remote Scene Selector');		
										}

										$(self).dialog('option').updateField('Remote Scenes', 'Remote Scene Selector', d);
										$(self).dialog('option').hideLoadingFeedback();

										lastConnectedRemote = self.RemoteInput();
									},
									function (error) {
										$(self).dialog('option').disableField('Remote Scenes', 'Remote Scene Selector');
										$(self).dialog('option').showErrorFeedback('There was an error connecting to the remote');
										$(self).dialog('option').hideLoadingFeedback();
									}
								);
							}
						},

						validateOnAction: {
							'Open Remote Scene': ['Remote Input', 'Remote Url Validity', 'Remote Availability'],
							'Connect With Remote': ['Remote Url Validity', 'Remote Availability']
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
								}
							})
						],
						
						buttons: {
							'Open Built In': function () {
								var scene = require('level-storage').getLevelFromName(this.BuiltSceneSelector());
								sceneLoader.load(scene);
								sceneLoader.layout();
								$(this).dialog('close');
							}
						},

						validateOnAction: {
							'Open Built In': []
						}
					}
				]
			});
		},

		open: function() {
			return this.loadSceneDialog.dialog('open');
		}
	});
	
	validateURL = function(url) {
		var parser = document.createElement('a');
		
		try {
			parser.href = url;
			return !!parser.hostname;
		} catch (e) {
			return false;
		}
	}

	return SceneLoad;
});

