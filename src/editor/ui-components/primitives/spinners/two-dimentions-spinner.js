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
        onSpin: options.onSpinX
      });

      var spinnerY = new spinnerUI().create({
        id: options.id + '-Y',
        value: options.valueY,
        max: options.maxY,
        min: options.minY,
        step: options.stepY,
        onChange: options.onChangeY,
        onSpin: options.onSpinY
      });

      return wrapper.wrap([wrapper.wrap(label), wrapper.wrap(spinnerX), wrapper.wrap(spinnerY)], {
        id: options.id,
        classNames: ['ui-widget', 'two-dimentional-spinner']
      });
    }
  });

  return TwoDimentionsSpinner;
});