# side-shmup
-------------------

- Editor	
	- Make the toogle
		- UI
		- Integration
	
	- Remove main viewport movement when pressing keys. 
		- Move world using a spinner instead of the keyboard
		- Have spinners for X and Y coordinates
		
	- Hide viewport grid from game object selector
	- Disable all editing from the main viewport, to simplify how it works with the grid

	- require jQuery and jQueryUI once in the beginning of the editor
	- Use LESS as a CSS preprocessor
	
	- Remove world step

	- Investigate how to use bootstrap to style, this would require removing all mention of jQuery UI CSS classes
		- https://github.com/jquery-ui-bootstrap/jquery-ui-bootstrap
		- Redisign the interface
			- Have 4 regions
				- Top Left
					- Canvas
				- Top Right
					Scene name 
					Snap to grid toggle, 
					world movement spinners, 
					grid toggle, 
					world size
					world step
				- Bottom Left 
					- Game Object Creation
						- Select game object
						- Select Update group
						- Select viewports and layers
						- Visual feedback if there are things missing in order to add a game-object to the scene.
							- Flashing red or something
				- Bottom Right 
					Viewport and layers editing (current implementation)

	- Serialize information in each region
	- Load all the information

	- Improve how game-objects are disabled for the editor
		- Ej. player-ship.js keydown events are not disabled by overriding the update method 
			  because they are set on initialization
	- Refactor one-dimention and two-dimentions input HTML structure, so they are similar to the dropdown menues. Fields are not floated and centered properly. This will fix tab selection.
	- Method in Game-Builder to empty a pool, without destrying it.
		- This should be used by the actual game when changing levels
	
	- Delete unused files

====================================================================
====================================================================

Test the editor UI components using Jasmine/QUnit and Karma
	
====================================================================
====================================================================

Web Site and Game-builder core
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
	- Reflect changes made in this project in the generator
	   - Fix .gitignore generation
	   	- remove prefix from lib and game-builder
	   - Fix grunt task that generates config to not look into lib folder
	   - Add shim-config to generator
	   - Add code to generator task
	   - Put in all the changes made into this project into the generator

====================================================================
====================================================================

Start doing the objects for the actual game
	- level one design is on notebook

====================================================================
====================================================================

Test the editor using Jasmine/QUnit and Karma

====================================================================
====================================================================

A [GAME-BUILDER][game-builder] project

[game-builder]: http://diegomarquez.github.io/game-builder
