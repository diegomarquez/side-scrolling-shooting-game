define(["extension", "gb", "world"], function(Extension, Gb, World) {
  var DisplaySetup = Extension.extend({
    type: function() {
      return Gb.game.CREATE;
    },

    execute: function() {
      World.create(Gb.canvas.width, Gb.canvas.height);

      Gb.groups.add("First");

      var mainViewport = Gb.viewports.add("Main", Gb.canvas.width, Gb.canvas.height, 0, 0);
      mainViewport.addLayer("Front");
      mainViewport.addLayer("Outline");

      // var fastStarsViewport = Viewports.add("FastStars", Gb.canvas.width, Gb.canvas.height, 0, 0);
      // fastStarsViewport.addLayer("Front");

      // var normalStarsViewport = Viewports.add("NormalStars", Gb.canvas.width, Gb.canvas.height, 0, 0);
      // normalStarsViewport.addLayer("Front");

      // var slowStarsViewport = Viewports.add("SlowStars", Gb.canvas.width, Gb.canvas.height, 0, 0);
      // slowStarsViewport.addLayer("Front");

      // var extraSlowStarsViewport = Viewports.add("ExtraSlowStars", Gb.canvas.width, Gb.canvas.height, 0, 0);
      // extraSlowStarsViewport.addLayer("Front");


      // var miniMap = Viewports.add("Mini", Gb.canvas.width-20, Gb.canvas.height/10, 10, 10);

      // miniMap.addLayer("Front");
      // miniMap.setStroke(2, "#FF0000");
      // World.scaleViewportToFit(miniMap);

      // Gb.setViewportShortCut('MainFront', [{viewport:'Main', layer:'Front'}]);
      // Gb.setViewportShortCut('MiniFront', [{viewport:'Mini', layer:'Front'}]);

      // Gb.setViewportShortCut('MainMiniFront', [
      //   {viewport:'Main', layer:'Front'},
      //   {viewport:'Mini', layer:'Front'}
      // ]);

      // Gb.setViewportShortCut('FastStarsFront', [{viewport:'FastStars', layer:'Front'}]);
      // Gb.setViewportShortCut('NormalStarsFront', [{viewport:'NormalStars', layer:'Front'}]);
      // Gb.setViewportShortCut('SlowStarsFront', [{viewport:'SlowStars', layer:'Front'}]);
      // Gb.setViewportShortCut('ExtraSlowStarsFront', [{viewport:'ExtraSlowStars', layer:'Front'}]);

      // var starViewports = ['FastStarsFront', 'NormalStarsFront', 'SlowStarsFront', 'ExtraSlowStarsFront'];

      // Gb.getRandomStarsViewport = function() {
      //   return starViewports[Util.rand_i(0, starViewports.length-1)];
      // }
    }
  });

  return DisplaySetup;
});
