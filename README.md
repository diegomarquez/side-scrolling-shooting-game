# side-shmup
-------------------

- Editor
    - Something to ensure the 'Front' layer of viewports is always on top of every other layer
	- Make the the module to handle movement of the 'Main' viewport with the arrow keys default
	- Edit world size. Same row as the scene name
	- Toogle to fit world in viewport. Checkbox next to scale control

	- Complete TODO in keyboard.js

	- Add layers to viewport
		- UI
		- Integration
			- Initial Values (DONE)
			- Update
		- If a layer is removed, recycle it's game-objets only if they are not visible elsewhere

	- Be able to add and remove update groups. Same row as group-selector.js

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
	
	
	- Add a toggle to show and hide a grid
	- Move objects around by dragging with the mouse
		- remove move by key presses from game-objects in favour of snap to grid toogle
		- Move main viewport by grid size

Use stylesheets to put the canvas in the top corner in the examples
	remove the styling from game.js
Fix Activity display so it appear in the lower corner of the canvas. It's not working propery in the editor when scrolling

Web Site
  Update Basic instruction on how to get a project running
    make word 'website' a link to grunt
    make word 'website' a link to bower
    make it clear that you need to install grunt-cli
  Rebuild docs and examples

Generator
  Fix .gitignore generation
    remove prefix from lib and game-builder

Test the editor using Jasmine

Start doing the objects for the actual game
	- level one design is on notebook

A [GAME-BUILDER][game-builder] project

[game-builder]: http://diegomarquez.github.io/game-builder
