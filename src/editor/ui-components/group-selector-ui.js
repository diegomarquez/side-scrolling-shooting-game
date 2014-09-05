define(function(require) {

  var wrapper = require('wrap-in-div');
  var dropdown = require('dropdown');
  var gb = require('gb');

  var GroupSelector = require('class').extend({
    init: function() {

    },

    create: function() {
      var selector = new dropdown().create({
        id: 'group-selector',
        defaultMessage: 'Choose an Update Group',
        data: gb.groups.allGroupNames()
      });

      return wrapper.wrap(selector);
    }
  });

  return GroupSelector;
});