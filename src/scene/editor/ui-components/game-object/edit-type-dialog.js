define(function(require) {
	
	var gb = require('gb');
	var dialogModular = require('dialog-modular');
	var dialogTextField = require('dialog-text-field');
	var dialogHiddenField = require('dialog-hidden-field');

	var EditTypeDialog = require('ui-component').extend({
		init: function() {
			this._super();

			var self = this;

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
									return !gb.goPool.configurationExists(typeName); 
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

				buttons: {
					'Edit': function () {
						self.execute('edit', [this.TypeName(), this.InitialName()], 'apply');
						self.hardCleanUp();
						$(this).dialog('close');
					}
				},

				validateOnAction: {
					'Edit': ['Type Name']
				}
			});

			$('#edit-type-dialog').on("dialogclose", function() {
				$('#edit-type-dialog').dialog('destroy').remove();

				self.editTypeDialog = null;
				self.onClose - null;
			});
		},

		open: function(currentTypeName) {
			$(this.editTypeDialog).dialog('option').updateField('Type Name', currentTypeName);
			return $(this.editTypeDialog).dialog('open');
		}
	});

	return EditTypeDialog;
});

