define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var textInput = require('text-input');
  var button = require('button');

  var ViewportCreator = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = 'viewport-creator';
      
      var textInputUI = new textInput().create({
        defaultMessage: 'Set a viewport name'
      })
      
      var buttonUI = new button().create({
        label: 'Add Viewport',
        onClick: function (event) {
          if (textInputUI.value) {
            if (!gb.viewports.exists(textInputUI.value)) {
              gb.viewports.add(textInputUI.value, gb.canvas.width, gb.canvas.height, 0, 0);
            }
          }
        }
      });
      
      container.appendChild(textInputUI);
      container.appendChild(buttonUI);

      return wrapper.wrap(container);
    }
  });

  return ViewportCreator;
});