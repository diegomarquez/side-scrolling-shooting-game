define(function(require) {

  var gb = require('gb');

  var editorConfig = require('editor-config');
  var sceneName = require('scene-name');

  var SceneSerializer = require("class").extend({
    init: function() {
      this.serializableObjects = [];
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
      if (!this.check()) return;

      // Serialize Game Objects
      var gos = [];

      for (var i = 0; i < this.serializableObjects.length; i++) {
        var o = this.serializableObjects[i];

        gos.push({
          id: o.go.typeId,
          g: o.group,
          v: o.viewports,
          x: o.go.x,
          y: o.go.y 
        });
      }

      // Serialize Update Groups
      var groups = gb.groups.allGroupNames();

      // Serialize viewports
      var vs = [];

      var allViewports = gb.viewports.allAsArray();

      for (i = 0; i < allViewports.length; i++) {
        var v = allViewports[i];

        // Do not serialize 'Outline' layer
        var layerNames = v.getLayers().map(function(layer) { return layer.name; });
        layerNames.splice(layerNames.indexOf(editorConfig.getOutlineLayerName()));

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
          layers: layerNames 
        });
      }

      var scene = {
        name: sceneName.get(),
        objects: gos,
        groups: groups,
        viewports: vs
      }

      return JSON.stringify(scene);
    },

    check: function () {
      if (!sceneName.get()) {
        return false;
      }

      return true;
    }
  });

  return new SceneSerializer();
});
