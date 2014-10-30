# side-shmup
-------------------

- Editor		
	- Refresh viewports on Game Object creation region
	- Add dropdown context menues to the body
		- This way the regions can have overflow: hidden and the menues will still show up on top of everything
		- Requires changing the calculated coordinates when clicking
	- Put things that are similar inside bootstrap wells with an appropiate title
	- Style the main region containers

	- Game Object Manipulation 
		* Watch out for mouse coordinates whne clicking on the canvas
		- Be able to alter layer of created game object after creation
		- Be able to alter viewports of created game object after creation
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

Start doing the objects for the actual game
	- level one design is on notebook

====================================================================
====================================================================


A [GAME-BUILDER][game-builder] project

[game-builder]: http://diegomarquez.github.io/game-builder
