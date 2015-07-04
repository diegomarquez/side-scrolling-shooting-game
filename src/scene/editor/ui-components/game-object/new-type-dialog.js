define(function(require) {
	
	var gb = require('gb');
	var dialogModular = require('dialog-modular');
	var dialogTextField = require('dialog-text-field');

	var NewTypeDialog = require('ui-component').extend({
		init: function() {
			var self = this;

			this.onClose = null;

			this.newTypeDialog = new dialogModular().create({
				id: 'new-type-dialog',
				title: 'New Type',
				tip: 'Choose a name for the new type',
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
					})
				],

				buttons: {
					'Create Type': function () {
						if (self.onClose) {
							self.onClose(this.TypeName());	
						}

						$(this).dialog('close');
					}
				},

				validateOnAction: {
					'Create Type': ['Type Name']
				}
			});

			$('#new-type-dialog').on("dialogclose", function() {
				$('#new-type-dialog').dialog('destroy').remove();

				this.newTypeDialog = null;
				this.onClose - null;
			});
		},

		open: function(newTypeDefaultName, onClose) {
			this.onClose = onClose;

			$(this.newTypeDialog).dialog('option').updateField('Type Name', newTypeDefaultName);
			
			return $(this.newTypeDialog).dialog('open');
		}
	});

	return NewTypeDialog;
});

