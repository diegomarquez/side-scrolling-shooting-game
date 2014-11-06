define(function(require) {
  var gb = require('gb');
  var editorConfig = require('editor-config');

  var SceneSerializer = require("class").extend({
    init: function() {
      this.serializableObjects = [];
    },

    add: function(go) {
      this.serializableObjects.push(go);

      go.on(go.RECYCLE, this, function (go) {
        this.serializableObjects.splice(this.serializableObjects.indexOf(go), 1);
      });
    },

    serialize: function(sceneName) {
      // Serialize Game Objects
      var gos = [];

      for (var i = 0; i < this.serializableObjects.length; i++) {
        var o = this.serializableObjects[i];

        gos.push({
          id: o.go.typeId,
          g: o.getUpdateGroup(),
          v: o.getViewportList(),
          x: o.go.x,
          y: o.go.y 
        });
      }

      // Serialize Update Groups
      var groups = gb.groups.allGroupNames();

      // Serialize viewports
      var vs = [];

      var allViewports = editorConfig.getViewports();

      for (i = 0; i < allViewports.length; i++) {
        var v = allViewports[i];

        vs.push({
          name: v.name,
          width: v.Width,
          height: v.Height,
          offsetX: v.OffsetX,
          offsetY: v.OffsetY, 
          scaleX: v.ScaleX,
          scaleY: v.ScaleY,
          stroke: v.getStroke(),
          worldFit: v.WorldFit,
          layers: editorConfig.getViewportLayers(v)
        });
      }

      var scene = {
        name: sceneName,
        objects: gos,
        groups: groups,
        viewports: vs
      }

      return JSON.stringify(scene);
    }
  });

  return new SceneSerializer();
});
