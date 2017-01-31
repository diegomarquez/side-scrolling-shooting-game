define(function(require) {
	var localStorageWrapper = require('local-storage');
	var levelRequester = require('level-requester');
	
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
								
								require('gb').game.get_extension(require('logger')).info('Local scene deleted.');
								require('gb').game.get_extension(require('logger')).show();
							},

							'Delete All': function () {
								localStorageWrapper.clearScenes();

								$(this).dialog('close');
								
								require('gb').game.get_extension(require('logger')).info('All Locals scenes deleted.');
								require('gb').game.get_extension(require('logger')).show();
							}
						},

						validateOnAction: {
							'Delete': ['Local Scene Selector'],
							'Delete All': []
						}
					},
					{
						name: "Delete Dropbox",

						activate: function() {
							var self = this;
							var dialogOptions = $(self).dialog('option');

							dialogOptions.showLoadingFeedback();

							// Initial Request
							levelRequester.list(
								function (data) {
									dialogOptions.enableField('Delete Dropbox', 'Dropbox Scene Selector');

									var d = data.map(function (pair) {
										return {
											"displaytext": pair['name'].replace('.bin', ''),
											"id": pair['path_lower']
										}
									});

									dialogOptions.updateField('Delete Dropbox', 'Dropbox Scene Selector', d);
									dialogOptions.hideLoadingFeedback();
								},
								function (error) {
									dialogOptions.disableField('Delete Dropbox', 'Dropbox Scene Selector');
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
											dialogOptions.enableField('Delete Dropbox', 'Dropbox Scene Selector');

											if (data === false)
											{
												dialogOptions.updateField('Delete Dropbox', 'Dropbox Scene Selector', []);
												dialogOptions.hideLoadingFeedback();
											}
											else
											{
												var d = data.map(function (pair) {
													return {
														"displaytext": pair['name'].replace('.bin', ''),
														"id": pair['path_lower']
													}
												});
												
												dialogOptions.updateField('Delete Dropbox', 'Dropbox Scene Selector', d);
												dialogOptions.hideLoadingFeedback();
											}
										},
										function (error) {
											dialogOptions.disableField('Delete Dropbox', 'Dropbox Scene Selector');
											dialogOptions.updateField('Delete Dropbox', 'Dropbox Scene Selector', []);
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
							'Delete': function () {
								var path = this.DropboxSceneSelector()["id"];
								var self = this;
								var dialogOptions = $(self).dialog('option');

								dialogOptions.showLoadingFeedback();
								
								levelRequester.deleteScene(path,
								function() {
									dialogOptions.hideLoadingFeedback();
									$(self).dialog('close');
									
									require('gb').game.get_extension(require('logger')).info('Dropbox scene deleted.');
									require('gb').game.get_extension(require('logger')).show();
								}, function() {
									dialogOptions.hideLoadingFeedback();
									dialogOptions.showErrorFeedback('Error deleting scene.');
								});
							},

							'Delete All': function () {
								var self = this;
								var dialogOptions = $(self).dialog('option');

								dialogOptions.showLoadingFeedback();
								
								levelRequester.deleteAllScenes(function() {
									$(self).dialog('close');
									require('gb').game.get_extension(require('logger')).info('All Dropbox scenes deleted.');
									require('gb').game.get_extension(require('logger')).show();
								}, function() {
									dialogOptions.hideLoadingFeedback();
									dialogOptions.showErrorFeedback('Error deleting scenes.');
								});
							}
						},

						validateOnAction: {
							'Delete': ['Dropbox Scene Selector'],
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

