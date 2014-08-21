define(["extension", "viewports", "sat", "vector-2D", "gb", "game-object"], 
  function(Extension, Viewports, SAT, Vector2D, Gb, GameObject) {
 
  var p1 = new Vector2D();
  var p2 = new Vector2D();
  var p3 = new Vector2D();
  var p4 = new Vector2D();
  var mouseWorldPos = new Vector2D();
  var m = null;
  var r = null;
  var t_go = null;
  var rOffsetX, rOffsetY, rWidth, rHeight;

  var clickData = {
    go: null,
    viewport: null
  }

  var gameObjectCollider = new SAT.FixedSizePolygon(
    new Vector2D(),
    [ new Vector2D(), new Vector2D(), new Vector2D(), new Vector2D() ]
  );

  var MouseEvents = Extension.extend({
    type: function() {
      return Gb.game.CREATE;
    },

    execute: function() {
      // Register to canvas 'click' event
      Gb.canvas.addEventListener('click', function(event) {
        var allViewports = Viewports.allAsArray();
        var x = event.x;
        var y = event.y;

        // Loop over every viewport, do so backwards so the things on top are processed first.
        for (var i=allViewports.length-1; i >= 0; i--) {
          var viewport = allViewports[i];

          // Work only with viewports configured to interect with the mouse and only if a click occured inside the viewport
          if (viewport.mouseEnabled() && viewport.isPointInside(x, y)) {
            // Convert the mouse position to local viewport coordinates
            viewport.canvasToLocalCoordinates(x, y, mouseWorldPos); 
            
            // Find the top most game object that was clicked in any of the layers of the viewport
            var go = loopLayers.call(viewport, mouseWorldPos);

            // If a game object was found, execute it's click callback and break out of the loop
            // The callback receives the game-object that was clicked on and the viewport it was clicked on
            if (go) {
              clickData.go = go;
              clickData.viewport = viewport;
              go.execute(go.CLICK, clickData);
              break;
            }
          }          
        }
      }, false);
    }
  });


  var loopLayers = function(mouse) {
    // Loop over all the layers of the viewport
    for (var i = this.layers.length-1; i >= 0 ; i--) {
      // Find the game-object that is in the absolute top most position, including layer and viewport draw order
      var go = gameObjectUnderPoint.call(this.layers[i], this, mouse);

      // If something is found, return it and break out of the loop
      if (go) {
        return go;
      }
    }

    //  Nothing was found
    return null;
  }

  var gameObjectUnderPoint = function(viewport, mouse) {
    // Iterate over all the game objects in a layer, do so backwards to process first the ones that are drawn last. 
    for (var i = this.gameObjects.length-1; i >= 0; i--) {
      t_go = this.gameObjects[i];
      
      r = t_go.renderer;

      // Only work with game objects which have a renderer, have registered click events and are visible in the viewport
      if (r && t_go.isRegistered(t_go.CLICK) && t_go.getViewportVisibility(viewport.name)) {
        m = t_go.matrix;

        rOffsetX = r.rendererOffsetX();
        rOffsetY = r.rendererOffsetY();
        rWidth = r.rendererWidth();
        rHeight = r.rendererHeight();
        
        // Fill in the data of a temporary polygon collider to test against the mouse coordinates
        gameObjectCollider.points[0] = m.transformPoint(rOffsetX, rOffsetY, p1);
        gameObjectCollider.points[1] = m.transformPoint(rOffsetX + rWidth, rOffsetY, p2);;
        gameObjectCollider.points[2] = m.transformPoint(rOffsetX + rWidth, rOffsetY + rHeight, p3);
        gameObjectCollider.points[3] = m.transformPoint(rOffsetX, rOffsetY + rHeight, p4);

        // Setup the collider
        gameObjectCollider.recalc();

        // A game object was clicked? 
        if (SAT.pointInPolygon(mouse, gameObjectCollider)) {
          // Return it
          return t_go;
        } 
      }
    }

    // Nothing was clicked in the current viewport
    return null;
  }
  
  Object.defineProperty(GameObject.prototype, "CLICK", { get: function() { return 'click'; } });

  return MouseEvents;
});






