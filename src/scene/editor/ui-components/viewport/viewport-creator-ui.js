define(function(require) {
	var wrapper = require('wrap-in-div');
	var button = require('button');
	var dialog = require('dialog');

	var gb = require('gb');
	var editorConfig = require('editor-config');
	var editorViewports = require('editor-viewports');
	
	var ViewportCreator = require('ui-component').extend({
		init: function() {
			this.viewportDialogUI = null;
			this.buttonUI = null;
		},

		create: function(options) {
			this.viewportDialogUI = new dialog().create({
				id: 'add-viewport-dialog',
				title: 'Add a viewport',
				tip: 'Use a unique name',
				autoOpen: false,
				height: 'auto',
				width: 'auto',
				minWidth: 300,
				modal: true,
				
				fields: [
					{ 
						name: 'Name', 
						value: '',
						validations: [
							{
								check: function(viewportName) { return viewportName != ''; },
								tip: "Viewport name can't be empty"
							},
							{
								check: function(viewportName) { return !gb.viewports.exists(viewportName); },
								tip: 'The viewport name is already in use'
							}
						]
					},
					{ 
						name: 'Width', 
						value: gb.canvas.width,
						validations: [
							{
								check: function(width) { return width > 0; },
								tip: "Width must be greater than 0"
							},
							{
								check: function(canvasWidth) {
									return function (width) { return width <= canvasWidth; }
								}(gb.canvas.width),
								tip: "Width must be less than or equal to " + gb.canvas.width
							}
						]
					},
					{ 
						name: 'Height', 
						value: gb.canvas.height,
						validations: [
							{
								check: function(height) { return height > 0; },
								tip: "Height must be greater than 0"
							},
							{
								check: function(canvasHeight) {
									return function (height) { return height <= canvasHeight; }
								}(gb.canvas.height),
								tip: "Height must be less than or equal to " + gb.canvas.height
							}
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
						value: 1,
						validations: [
							{
								check: function(scale) { return scale > 0; },
								tip: "Scale X must be greater to 0"
							}
						]
					},
					{ 
						name: 'Scale Y', 
						value: 1,
						validations: [
							{
								check: function(scale) { return scale > 0; },
								tip: "Scale Y must be greater to 0"
							}
						]
					},
					{ 
						name: 'Stroke Color', 
						value: 'none'
					},
					{ 
						name: 'Stroke Width', 
						value: 'none'
					}
				],

				buttons: {
					Add: function () {
						editorViewports.add(
							this.Name(), 
							this.Width(), 
							this.Height(), 
							this.OffsetX(), 
							this.OffsetY(),
							this.ScaleX(), 
							this.ScaleY(),
							null,
							this.StrokeColor(),
							this.StrokeWidth()
						).NoClipping().NoCulling().NoMouseBounded();

						gb.viewports.before(this.Name(), editorConfig.getGridViewportName()); 
						 
						$(this).dialog('close');
					}
				},

				validateOnAction: {
					'Add': ['Name', 'Width', 'Height', 'Scale X', 'Scale Y'] 
				}
			});
			
			this.buttonUI = new button().create({
				label: 'Add Viewport',
				onClick: function (event) {
					this.viewportDialogUI.dialog('open');
				}.bind(this)
			});

			$(this.buttonUI).button();

			return wrapper.wrap([this.buttonUI], {
				id: 'viewport-creator',
				classNames: ['well', 'well-small']
			});
		},

		destroy: function() {
			$(this.buttonUI).button('destroy');
		}
	});

	return ViewportCreator;
});