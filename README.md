# side-shmup
-------------------

- Editor		
	- Serialize information in each region
		- Create all the objects to serialize upon saving, instead of keeping track of them individualy, that way the system will be more resilient
		- Add the Save button back in the Scene Settings region
		- Save stuff to local storage
	- Load all the information
		- Add Load button to Scene Settings
		- Style the Load button
		- Load stuff from local storage

	- Use LESS as a CSS preprocessor
		Make main.css slimmer
		Concat all stylesheets together into a single file with a grunt task
		Minimize the concatenated stylesheet

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
