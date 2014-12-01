define(function(require) {
  var gb = require('gb');
  var world = require('world');
  
  var EditorDelegates = require('class').extend({
    init: function() {},

    add: function(object, delegateName, scope, callback) {
      object.on(delegateName, scope, callback, false, false, false, 'editor-delegate');
    },

    clean: function() {
      gb.groups.levelCleanUp('editor-delegate');
      gb.viewports.levelCleanUp('editor-delegate');
      gb.goPool.levelCleanUp('editor-delegate');
      gb.coPool.levelCleanUp('editor-delegate');
      world.levelCleanUp('editor-delegate');
    }
  });

  return new EditorDelegates();
});



      
      
      