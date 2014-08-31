define(function(require) {
  var SceneSerializer = require("class").extend({
    init: function() {
      this.serializableObjects = [];
      this.name = null;
    },

    setSceneName: function(name) {
      this.name = name;
    },

    add: function(go, goId, group, viewports) {
      var serializableObject = {
        go: go,
        group: group,
        viewports: viewports
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
          id: o.go.typeId,
          g: o.group,
          v: o.viewports,
          x: o.go.x,
          y: o.go.y 
        });
      }

      var scene = {
        name: this.name,
        objects: r
      }

      return JSON.stringify(scene);
    }
  });

  return new SceneSerializer();
});
