# side-shmup
-------------------

- Editor		
	- Re-style and re-design interface 
		- https://github.com/jquery-ui-bootstrap/jquery-ui-bootstrap (DONE)
		- Regions
			- Have 4 regions
				- Top Left
					- Canvas (DONE)
					- Scroll bars (DONE)
				- Top Right
					Scene name (DONE)
					Snap to grid toggle (DONE) 
					grid toggl (DONE)
					world size (DONE)
				- Bottom Left 
					- Game Object Creation
						- Select game object (DONE)
						- Select Update group (DONE)
							- Default to top most layer (DONE)
						- Select viewports (DONE)
							- Modify Objects that parses the HTML to get the selected viewports (active-viewports.js) (DONE)
							- Remove menu once any kind of selection is complete
						- Game Object Creator
							- Visual feedback if there are things missing in order to add a game-object to the scene.
								- Flashing red or something (DONE)
				- Bottom Right 
					- Viewport and layers editing (current implementation)
						- Needs a total refactoring, lots of stuff are not needed anymore
							- Obsolete functionality
								- Layer Selection is not needed any more, only ordering and removing
								- Remove the selection toggle, that functionality moves to the Game Object creation section (DONE)
									- Put the fine tunning into a modal dialog
								- Remove the 'more options' toggle
							- Styling
								Almost everything needs to change

	- Give a title to each region
	- Add dropdown context menues to the body and position them in relation to the window
		- This way the region can have overflow: hidden and the menues will still show up on top of everything
	- Put things that are similar inside bootstrap wells with an appropiate title
	- Be able to alter layer of created game object after creation
	- Remove all focus outlines
	- Game Object Context menu
		- Clone (Clone the viewports and layers it belongs to)
		- Change Layer
		- Add to, remove from vieworts
		- Remove completely

	- Serialize information in each region
	- Load all the information

	- Use LESS as a CSS preprocessor

	- Search for TODO: comments and complete them

	- Improve how game-objects are disabled for the editor
		- Ej. player-ship.js keydown events are not disabled by overriding the update method 
			  because they are set on initialization
			  	- Editor objects should implement an interface and all logic should be executed inside those methods
			  	- All the methods in the interface can then be overrriden to ensure no un wanted code is executed in editor view
	- Refactor one-dimention and two-dimentions input HTML structure, so they are similar to the dropdown menues. Fields are not floated and centered properly. This will fix tab selection.
	- Method in Game-Builder to empty a pool, without destrying it. This should be used by the actual game when changing levels
	
	- Delete unused files

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

Test the editor UI components using Jasmine/QUnit and Karma

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
