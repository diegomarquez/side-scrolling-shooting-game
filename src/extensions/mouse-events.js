define(["extension", "viewports", "sat", "vector-2D", "gb", "game-object", "delegate"], 
  function(Extension, Viewports, SAT, Vector2D, Gb, GameObject, Delegate) {
 
  var p1 = new Vector2D();
  var p2 = new Vector2D();
  var p3 = new Vector2D();
  var p4 = new Vector2D();
  
  var m = null;
  var r = null;
  var t_go = null;
  var rOffsetX, rOffsetY, rWidth, rHeight;

  var gameObjectCollider = new SAT.FixedSizePolygon(
    new Vector2D(),
    [ new Vector2D(), new Vector2D(), new Vector2D(), new Vector2D() ]
  );
  
  var mouseWorldPos = new Vector2D();
  var mouseMoveWorldPos = new Vector2D();

  var Mouse = Delegate.extend({
    init: function() {
      this._super();
    }
  });

  Object.defineProperty(Mouse.prototype, "NOTHING_CLICKED_ON_CANVAS", { get: function() { return 'nothing_clicked_on_canvas'; } });
  Object.defineProperty(Mouse.prototype, "CLICKED_OUTSIDE_CANVAS", { get: function() { return 'clicked_outside_canvas'; } });

  var MouseEvents = Extension.extend({
    type: function() {
      return Gb.game.CREATE;
    },

    execute: function() {
      // Reference to the last object that executed a delegate on the MOUSE_DOWN event
      var currentMouseDownData = null;

      Gb.canvas.addEventListener('mousedown', function (event) {
        var mouseDownData = getTopMostObject(event);

        // Execute delegate only if some mouse data was returned
        if (mouseDownData) {
          // Store the reference to this mouseDownData, it is used in other events to tell if they are related to this one
          currentMouseDownData = mouseDownData;
          // Execute MOUSE_DOWN event with the current mouseDownData object
          // It contains a Game Object and the viewport it belongs to
          mouseDownData.go.execute(mouseDownData.go.MOUSE_DOWN, mouseDownData);
          // Start the dragging sequence if the game objects has registered events
          startDrag(event, mouseDownData);
        }
      }, false);

      Gb.canvas.addEventListener('mouseup', function (event) {
        var mouseUpData = getTopMostObject(event);

        // Execute delegate only if some mouse data was returned and a MOUSE_DOWN event occured previously
        if (mouseUpData && currentMouseDownData) {
          // Execute MOUSE_UP event with the current mouseUpData object
          // It contains a Game Object and the viewport it belongs to
          mouseUpData.go.execute(mouseUpData.go.MOUSE_UP, mouseUpData);

          // If the mouseUpData object and the last mouseDownData objects have the same data ...
          if (areMouseDataEqual(mouseUpData, currentMouseDownData)) {
            // Execute CLICK event with the current mouseUpData object
            // It contains a Game Object and the viewport it belongs to
            mouseUpData.go.execute(mouseUpData.go.CLICK, mouseUpData);
          }
        } else {
          // Nothing was clicked, execute a delegate to capture this global mouse state
          Gb.Mouse.execute(Gb.Mouse.NOTHING_CLICKED_ON_CANVAS, event);
        }

        // Stop the dragging sequence
        stopDrag(event, mouseUpData);
        // Reset current MOUSE_DOWN data because by now the whole clicking cycle is over 
        currentMouseDownData = null;
      }, false);

      Gb.canvas.addEventListener('mouseout', function (event) {
        // Moving outside the canvas resets the mouse state
        stopDrag(event, currentMouseDownData);
        currentMouseDownData = null;
      });

      // Any click outside the Canvas triggers a NOTHING_CLICKED event
      // Clicks on elements which are covering the canvas don't trigger this event
      document.body.addEventListener('mouseup', function (event) {
        if(event.target !== Gb.canvas) {
          var globalX, globalY;

          if (event.pageX || event.pageY) {
            globalX = event.pageX;
            globalY = event.pageY;
          }
          else if (event.clientX || event.clientY)  {
            globalX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            globalY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }

          var canvasBoundingRect = Gb.canvas.getBoundingClientRect(); 

          if (globalX < canvasBoundingRect.left || 
              globalX > canvasBoundingRect.right || 
              globalY < canvasBoundingRect.top || 
              globalY > canvasBoundingRect.bottom) {
            Gb.Mouse.execute(Gb.Mouse.CLICKED_OUTSIDE_CANVAS, event);  
          }
        }
      });

      debugger;

      // Global mouse events delegate
      Gb.Mouse = new Mouse();
    }
  });

  var areMouseDataEqual = function (first, second) {
    return first.go === second.go && first.viewport === second.viewport;
  }

  // Reference to the current mousemove handler
  var mouseMovehandlers = [];

  var startDrag = function(event, mouseData) {
    // If the specified game object is set to be draggable
    if (mouseData.go.Dragable) {
      var mouseMovehandler = getMouseMoveHandler(event, mouseData);
      // Dragging requires registering to the mousemove event, so we do so.
      Gb.canvas.addEventListener('mousemove', mouseMovehandler);
      // Execute MOUSE_DRAG_START event with the current mouseUpData object
      mouseData.go.execute(mouseData.go.MOUSE_DRAG_START, mouseData);
      
      // Store all the references to the mousemove handlers to be able to remove them later
      mouseMovehandlers.push(mouseMovehandler);
    }
  }

  var stopDrag = function(event, mouseData) {
    if (mouseData) {
      // Execute MOUSE_DRAG_END event with the current mouseUpData object
      mouseData.go.execute(mouseData.go.MOUSE_DRAG_END, mouseData);
    }

    if(mouseMovehandlers.length > 0) {
      // Remove the mousemove handlers    
      while(mouseMovehandlers.length) {
        // Remove mousemove event because it can be quite expensive
        Gb.canvas.removeEventListener('mousemove', mouseMovehandlers.pop());
      } 
    }
  }

  var getMouseMoveHandler = function (event, mouseData) {
    var initX = mouseData.go.x;
    var initY = mouseData.go.y;

    var lastX = event.pageX;
    var lastY = event.pageY;
    
    var totalDeltaX = 0;
    var totalDeltaY = 0;

    var deltaX;
    var deltaY;

    return function (event) {
      // Get different between last and current mouse position
      deltaX = event.pageX - lastX; 
      deltaY = event.pageY - lastY;

      // Save mouse last position
      lastX = event.pageX;
      lastY = event.pageY;

      // Accumulate deltas
      totalDeltaX += deltaX;
      totalDeltaY += deltaY;

      mouseData.go.x = initX + (totalDeltaX / mouseData.viewport.ScaleX);
      mouseData.go.y = initY + (totalDeltaY / mouseData.viewport.ScaleY);

      // Execute MOUSE_DRAG event with current mouseData plus the current X and Y delta
      mouseData.go.execute(mouseData.go.MOUSE_DRAG, mouseData);
    }
  }

  var getTopMostObject = function(event) {
    var localX, localY, globalX, globalY;

    if (event.pageX || event.pageY) {
      globalX = event.pageX;
      globalY = event.pageY;
    }
    else if (event.clientX || event.clientY)  {
      globalX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      globalY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    var parentOffset = event.target.getBoundingClientRect(); 
    
    localX = globalX - parentOffset.left;
    localY = globalY - parentOffset.top;

    var allViewports = Viewports.allAsArray();
    
    // Loop over every viewport, do so backwards so the things on top are processed first.
    for (var  i = allViewports.length-1; i >= 0; i--) {
      var viewport = allViewports[i];

      // Work only with viewports configured to interect with the mouse and only if the event occured inside the viewport
      if (viewport.mouseEnabled() && viewport.isPointInside(localX, localY)) {
        // Convert the mouse position to local viewport coordinates
        viewport.canvasToLocalCoordinates(localX, localY, mouseWorldPos); 
        
        // Find the top most game object that was clicked in any of the layers of the viewport
        var result = loopLayers.call(viewport, mouseWorldPos);

        // If a game object was found, execute it's click callback and break out of the loop
        // The callback receives the game-object that was clicked on and the viewport it was clicked on
        if (result) {          
          return {
            go: result.go,
            viewport: viewport,
            layer: result.layer,
            localMouseX: localX,
            localMouseY: localY,
            globalMouseX: globalX,
            globalMouseY: globalY
          }
        }
      }          
    }
  }

  var loopLayers = function(mouse) {
    // Loop over all the layers of the viewport
    for (var i = this.layers.length-1; i >= 0 ; i--) {
      var layer = this.layers[i];

      // Find the game-object that is in the absolute top most position, including layer and viewport draw order
      var go = gameObjectUnderPoint.call(layer, this, mouse);

      // If something is found, return it and break out of the loop
      if (go) {
        return { go: go, layer: layer.name };
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

      // Only work with game objects which have a renderer, have registered mouse events and are visible in the viewport
      if (r && isRegistered(t_go) && t_go.getViewportVisibility(viewport.name)) {
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

  var isRegistered = function(go) {
    return go.isRegistered(go.CLICK) ||
           go.isRegistered(go.MOUSE_DOWN) || 
           go.isRegistered(go.MOUSE_UP) ||
           go.isRegistered(go.MOUSE_DRAG_START) ||
           go.isRegistered(go.MOUSE_DRAG_END)
  }
   
  Object.defineProperty(GameObject.prototype, "CLICK", { get: function() { return 'click'; } });
  Object.defineProperty(GameObject.prototype, "MOUSE_DOWN", { get: function() { return 'mousedown'; } });
  Object.defineProperty(GameObject.prototype, "MOUSE_UP", { get: function() { return 'mouseup'; } });
  Object.defineProperty(GameObject.prototype, "MOUSE_DRAG", { get: function() { return 'mousedrag'; } });
  Object.defineProperty(GameObject.prototype, "MOUSE_DRAG_START", { get: function() { return 'mousedragstart'; } });
  Object.defineProperty(GameObject.prototype, "MOUSE_DRAG_END", { get: function() { return 'mousedragend'; } });

  Object.defineProperty(GameObject.prototype, "Dragable", { 
    get: function() { 
      return this.dragable || false; 
    },
    set: function(value) { 
      this.dragable = value; 
    } 
  });

  return MouseEvents;
});
