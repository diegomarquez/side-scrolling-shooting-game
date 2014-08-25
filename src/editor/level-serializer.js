define(function(require) {
  var GameObjectSerializer = require("class").extend({
    init: function() {
      this.serializableObjects = [];
      this.name = null;
    },

    setLevelName: function(name) {
      this.name = name;
    },

    add: function(go, displayProperties) {
      var serializableObject = {
        go: go,
        group: displayProperties.selectedGroup,
        viewport: displayProperties.selectedViewport
      };

      this.serializableObjects.push(serializableObject);

      go.on(go.RECYCLE, this, function() {
        this.serializableObjects.splice(this.serializableObjects.indexOf(serializableObject), 1);
      });
    },

    serialize: function() {
      var r = [];

      for (var i = 0; i < this.serializableObjects.length; i++) {
        var o = this.serializableObjects[i];

        r.push({
          id: o.typeId,
          updateGroup: o.group,
          viewport: o.viewport,
          x: o.go.x,
          y: o.go.y 
        });
      }

      var level = {
        name: this.name,
        objects: r
      }

      return JSON.stringify(level);
    }
  });

  return new GameObjectSerializer();
});
