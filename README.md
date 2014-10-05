# side-shmup
-------------------

- Editor	
	- Fix clicking on canvas, it does not work when the main viewport is scrolled

	- Remove all update groups before loading a new scene
	- Update UI of game-object and group selector
	- Update UI to add new viewports, put it on top instead of the bottom
		- Use Dialog to create new viewport

	- Be able to add, remove and arrange update groups
		- UI
 		- Integration

	- Add a toggle to show and hide a grid
	- Move objects around by dragging with the mouse
		- remove move by key presses from game-objects in favour of snap to grid toogle
		- Move main viewport by grid size when pressing keys. 
			- Add a spinner to move the main viewport with the mouse. Less functional, but easier to understand.

	- Visual feedback if there are things missing in order to add a game-object to the scene.
		- Flashing red or something
	
	- Have 4 regions
		- canvas
		- Right of canvas (Empty)
		- Bottom of canvas (Game Object Creation)
		- Bottom right of canvas (Viewport and layers editing)
		- Add some styling for the background of the regions

	- Save the bundles the current scene is using
		- Editor should hold an object with all the bundle names and if they are currently in use or not
		- Add a dropdown to select which bundles the current scene should use
		- Editor bundles should implement a method with all the TYPES they handle, so it is easy to destroy all those objects if the bundle is deselected
		- The editor should have toogles to decide which bundles to use
			- Turning a bundle on, creates it
			- Turning it off should remove all the corresponding active and pooled game-objects
				- Claim back all objects
				- Remove them from the pools
		- When a scene is loaded the pools are cleared and all the corresponding bundles call their create method
	
	- Use LESS as a CSS preprocessor
	- Delete unused files
	- Investigate how to use bootstrap to style, this would require removing all mention of jQuery UI CSS classes

	- Stadarize how a module using jQueryUI should look
		- require jQuery and jQueryUI once in the beginning

	- Fix Tab selection, if possible
	- Enable viewport movement with keys only when the canvas is in focus
	- Improve how game-objects are disabled for the editor
		- Ej. player-ship.js keydown events are not disabled by overriding the update method 
			  because they are set on initialization
	- Refactor one-dimention and two-dimentions input HTML structure, so they are similar to the dropdown menues. Fields are not floated and centered properly

====================================================================
====================================================================

Web Site and Game-builde core
  Update Basic instruction on how to get a project running
    make word 'website' a link to grunt
    make word 'website' a link to bower
    make it clear that you need to install grunt-cli
  Rebuild docs and examples
  	- Make an extension to make use of the configuration of keyboard.js to prevent the behaviour of certain keys 
	- Use stylesheets to put the canvas in the top corner in the examples
		- remove the styling from game.js
	- Fix Activity display so it appear in the lower corner of the canvas. It's not working propery in the editor when scrolling
  	- Make sure all the examples work with all the new changes in game-buildre core

Generator
  Fix .gitignore generation
    remove prefix from lib and game-builder
   Fix grunt task that generates config to not look into lib folder
   Add shim-config to generator
   Add code to generator task
   Put in all the changes made into this project into the generator

====================================================================
====================================================================

Start doing the objects for the actual game
	- level one design is on notebook

====================================================================
====================================================================

Test the editor using Jasmine

A [GAME-BUILDER][game-builder] project

[game-builder]: http://diegomarquez.github.io/game-builder
