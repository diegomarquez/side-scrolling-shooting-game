define(function(require) {

	var gb = require('gb');

	var CustomGameObjectSelector = require('ui-component').extend({
		init: function() {
			this.customTypeSelector = null;
			this.editTypeDialog = null;
		},

		show: function(event) {
			this.customTypeSelector.show(event);
		},

		create: function() {
			var self = this;

			this.customTypeSelector = new (require('dropdown-scroll'))().create({
				id: 'custom-game-object-selector',
				icon: 'chevron-down',
				defaultMessage: 'Edit Custom Types',
				buttons: true,
				data: function() {     
					return gb.goPool.getConfigurationTypes({ customOnly: true });
				},
				onClick: function(value) {
					self.editTypeDialog = new (require('edit-type-dialog'))(true, true);

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
			
			require('editor-delegates').add(gb.goPool, gb.goPool.CREATE_CONFIGURATION, this, function (configuration) {
				this.customTypeSelector.refresh();
				this.customTypeSelector.enable();
			});

			require('editor-delegates').add(gb.goPool, gb.goPool.UPDATE_CONFIGURATION, this, function (configuration) {
				this.customTypeSelector.refresh();
			});

			require('editor-delegates').add(gb.goPool, gb.goPool.CLEAR_CONFIGURATION, this, function (configuration) {
				this.customTypeSelector.refresh();

				if (gb.goPool.getConfigurationTypes({ customOnly: true }).length == 0) {
					this.customTypeSelector.disable();		
				}
			});

			return require('wrap-in-div').wrap(this.customTypeSelector.html, {
				id: 'custom-game-object-selector-wrapper',
				classNames: ['well', 'well-small']
			});
		},
	});

	return CustomGameObjectSelector;
});