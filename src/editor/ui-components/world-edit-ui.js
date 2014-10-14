define(function(require) {
  var wrapper = require('wrap-in-div');
  var spinner = require('spinner');

  var twoDimentionsInput = require('two-dimentions-input');
  // var oneDimentionInput = require('one-dimention-input');

  // container.appendChild(this.spinner.create({
      //   id: 'LALALA',
      //   min: 0,
      //   max: 100,
      //   step: 10,
      //   value: 0,
      //   disabled: false
      // }));

  var world = require('world');

  var WorldEditUI = require('class').extend({
    init: function() {},

    create: function() {
      var sizeUI = new twoDimentionsInput().create({
        id: 'world-size-container',
        containerClass: 'world-edit-container',
        label: 'World Size',
        labelClass: 'world-edit-label',
        inputClass: 'world-edit-input-double',
        xValue: world.getWidth(),
        yValue: world.getHeight(),
        onXChange: function(event) { 
          world.setWidth(event.target.value);
        },
        onYChange: function(event) { 
          world.setHeight(event.target.value);
        }
      });

      // var stepUI = new oneDimentionInput().create({
      //   id: 'world-step-container',
      //   containerClass: 'world-edit-container',
      //   label: 'World Step',
      //   labelClass: 'world-edit-label',
      //   inputClass: 'world-edit-input-single',
      //   value: world.getStep(),
      //   onChange: function(event) { 
      //     world.setStep(event.target.value);
      //   }
      // });
      
      // return wrapper.wrap(wrapper.wrap([sizeUI.html, stepUI.html], { className: 'world-edit'}));
      return wrapper.wrap(wrapper.wrap([sizeUI.html], { className: 'world-edit'}));
    }
  });

  return WorldEditUI;
});