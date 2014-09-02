# side-shmup
-------------------

- Editor
	- Make separate modules for all the parts of the editor
	
	- Be able to choose which is the main viewport from the UI 
		- Another checkbox
		- The main viewport position can be changed with the arrow keys

	- Edit world size
	- Toogle to fit world in viewport

	- Add layers to viewport
		- UI
		- Integration
			- Initial Values
			- Update

	- Be able to add and remove update groups
	- Save the viewport structure to the scene file

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

Complete TODO in keyboard.js

Web Site
  Update Basic instruction on how to get a project running
    make word 'website' a link to grunt
    make word 'website' a link to bower
    make it clear that you need to install grunt-cli
  Rebuild documentation

Generator
  Fix .gitignore generation
    remove prefix from lib and game-builder

Start doing the objects for the actual game
	- level one design is on notebook


A [GAME-BUILDER][game-builder] project

[game-builder]: http://diegomarquez.github.io/game-builder
