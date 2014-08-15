define(function(require) {


  var Mouse = require('delegate').extend({
    init: function() {
      this._super();

      this.canvas = null;
    },

    setup: function(canvas) {
      this.canvas = canvas;
    }

    onClickViewport: function(viewport, scope, callback) {
      this.on('click', scope, callback);
    }

    onClickCanvas: function(scope, callback) {
      this.on('click', scope, callback);
    }

    onClickGameObject: function(go, scope, callback) {
      this.on('click', scope, callback);
    }
  });

  var mouse = new Mouse();

  mouse.canvas.addEventListener('click', function(event) {
    mouse.execute('click', event)


    // event.x
    // event.y
  }, false);

  return mouse;
});

// define(function(require) {

//   var gb = require('gb');

//   var MouseDetection = require("class").extend({
//     init: function() {

//     },

//     create: function() {
//       canvas = document.getElementById('game');

//       canvas.addEventListener('mouseup', function(evt) {
//         console.log(event.x);

//         // event.x
//         // event.y
//       }, false);
//     }
//   });

//   return new MouseDetection();
// });


