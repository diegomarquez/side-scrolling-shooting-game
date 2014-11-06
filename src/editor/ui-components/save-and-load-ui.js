define(function(require) {

  var wrapper = require('wrap-in-div');

  var saveButtonUI = require('scene-save-ui');
  var loadButtonUI = require('scene-load-ui');

  var SceneSave = require('class').extend({
    init: function() {
      
    },

    create: function() {
      var saveUI = new saveButtonUI().create();
      var loadUI = new loadButtonUI().create();
      
      return wrapper.wrap([saveUI, loadUI], {
        id: 'save-and-load-buttons',
        classNames: ['well', 'well-small']
      });
    }
  });
  
  return SceneSave;
});