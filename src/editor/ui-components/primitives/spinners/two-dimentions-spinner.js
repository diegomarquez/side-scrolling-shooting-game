define(function(require) {
  
  var wrapper = require('wrap-in-div');
  var spinnerUI = require('spinner');

  var TwoDimentionsSpinner = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var label = document.createElement('label');

      label.innerHTML = options.label;

      var spinnerX = new spinnerUI().create({
        id: options.id + '-X',
        value: options.valueX,
        max: options.maxX,
        min: options.minX,
        step: options.stepX,
        onChange: options.onChangeX,
        onSpin: options.onSpinX,
        onStop: options.onStopX
      });

      var spinnerY = new spinnerUI().create({
        id: options.id + '-Y',
        value: options.valueY,
        max: options.maxY,
        min: options.minY,
        step: options.stepY,
        onChange: options.onChangeY,
        onSpin: options.onSpinY,
        onStop: options.onStopY
      });

      return {
        html: wrapper.wrap([wrapper.wrap(label), wrapper.wrap(spinnerX.html), wrapper.wrap(spinnerY.html)], {
          id: options.id,
          classNames: ['ui-widget', 'two-dimentional-spinner', 'well', 'well-small']
        }),
        controller: {
          X: spinnerX.controller,
          Y: spinnerY.controller
        }
      }
    }
  });

  return TwoDimentionsSpinner;
});