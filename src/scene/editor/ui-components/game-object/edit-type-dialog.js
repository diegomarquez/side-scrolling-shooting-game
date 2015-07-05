define(function(require) {
	
	var gb = require('gb');
	var dialogModular = require('dialog-modular');
	var dialogTextField = require('dialog-text-field');
	var dialogHiddenField = require('dialog-hidden-field');

	var EditTypeDialog = require('ui-component').extend({
		init: function(editButton, deleteButton) {
			this._super();

			var self = this;

			var buttons = {};
			var validateActions = {};

			if (editButton) {
				buttons['Edit'] = function () {
					self.execute('edit', [this.TypeName().trim(), this.InitialName().trim()], 'apply');
					self.hardCleanUp();
					$(this).dialog('close');
				}

				validateActions['Edit'] = ['Type Name'];
			}

			if (deleteButton) {
				buttons['Delete'] = function () {
					self.execute('delete', this.InitialName().trim());
					self.hardCleanUp();
					$(this).dialog('close');
				}

				validateActions['Delete'] = [];
			}

			this.editTypeDialog = new dialogModular().create({
				id: 'edit-type-dialog',
				title: 'Edit Type',
				tip: 'Edit the type name',
				autoOpen: false,
				height: 'auto',
				width: 'auto',
				minWidth: 300,
				modal: true,

				fields: [
					new dialogTextField({
						name: 'Type Name',
						value: '',
						validations: [
							{
								check: function(typeName) { 
									return typeName.trim() != ''; 
								},

								tip: "Type name can not be empty"
							},
							{
								check: function(typeName) {
									return !gb.goPool.configurationExists(typeName.trim());
								},
								
								tip: "Type name already exists"
							}
						]
					}),

					new dialogHiddenField({
						name: 'Initial Name',
						value: '',
						validations: []
					})
				],

				buttons: buttons,

				validateOnAction: validateActions
			});

			$('#edit-type-dialog').on("dialogclose", function() {
				$('#edit-type-dialog').dialog('destroy').remove();
				self.editTypeDialog = null;
			});
		},

		open: function(currentTypeName) {
			$(this.editTypeDialog).dialog('option').updateField('Type Name', currentTypeName);
			$(this.editTypeDialog).dialog('option').updateField('Initial Name', currentTypeName);
			
			return $(this.editTypeDialog).dialog('open');
		}
	});

	return EditTypeDialog;
});

