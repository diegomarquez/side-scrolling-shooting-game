define(["extension", "gb", "world"], function(Extension, Gb, World) {
  var DisplaySetup = Extension.extend({
    type: function() {
      return Gb.game.CREATE;
    },

    execute: function() {
      World.create(Gb.canvas.width, Gb.canvas.height, 50);

      Gb.groups.add("First");

      var mainViewport = Gb.viewports.add("Main", Gb.canvas.width, Gb.canvas.height, 0, 0);
      mainViewport.addLayer("Back");
      mainViewport.addLayer("Middle");
      mainViewport.addLayer("Front");
      mainViewport.addLayer("Outline");
    }
  });

  return DisplaySetup;
});
