define(function(require) {
	var editorConfig = require('editor-config');
	var setupViewport = require('setup-viewport');
	var componentFactory = require('ui-component-factory');

	var wrapper = require('wrap-in-div');
	var gb = require('gb');
	var world = require('world');

	var checkboxSet = require('checkbox-set');
	var editableDropdown = require('editable-dropdown-add-remove');
	var dialogUI = require('dialog');

	var addLayerDialogUI = null; 
	var editViewportDialogUI = null;

	var ViewportEditor = require('ui-component').extend({
		init: function() {
			this.container = null;
			this.checkboxSetUI = null;
			this.layersUI = null;

			createLayerDialog();
			createEditDialog();
		},

		create: function(options) {
			var container = document.createElement('div');
			container.id = 'viewport-control';
			container.className = 'viewport-control'
			
			$(container).attr('viewport-name', options.viewport.name);

			// Button set with main options
			var checkboxSetUI = new checkboxSet().create({
				id: 'viewport-checkboxes-' + options.viewport.name,
				containerClass: 'viewport-checkboxes',
				checkboxes: getOptions(options.viewport, container)
			});

			// Viewport layers selector. Skips the 'Outline layer that all viewports have'
			var layersUI = new editableDropdown().create({
				id: 'layers-' + options.viewport.name,
				defaultMessage: 'Arrange Layers',
				data: function() {
					return editorConfig.getViewportLayers(options.viewport);
				},
				onAdd: function() {
					$(addLayerDialogUI).dialog('option', 'viewport', options.viewport);
					$(addLayerDialogUI).dialog('option', 'title', 'Add a new layer in viewport ' + options.viewport.name);
					$(addLayerDialogUI).dialog('open');
				},
				onEdit: function(value, newIndex) {
					options.viewport.changeLayer(value, newIndex);
				},
				onRemove: function(layerName) {
					options.viewport.removeLayer(layerName);
				}
			});

			// When a layer is added, refresh the content of the UI
			options.viewport.on(options.viewport.ADD, this, function (layer) {
				layersUI.refresh();
			});

			container.appendChild(checkboxSetUI.html);
			container.appendChild(layersUI.html);  

			this.container = container;
			this.checkboxSetUI = checkboxSetUI;
			this.layersUI = layersUI;
			this.wrapped = $(wrapper.wrap(container, { classNames: ['well', 'well-small'] }));

			// Setup the bootstrap tooltip
			this.wrapped.tooltip({
				container: 'body',
				title: options.viewport.name,
				placement: 'left',
				trigger: 'manual'
			})
			.on('mouseenter', function() {  
				if (canShowTooltip) {
					$(this).tooltip('show');
				}
			})
			.on('mouseleave', function() {
				$(this).tooltip('hide');
			})
			.on('mousedown', function(event) {
				$(this).tooltip('hide');
			});

			return componentFactory.getControllerWithParent(this.wrapped[0], this);
		},

		destroy: function() {
			this.wrapped.tooltip('destroy');
		}
	});

	ViewportEditor.destroy = function() {
		$(addLayerDialogUI).dialog('destroy').remove();
		$(editViewportDialogUI).dialog('destroy').remove();

		addLayerDialogUI = null;
		editViewportDialogUI = null;
	}
	
	var canShowTooltip = true;

	$(document).on('mousedown', function() {
		canShowTooltip = false;
	});

	$(document).on('mouseup', function() {
		canShowTooltip = true;
	});

	var getOptions = function(viewport) {
		var buttons;

		if (viewport.name == editorConfig.getMainViewportName()) {
			// Options available on Main viewport
			buttons = [
				getVisibilityButton
			]
		} else {
			// Options available on additional viewports
			buttons = [
				getEditButton,
				getOutlineButton,
				getFitToWorldButton,
				getVisibilityButton,
				getRemoveButton
			]
		}

		var args = arguments;

		return $.map(buttons, function(f) {
			return f.apply(null, args);
		});
	}

	var getEditButton = function(viewport, container) { 
		return {
			label: 'Edit',
			onChange: function (event) {
				editViewportDialogUI.dialog('option', 'viewport', viewport);
				editViewportDialogUI.dialog('option', 'title', 'Edit viewport ' + viewport.name);

				if (viewport.WorldFit) {
					editViewportDialogUI.dialog('option', 'disableField')('ScaleX');
					editViewportDialogUI.dialog('option', 'disableField')('ScaleY');
				} else {
					editViewportDialogUI.dialog('option', 'enableField')('ScaleX');
					editViewportDialogUI.dialog('option', 'enableField')('ScaleY');
				}
				
				editViewportDialogUI.dialog('option', 'setField')('Width', viewport.Width);
				editViewportDialogUI.dialog('option', 'setField')('Height', viewport.Height);
				editViewportDialogUI.dialog('option', 'setField')('OffsetX', viewport.OffsetX);
				editViewportDialogUI.dialog('option', 'setField')('OffsetY', viewport.OffsetY);	
				editViewportDialogUI.dialog('option', 'setField')('ScaleX', viewport.ScaleX);
				editViewportDialogUI.dialog('option', 'setField')('ScaleY', viewport.ScaleY);
				editViewportDialogUI.dialog('option', 'setField')('StrokeColor', viewport.getStroke().color);
				editViewportDialogUI.dialog('option', 'setField')('StrokeWidth', viewport.getStroke().width);

				editViewportDialogUI.dialog('open');
			}
		}
	}

	var getOutlineButton = function(viewport, container) {
		return {
			label: editorConfig.getOutlineLayerName(),
			onChange: function (event) {
				if (event.target.checked) {
					setupViewport.addOutline(viewport.name);
				}
				else { 
					setupViewport.removeOutline(viewport.name);
				}
			}
		}
	}

	var getFitToWorldButton = function(viewport, container) { 
		return {
			label: 'Fit World',
			state: viewport.WorldFit,
			onChange: function (event) {
				if (event.target.checked) {
					world.scaleViewportToFit(viewport);
				} 
				else {
					world.resetViewportScale(viewport);
				}
			}
		}
	}

	var getVisibilityButton = function(viewport, container) {
		return {
			onLabel: 'Show',
			offLabel: 'Hide',
			onChange: function (event) {
				if (event.target.checked) {
					viewport.hide()
				} else {
					viewport.show()
				}
			}
		}
	}

	var getRemoveButton = function (viewport, container) {
		return {
			label: 'Remove',
			onChange: function (event) {
				gb.viewports.remove(viewport.name);
			}
		}
	}

	var createLayerDialog = function() {
		if (addLayerDialogUI)
			return;

		addLayerDialogUI = new dialogUI().create({
			id: 'add-layer-dialog',
			tip: 'Use a unique name',
			autoOpen: false,
			height: 'auto',
			width: 'auto',
			minWidth: 350,
			modal: true,
			viewport: null,
			fields: [
				{ 
					name: 'Layer Name', 
					value: '',
					validations: [
						{
							check: function(value) { return value != ''; },
							tip: "Layer name can't be empty"
						},
						{
							check: function(value) { return !$(this).dialog('option', 'viewport').layerExists(value); },
							tip: 'This layer Id is already in use'
						}
					]
				}
			],

			buttons: {
				Add: function () {
					$(this).dialog('option', 'viewport').addLayerBefore(this.LayerName(), editorConfig.getOutlineLayerName());
					$(this).dialog('close');
				}
			},

			validateOnAction: {
				'Add': ['Layer Name'] 
			}
		});
	}

	var createEditDialog = function() {
		if (editViewportDialogUI)
			return;

		editViewportDialogUI = new dialogUI().create({
			id: 'edit-viewport-dialog',
			tip: '',
			autoOpen: false,
			height: 'auto',
			width: 'auto',
			minWidth: 300,
			modal: true,
			resetOnClose: true,
			viewport: null,
			
			fields: [
				{ 
					name: 'Width', 
					value: 0,
					validations: [
						{
							check: function(width) { return width > 0; },
							tip: "Width must be greater than 0"
						}
					]
				},
				{ 
					name: 'Height', 
					value: 0,
					validations: [
						{
							check: function(height) { return height > 0; },
							tip: "Height must be greater than 0"
						},
					]
				},
				{ 
					name: 'Offset X', 
					value: 0
				},
				{ 
					name: 'Offset Y', 
					value: 0
				},
				{ 
					name: 'Scale X', 
					value: 0,
					validations: [
						{
							check: function(scale) { return scale > 0; },
							tip: "Scale X must be greater to 0"
						}
					]
				},
				{ 
					name: 'Scale Y', 
					value: 0,
					validations: [
						{
							check: function(scale) { return scale > 0; },
							tip: "Scale Y must be greater to 0"
						}
					]
				},
				{ 
					name: 'Stroke Color', 
					value: 0
				},
				{ 
					name: 'Stroke Width', 
					value: 0
				}
			],

			buttons: {
				Save: function () {
					var v = $(this).dialog('option', 'viewport');

					v.Width = this.Width();
					v.Height = this.Height();
					v.OffsetX = this.OffsetX();
					v.OffsetY = this.OffsetY();
					v.ScaleX = this.ScaleX();
					v.ScaleY = this.ScaleY();
					v.setStroke(this.StrokeWidth(), this.StrokeColor());

					if(v.WorldFit) {
						world.scaleViewportToFit(v);
					}

					$(this).dialog('close');
				}
			},

			validateOnAction: {
				'Save': ['Width', 'Height', 'Scale X', 'Scale Y'] 
			}
		});	
	}
	
	return ViewportEditor;
});

