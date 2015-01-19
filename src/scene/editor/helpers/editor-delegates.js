define(function(require) {
  var gb = require('gb');
  var world = require('world');
  
  var EditorDelegates = require('class').extend({
    init: function() {
    	this.delegates = [];
    },

    add: function(object, delegateName, scope, callback) {
      object.on(delegateName, scope, callback, false, false, false, 'editor-delegate');

      storeDelegate(object, this.delegates);
    },

    clean: function() {
    	while (this.delegates.length) {
    		this.delegates.pop().levelCleanUp('editor-delegate');	
    	}
    }
  });

  var storeDelegate = function(delegate, collection) {
  	for (var i = 0; i < collection.length; i++) {
    	if (collection[i] === delegate) {
    		return;
    	}
    }	

    collection.push(delegate);
  }

  return new EditorDelegates();
});



      
      
      