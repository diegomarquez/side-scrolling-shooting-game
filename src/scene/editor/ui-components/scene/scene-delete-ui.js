define(function(require) {
	var localStorageWrapper = require('local-storage');
	
	var dialogTabbedModular = require('dialog-tabbed-modular');
	
	var dialogTextField = require('dialog-text-field');
	var dialogPagingField = require('dialog-paging-field');

	var SceneDelete = require('ui-component').extend({
		init: function() {
			this.deleteSceneDialog = new dialogTabbedModular().create({
				id: 'delete-scene-dialog',
				title: 'Delete scenes',
				tip: 'Choose a scene to delete',
				autoOpen: false,
				height: 'auto',
				width: 'auto',
				minWidth: 300,
				modal: true,
				
				tabs: [
					{
						name: "Delete Local",

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
							'Delete': function () {
								localStorageWrapper.removeScene(this.LocalSceneSelector());

								$(this).dialog('close');
							},

							'Delete All': function () {
								localStorageWrapper.clearScenes();

								$(this).dialog('close');
							}
						},

						validateOnAction: {
							'Delete': ['Local Scene Selector'],
							'Delete All': []
						}
					},
					{
						name: "Delete Remote",

						fields: [
							new dialogPagingField({
								name: 'Remote Scene Selector',
								itemsPerPage: 10,
								data: function() {
									return localStorageWrapper.getRemoteIdNames();
								},
								validations: [ 
									{
										check: function() {
											return this.RemoteSceneSelector();
										},
										
										tip: "No scene selected"
									}
								]
							})
						],

						buttons: {
							'Delete': function () {
								var name = this.RemoteSceneSelector().match(/^(.*) => .*$/)[1];
								var id = this.RemoteSceneSelector().match(/^.* => (.*)$/)[1];
								
								localStorageWrapper.removeRemoteId(name, id);

								$(this).dialog('close');
							},

							'Delete All': function () {
								localStorageWrapper.removeAllRemoteIds();

								$(this).dialog('close');								
							}
						},

						validateOnAction: {
							'Delete': ['Remote Scene Selector'],
							'Delete All': []
						}
					}
				]
			});
		},

		open: function() {
			return this.deleteSceneDialog.dialog('open');
		}
	});
	
	return SceneDelete;
});

