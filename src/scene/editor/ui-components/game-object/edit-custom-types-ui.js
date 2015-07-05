define(function(require) {
	var editorConfig = require('editor-config');

	var wrapper = require('wrap-in-div');
	var dropdown = require('dropdown-scroll');

	var gb = require('gb');
	var editorDelegates = require('editor-delegates');
	var editTypeDialog = require('edit-type-dialog');

	var CustomGameObjectSelector = require('ui-component').extend({
		init: function() {
			this.customTypeSelector = null;
			this.editTypeDialog = null;
		},

		create: function() {
			var self = this;

			this.customTypeSelector = new dropdown().create({
				id: 'custom-game-object-selector',
				icon: 'chevron-down',
				defaultMessage: 'Edit Custom Types',
				buttons: true,
				data: function() {     
					return gb.goPool.getConfigurationTypes({ customOnly: true });
				},
				onClick: function(value) {
					self.editTypeDialog = new editTypeDialog(true, true);

					// Show the dialog to edit the new configuratio's name
					self.editTypeDialog.open(value);

					self.editTypeDialog.on('edit', this, function (newConfigurationName, oldConfigurationName) {
						gb.goPool.updateConfigurationId(oldConfigurationName, newConfigurationName);
					});

					self.editTypeDialog.on('delete', this, function (configurationName) {
						gb.reclaimer.clearGameObjectConfiguration(configurationName);
					});
				}
			});

			this.customTypeSelector.disable()
			
			editorDelegates.add(gb.goPool, gb.goPool.CREATE_CONFIGURATION, this, function (configuration) {
				this.customTypeSelector.refresh();
				this.customTypeSelector.enable();
			});

			editorDelegates.add(gb.goPool, gb.goPool.UPDATE_CONFIGURATION, this, function (configuration) {
				this.customTypeSelector.refresh();
			});

			editorDelegates.add(gb.goPool, gb.goPool.CLEAR_CONFIGURATION, this, function (configuration) {
				this.customTypeSelector.refresh();

				if (gb.goPool.getConfigurationTypes({ customOnly: true }).length == 0) {
					this.customTypeSelector.disable();		
				}
			});

			return wrapper.wrap(this.customTypeSelector.html, {
				id: 'custom-game-object-selector-wrapper',
				classNames: ['well', 'well-small']
			});
		},
	});

	return CustomGameObjectSelector;
});