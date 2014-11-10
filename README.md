# side-shmup
-------------------

- Editor		
	- Side menu
		- Sacar el encabazedo de cada region (DONE)
		- Hacer el componente (DONE)
		- Darle estilo (DONE)
		- Poner un boton para cada region en el menu izquierdo. 
			- Elementos (DONE)
			- Cada boton hace algun tipo de highlight sobre la region correspondiente (DONE)
			- Poner un icono de signo de pregunta con un tooltip al lado de cada boton explicado que es lo que esta pasando en esa region
		- Save 
		- Load
			- Disable if there is nothing to load
		- Delete
			- Disable if there is nothing to delete
		
	- BUG: Red background on form field errors
	- BUG: Use color pallete on jquery-ui highlight and error
	- BUG: Clicking on a Game Object when the context menu is open should close it, same as clicking in an empty region of the canvas
	
	- Use LESS
		Make main.css slimmer, easier to maintain (ej. change colors)
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
