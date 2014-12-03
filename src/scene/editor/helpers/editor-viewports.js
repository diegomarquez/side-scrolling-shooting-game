define(function(require) {

	var EditorViewports = function() {};

	EditorViewports.prototype.add = function() {
  	return {
  		viewport: add.apply(null, arguments),

  		NoClipping: function() {
  			this.viewport.Clipping = false;
  			return this;
  		},

  		NoCulling: function(value) {
  			this.viewport.Culling = false;
  			return this;
  		},

  		NoMouse: function(value) {
  			this.viewport.MouseEnabled = false;
  			return this;
  		},

  		NoMouseBounded: function(value) {
  			this.viewport.MouseBounded = false;
  			return this;
  		}
  	};
  }

  var add = function() {
  	var gb = require('gb');

  	if (arguments.length === 1) {
  		return gb.viewports.addFromObject.apply(gb.viewports, arguments);
  	} else {
  		return  gb.viewports.add.apply(gb.viewports, arguments);
  	}
  }

  return new EditorViewports();
});