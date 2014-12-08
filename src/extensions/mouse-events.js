define(["extension", "viewports", "sat", "vector-2D", "gb", "game-object", "delegate"], 
  function(Extension, Viewports, SAT, Vector2D, Gb, GameObject, Delegate) {
 
  var p1 = new Vector2D();
  var p2 = new Vector2D();
  var p3 = new Vector2D();
  var p4 = new Vector2D();
  
  var m = null;
  var r = null;
  var t = null;
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
  	init: function() {
  		this.onContextMenu = null;
  		this.onMouseDown = null;
  		this.onMouseUp = null;
  		this.onMouseOut = null;
  		this.documentMouseUp = null;
  	},

    type: function() {
      return Gb.game.CREATE;
    },

    execute: function() {
      // Reference to the last object that executed a delegate on the MOUSE_DOWN event
      var currentMouseDownData = null;

    	this.onContextMenu = function (event) {
        // If a game bbject was clicked on when triggering the context menu event
        if (currentMouseDownData) {
          // Prevent the menu from appearing
          event.preventDefault();

          currentMouseDownData.go.execute(currentMouseDownData.go.CONTEXT_MENU, currentMouseDownData);

          // Stop the dragging sequence
          stopDrag(event, currentMouseDownData);
          // Reset current MOUSE_DOWN data because by now the whole clicking cycle is over 
          currentMouseDownData = null;
        }
      }

      this.onMouseDown = function (event) {
        var mouseDownData = getTopMostObject(event);

        // Execute delegate only if some mouse data was returned
        if (mouseDownData) {
          // Store the reference to this mouseDownData, it is used in other events to tell if they are related to this one
          currentMouseDownData = mouseDownData;
          // Execute MOUSE_DOWN event with the current mouseDownData object
          // It contains a Game Object and the viewport it belongs to
          mouseDownData.go.execute(mouseDownData.go.MOUSE_DOWN, mouseDownData);
          // Start the dragging sequence if the game objects has registered events
          startDrag(event, mouseDownData, function (event, mouseData) {
            stopDrag(event, mouseData);
            currentMouseDownData = null;
          });
        }
      }

      this.onMouseUp = function (event) {
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
      }

      this.onMouseOut = function (event) {
        // Moving outside the canvas resets the mouse state
        stopDrag(event, currentMouseDownData);
        currentMouseDownData = null;
      }

      this.documentMouseUp = function (event) {
        if(event.target !== Gb.canvas) {
          setGlobalMouseCoordinates(event);

          var bRect = Gb.canvas.getBoundingClientRect(); 

          if (globalX < bRect.left || globalX > bRect.right || globalY < bRect.top || globalY > bRect.bottom) {
            Gb.Mouse.execute(Gb.Mouse.CLICKED_OUTSIDE_CANVAS, event);  
          }
        }
      }

      Gb.canvas.addEventListener('contextmenu', this.onContextMenu);
      Gb.canvas.addEventListener('mousedown', this.onMouseDown, false);
      Gb.canvas.addEventListener('mouseup', this.onMouseUp, false);
      Gb.canvas.addEventListener('mouseout', this.onMouseOut);
      // Any click outside the Canvas triggers a NOTHING_CLICKED event
      // Clicks on elements which are covering the canvas don't trigger this event
      document.body.addEventListener('mouseup', this.documentMouseUp);

      // Global mouse events delegate
      Gb.Mouse = new Mouse();
    },

    destroy: function() {
    	Gb.canvas.removeEventListener('contextmenu', this.onContextMenu);
      Gb.canvas.removeEventListener('mousedown', this.onMouseDown);
      Gb.canvas.removeEventListener('mouseup', this.onMouseUp);
      Gb.canvas.removeEventListener('mouseout', this.onMouseOut);
      document.body.removeEventListener('mouseup', this.documentMouseUp);

      this.onContextMenu = null;
      this.onMouseDown = null;
      this.onMouseUp = null;
      this.onMouseOut = null;
      this.documentMouseUp = null;
			Gb.Mouse = null;

			delete this['onContextMenu'];
      delete this['onMouseDown'];
      delete this['onMouseUp'];
      delete this['onMouseOut'];
      delete this['documentMouseUp'];
			delete Gb['Mouse'];
    }
  });

  var areMouseDataEqual = function (first, second) {
    return first.go === second.go && first.viewport === second.viewport;
  }

  // Reference to the current mousemove handler
  var mouseMovehandlers = [];

  var startDrag = function(event, mouseData, onOutOfViewport) {
    // If the specified game object is set to be draggable
    if (mouseData.go.Dragable) {
      var mouseMovehandler = getMouseMoveHandler(event, mouseData, onOutOfViewport);
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

  var getMouseMoveHandler = function (event, mouseData, onOutOfViewport) {
  	var rotation = mouseData.go.parent.matrix.decompose(t).rotation;

    rotation *= Math.PI / 180;
		var cosAngle = Math.cos(rotation);
		var sinAngle = Math.sin(rotation);

		var x = mouseData.go.x;
		var y = mouseData.go.y;

    var initX = (x * cosAngle) - (y * sinAngle);
    var initY = (x * sinAngle) + (y * cosAngle);

    // var initX = mouseData.go.x;
    // var initY = mouseData.go.y;

    var lastX = event.pageX;
    var lastY = event.pageY;
    
    var totalDeltaX = 0;
    var totalDeltaY = 0;

    var deltaX;
    var deltaY;

    return function (event) {
      setLocalMouseCoordinates(event)

      // Execute this when the mouse goes outside the current viewport
      // The viewport must be configured to care for this setting
      if (mouseData.viewport.MouseBounded && !mouseData.viewport.isPointInside(localX, localY)) {
        onOutOfViewport(event, mouseData);
        return;
      }

      // Get difference between last and current mouse position
      deltaX = event.pageX - lastX; 
      deltaY = event.pageY - lastY;

      // Save mouse last position
      lastX = event.pageX;
      lastY = event.pageY;

      // Accumulate deltas
      totalDeltaX += deltaX;
      totalDeltaY += deltaY;

      // Account for the rotation of the parent when dragging
      rotation = mouseData.go.parent.matrix.decompose(t).rotation;

      rotation  = -rotation * Math.PI / 180;
			cosAngle = Math.cos(rotation);
			sinAngle = Math.sin(rotation);

			x = initX + (totalDeltaX / mouseData.viewport.ScaleX);
			y = initY + (totalDeltaY / mouseData.viewport.ScaleY);

      mouseData.go.x = (x * cosAngle) - (y * sinAngle);
      mouseData.go.y = (x * sinAngle) + (y * cosAngle);
			// Account for the rotation of the parent when dragging

      // Execute MOUSE_DRAG event with current mouseData plus the current X and Y delta
      mouseData.go.execute(mouseData.go.MOUSE_DRAG, mouseData);
    }
  }

  var localX, localY;

  var setLocalMouseCoordinates = function(event) {
    setGlobalMouseCoordinates(event);

    var parentOffset = event.target.getBoundingClientRect(); 
    
    localX = globalX - parentOffset.left;
    localY = globalY - parentOffset.top;
  }

  var globalX, globalY;

  var setGlobalMouseCoordinates = function(event) {
    if (event.pageX || event.pageY) {
      globalX = event.pageX;
      globalY = event.pageY;
    }
    else if (event.clientX || event.clientY)  {
      globalX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      globalY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
  }

  var getTopMostObject = function(event) {
    setLocalMouseCoordinates(event);

    var allViewports = Viewports.allAsArray();
    
    // Loop over every viewport, do so backwards so the things on top are processed first.
    for (var  i = allViewports.length-1; i >= 0; i--) {
      var viewport = allViewports[i];

      // Work only with viewports configured to interect with the mouse and only if the event occured inside the viewport
      if (viewport.MouseEnabled && viewport.isPointInside(localX, localY)) {
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
  	var result;

    // Iterate over all the game objects in a layer, do so backwards to process first the ones that are drawn last. 
    for (var i = this.gameObjects.length-1; i >= 0; i--) {
      t_go = this.gameObjects[i];
      
	    if (t_go.isContainer()) {
	    	// The game object being tested is a container, therefore we need to check against all of it's children recursively
	    	result = testChildren(mouse, t_go, viewport);

				// If something is found among the children, return that
	  		if (result) {
	  			return result;
	  		}		
  		}

  		// Nothing was found among the children or there are no children, so the collision test is performed on the object itself
  		result = mouseVsGameObject(mouse, t_go, viewport);

  		// If something is found, return it
  		if (result) {
  			return result;
  		}
    }

    // Nothing was clicked in the current viewport
    return null;
  }

  var testChildren = function(mouse, go, viewport) {
  	var result;

  	if (go.childs) {
  		for (var j = go.childs.length-1; j >= 0; j--) {
  			var child = go.childs[j];

  			if (child.isContainer()) {
  				// The child is a container, test it's children recursively
  				result = testChildren(mouse, child, viewport);
  			} else {
  				// The child is not a container, test for a collision normally
  				result = mouseVsGameObject(mouse, child, viewport);	
  			}

  			// If something is found among the children, return that
	  		if (result) {
	  			return result;
	  		}		
			}
  	}

		return null;
  }

  var mouseVsGameObject = function(mouse, go, viewport) {
  	r = go.renderer;

  	// Only work with game objects which have a renderer, have registered mouse events and are visible in the viewport
    if (r && isRegistered(go) && go.getViewportVisibility(viewport.name)) {
      m = go.matrix;

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
        return go;
      } 
    }

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
  Object.defineProperty(GameObject.prototype, "CONTEXT_MENU", { get: function() { return 'context_menu'; } });

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
