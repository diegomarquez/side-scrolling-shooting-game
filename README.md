# side-shmup
-------------------

- Editor
	- Edit World
		- Size
		- Step
	- Toogle to fit world in viewport. Checkbox next to scale control
	- Make nicer checkboxes with jQueryUI
	- Main Viewport can not be removed
	- Editor Only viewport
		- It can not be removed
		- It is not editable in any way, other than hiding it
		- It is always scaled to fit the world size
		- It is not serialized
		- It does show up in the main UI, but it is disabled
		- It's main purpose is letting the user know which part of the world is in view
	- Accordion with viewports
	- Sort viewports

	- Complete TODO in keyboard.js

	- Add and remove layers of a viewport
		- UI (DONE)
		- Integration
			- Initial Values (DONE)
			- Arrange layers when sorting happens
		- If a layer is removed, recycle it's game-objets only if they are not visible elsewhere
	- Change layer order
		- UI (DONE)
		- Integration

	- Be able to add, remove and arrange update groups
		- UI
 		- Integration

	- Add a toggle to show and hide a grid
	- Move objects around by dragging with the mouse
		- remove move by key presses from game-objects in favour of snap to grid toogle
		- Move main viewport by grid size

	- Visual feedback if there are things missing in order to add a game-object to the scene.
		- Flashing red or something

	- Use stylesheets to put the canvas in the top corner in the examples
		- remove the styling from game.js
	- Fix Activity display so it appear in the lower corner of the canvas. It's not working propery in the editor when scrolling
	- Have 4 regions
		- canvas
		- Right of canvas
		- Bottom of canvas 
		- Bottom right of canvas

	- Use LESS as a CSS preprocessor

	- Save the bundles the current scene is using
		- Object with all the bundle names and if they are currently in use or not
		- Add a dropdown to select which bundles the current scene should use
		- Editor bundles should implement a method with all they TYPES they handle, so it is easy to destroy all those objects if the bundle is
		  deselected
		- The editor should have toogles to decide which bundles to use
			- Turning a bundle on, creates it
			- Turning it off should remove all the corresponding active and pooled game-objects
				- Claim back all objects
				- Remove them from the pools
		- When a scene is loaded the pools are cleared and all the corresponding corresponding bundles call their create method
	
Web Site
  Update Basic instruction on how to get a project running
    make word 'website' a link to grunt
    make word 'website' a link to bower
    make it clear that you need to install grunt-cli
  Rebuild docs and examples

Generator
  Fix .gitignore generation
    remove prefix from lib and game-builder
   Fix grunt task that generates config to not look into lib folder
   Add shim-config to generator
   Add code to generator task
   Put in all the changes made into this project into the generator

Start doing the objects for the actual game
	- level one design is on notebook

Test the editor using Jasmine

A [GAME-BUILDER][game-builder] project

[game-builder]: http://diegomarquez.github.io/game-builder
