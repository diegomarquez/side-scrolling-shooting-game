define(function(require) {
  var wrapper = require('wrap-in-div');
  var componentFactory = require('ui-component-factory');
  var spinnerUI = require('spinner');

  var TwoDimentionsSpinner = require('class').extend({
    init: function() {
      this.spinnerX = null;
      this.spinnerY = null;
    },

    create: function(options) {
      var label = document.createElement('label');

      label.innerHTML = options.label;

      this.spinnerX = new spinnerUI().create({
        id: options.id + '-X',
        value: options.valueX,
        max: options.maxX,
        min: options.minX,
        step: options.stepX,
        onChange: options.onChangeX,
        onSpin: options.onSpinX,
        onStop: options.onStopX
      });

      this.spinnerY = new spinnerUI().create({
        id: options.id + '-Y',
        value: options.valueY,
        max: options.maxY,
        min: options.minY,
        step: options.stepY,
        onChange: options.onChangeY,
        onSpin: options.onSpinY,
        onStop: options.onStopY
      });

      return componentFactory.getController({
          controller: {
            X: this.spinnerX.controller,
            Y: this.spinnerY.controller
          }
        }, 
        wrapper.wrap([wrapper.wrap(label), wrapper.wrap(this.spinnerX.html), wrapper.wrap(this.spinnerY.html)], {
          id: options.id,
          classNames: ['ui-widget', 'two-dimentional-spinner', 'well', 'well-small']
        }));
    }
  });

  return TwoDimentionsSpinner;
});