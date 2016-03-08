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
								try {
									var scene = localStorageWrapper.getScene(this.LocalSceneSelector());
									sceneLoader.load(JSON.parse(scene));
									sceneLoader.layout();
									$(this).dialog('close');
								} catch (e) {
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
							new dialogTextField({
								name: 'Remote Input',
								value: 'http://localhost:3000',
								validations: [ 
									{
										check: function() {
											return this.RemoteInput() === "";
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
										try {
											sceneLoader.load(data);
											sceneLoader.layout();
											$(self).dialog('close');
										} catch (e) {
											$(self).dialog('option').showErrorFeedback('Error opening scene.');
										}
									},
									function (error) {
										$(self).dialog('option').showErrorFeedback('Error opening scene.');
									}
								);
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
										$(self).dialog('option').showErrorFeedback('Error connecting to the remote.');
										$(self).dialog('option').hideLoadingFeedback();
									}
								);
							}
						},

						validateOnAction: {
							'Open Remote Scene': ['Remote Input', 'Remote Url Validity', 'Remote Availability', 'Remote Scene Selector'],
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
								try {
									var scene = require('level-storage').getLevelFromName(this.BuiltSceneSelector());
									sceneLoader.load(scene);
									sceneLoader.layout();
									$(this).dialog('close');	
								} catch (e) {
									$(self).dialog('option').showErrorFeedback('Error opening scene.');
								}
							}
						},

						validateOnAction: {
							'Open Built In': ['Built Scene Selector']
						}
					},
					{
						name: 'Known Remote Scenes',
						
						fields: [
							new dialogPagingField({
								name: 'Known Remote Scene Selector',
								itemsPerPage: 10,
								data: function() {
									return localStorageWrapper.getRemoteIdNames();
								},
								validations: [ 
									{
										check: function() {
											return this.KnownRemoteSceneSelector();
										},
										
										tip: "No scene selected"
									}
								]
							})
						],
						
						buttons: {
							'Open Known Remote Scene': function () {
								var name = this.KnownRemoteSceneSelector().match(/^(.*) => .*$/)[1];
								var id = this.KnownRemoteSceneSelector().match(/^.* => (.*)$/)[1];
								var remote = localStorageWrapper.getRemoteIdRemote(name, id);

								var self = this;

								levelRequester.getLevel(
									remote + "/data/" + id,
									function (data) {
										try {
											sceneLoader.load(data);
											sceneLoader.layout();
											$(self).dialog('close');
										} catch (e) {
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

