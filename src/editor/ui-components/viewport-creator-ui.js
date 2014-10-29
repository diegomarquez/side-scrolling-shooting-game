define(function(require) {
  var wrapper = require('wrap-in-div');
  var button = require('button');
  var dialog = require('dialog');

  var gb = require('gb');
  var editorConfig = require('editor-config');
  
  var ViewportCreator = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var viewportDialogUI = new dialog().create({
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
            gb.viewports.add(
              this.Name(), 
              this.Width(), 
              this.Height(), 
              this.OffsetX(), 
              this.OffsetY(),
              this.ScaleX(), 
              this.ScaleY(),
              null,
              this.StrokeColor(),
              this.StrokeWidth(),
              false
            );

            gb.viewports.before(this.Name(), editorConfig.getGridViewportName()); 
             
            $(this).dialog('close');
          }
        },

        validateOnAction: {
          'Add': ['Name', 'Width', 'Height', 'Scale X', 'Scale Y'] 
        }
      });
      
      var buttonUI = new button().create({
        label: 'Add Viewport',
        onClick: function (event) {
          viewportDialogUI.dialog('open');
        }
      });

      $(buttonUI).button();

      return wrapper.wrap([buttonUI], {
        id: 'viewport-creator'
      });
    }
  });

  return ViewportCreator;
});