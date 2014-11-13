require.config({ 
	shim: {
	"jquery-ui": {
        "export": "$",
        "deps": ["jquery"]
    },

    "jquery-selectBoxIt": {
        "deps": ["jquery", "jquery-ui"]
    },

    "jquery-bootstrap": {
        "deps": ["jquery", "jquery-ui"]
    },

    "bootstrap-toogle": {
        "deps": ["jquery"]
    }
},
	paths: { 
		"cache": "./game-builder/src/cache/cache", 
		"image-cache": "./game-builder/src/cache/image-cache", 
		"json-cache": "./game-builder/src/cache/json-cache", 
		"path-cache": "./game-builder/src/cache/path-cache", 
		"text-cache": "./game-builder/src/cache/text-cache", 
		"class": "./game-builder/src/class", 
		"circle-collider": "./game-builder/src/collision/circle-collider", 
		"collision-component": "./game-builder/src/collision/collision-component", 
		"collision-resolver": "./game-builder/src/collision/collision-resolver", 
		"fixed-polygon-collider": "./game-builder/src/collision/fixed-polygon-collider", 
		"polygon-collider": "./game-builder/src/collision/polygon-collider", 
		"sat": "./game-builder/src/collision/sat", 
		"component": "./game-builder/src/components/component", 
		"bitmap-renderer": "./game-builder/src/components/rendering/bitmap-renderer", 
		"path-renderer": "./game-builder/src/components/rendering/path-renderer", 
		"renderer": "./game-builder/src/components/rendering/renderer", 
		"text-renderer": "./game-builder/src/components/rendering/text-renderer", 
		"activity-display": "./game-builder/src/debug/activity-display", 
		"error-printer": "./game-builder/src/debug/error-printer", 
		"game-object-debug-draw": "./game-builder/src/debug/game-object-debug-draw", 
		"delegate": "./game-builder/src/delegate", 
		"draw": "./game-builder/src/draw", 
		"font-loader": "./game-builder/src/font-loader", 
		"aspect-ratio-resize": "./game-builder/src/game_canvas/extensions/aspect-ratio-resize", 
		"basic-display-setup": "./game-builder/src/game_canvas/extensions/basic-display-setup", 
		"extension": "./game-builder/src/game_canvas/extensions/extension", 
		"keyboard-lock": "./game-builder/src/game_canvas/extensions/keyboard-lock", 
		"pause": "./game-builder/src/game_canvas/extensions/pause", 
		"resume": "./game-builder/src/game_canvas/extensions/resume", 
		"sound-control": "./game-builder/src/game_canvas/extensions/sound-control", 
		"timers-control": "./game-builder/src/game_canvas/extensions/timers-control", 
		"game": "./game-builder/src/game_canvas/game", 
		"gb": "./game-builder/src/gb", 
		"game-object-container": "./game-builder/src/hierarchy/game-object-container", 
		"game-object": "./game-builder/src/hierarchy/game-object", 
		"group": "./game-builder/src/hierarchy/group", 
		"groups": "./game-builder/src/hierarchy/groups", 
		"root": "./game-builder/src/hierarchy/root", 
		"keyboard": "./game-builder/src/input/keyboard", 
		"matrix-3x3": "./game-builder/src/math/matrix-3x3", 
		"vector-2D": "./game-builder/src/math/vector-2D", 
		"assembler": "./game-builder/src/pools/assembler", 
		"bundle": "./game-builder/src/pools/bundle", 
		"component-pool": "./game-builder/src/pools/component-pool", 
		"game-object-pool": "./game-builder/src/pools/game-object-pool", 
		"pool": "./game-builder/src/pools/pool", 
		"reclaimer": "./game-builder/src/pools/reclaimer", 
		"sound-player": "./game-builder/src/sound-player", 
		"state-machine": "./game-builder/src/states/state-machine", 
		"state": "./game-builder/src/states/state", 
		"timer-factory": "./game-builder/src/timers/timer-factory", 
		"timer": "./game-builder/src/timers/timer", 
		"util": "./game-builder/src/util", 
		"layer": "./game-builder/src/view/layer", 
		"viewport": "./game-builder/src/view/viewport", 
		"viewports": "./game-builder/src/view/viewports", 
		"world": "./game-builder/src/world", 
		"bullets-bundle": "src/bundles/bullets-bundle", 
		"ship-bundle": "src/bundles/ship-bundle", 
		"stars-bundle": "src/bundles/stars-bundle", 
		"grid-bundle": "src/editor/bundles/grid-bundle", 
		"outline-bundle": "src/editor/bundles/outline-bundle", 
		"editor-config": "src/editor/editor-config", 
		"editor-setup": "src/editor/editor-setup", 
		"setup-editable-game-object": "src/editor/game-objects/setup-editable-game-object", 
		"setup-game-object-input": "src/editor/game-objects/setup-game-object-input", 
		"active-viewports": "src/editor/html-parsers/active-viewports", 
		"main-viewport": "src/editor/html-parsers/main-viewport", 
		"scene-name": "src/editor/html-parsers/scene-name", 
		"selected-game-object": "src/editor/html-parsers/selected-game-object", 
		"selected-group": "src/editor/html-parsers/selected-group", 
		"snap-to-grid-value": "src/editor/html-parsers/snap-to-grid-value", 
		"scale-ui-value-setter": "src/editor/html-setters/scale-ui-value-setter", 
		"editor-regions": "src/editor/layout/editor-regions", 
		"editor-side-menu": "src/editor/layout/editor-side-menu", 
		"local-storage": "src/editor/local-storage", 
		"scene-editor": "src/editor/scene/scene-editor", 
		"scene-loader": "src/editor/scene/scene-loader", 
		"scene-serializer": "src/editor/scene/scene-serializer", 
		"canvas-scroll-bars-ui": "src/editor/ui-components/canvas-scroll-bars-ui", 
		"game-object-context-menu": "src/editor/ui-components/game-object-context-menu", 
		"game-object-creator-ui": "src/editor/ui-components/game-object-creator-ui", 
		"game-object-selector-ui": "src/editor/ui-components/game-object-selector-ui", 
		"grid-controls-ui": "src/editor/ui-components/grid-controls-ui", 
		"grid-toggle-ui": "src/editor/ui-components/grid-toggle-ui", 
		"group-selector-ui": "src/editor/ui-components/group-selector-ui", 
		"clicked-outside": "src/editor/ui-components/helpers/clicked-outside", 
		"create-status-message": "src/editor/ui-components/helpers/create-status-message", 
		"fit-in-viewport": "src/editor/ui-components/helpers/fit-in-viewport", 
		"mouse-coordinates": "src/editor/ui-components/helpers/mouse-coordinates", 
		"option": "src/editor/ui-components/helpers/option", 
		"uid": "src/editor/ui-components/helpers/uid", 
		"wrap-in-div": "src/editor/ui-components/helpers/wrap-in-div", 
		"button": "src/editor/ui-components/primitives/button", 
		"checkbox-set": "src/editor/ui-components/primitives/checkboxes/checkbox-set", 
		"checkbox": "src/editor/ui-components/primitives/checkboxes/checkbox", 
		"dialog-dropdown": "src/editor/ui-components/primitives/dialogs/dialog-dropdown", 
		"dialog": "src/editor/ui-components/primitives/dialogs/dialog", 
		"dropdown-base": "src/editor/ui-components/primitives/dropdowns/dropdown-base", 
		"dropdown-multi": "src/editor/ui-components/primitives/dropdowns/dropdown-multi", 
		"dropdown-single": "src/editor/ui-components/primitives/dropdowns/dropdown-single", 
		"editable-dropdown-add-remove": "src/editor/ui-components/primitives/dropdowns/editable-dropdown-add-remove", 
		"editable-dropdown-basic": "src/editor/ui-components/primitives/dropdowns/editable-dropdown-basic", 
		"editable-dropdown-remove": "src/editor/ui-components/primitives/dropdowns/editable-dropdown-remove", 
		"menu": "src/editor/ui-components/primitives/menu", 
		"scroll-bar": "src/editor/ui-components/primitives/scrollbars/scroll-bar", 
		"one-dimention-spinner": "src/editor/ui-components/primitives/spinners/one-dimention-spinner", 
		"spinner": "src/editor/ui-components/primitives/spinners/spinner", 
		"two-dimentions-spinner": "src/editor/ui-components/primitives/spinners/two-dimentions-spinner", 
		"one-dimention-input": "src/editor/ui-components/primitives/text-inputs/one-dimention-input", 
		"text-input": "src/editor/ui-components/primitives/text-inputs/text-input", 
		"two-dimentions-input": "src/editor/ui-components/primitives/text-inputs/two-dimentions-input", 
		"save-and-load-ui": "src/editor/ui-components/save-and-load-ui", 
		"scene-delete-ui": "src/editor/ui-components/scene-delete-ui", 
		"scene-load-ui": "src/editor/ui-components/scene-load-ui", 
		"scene-name-ui": "src/editor/ui-components/scene-name-ui", 
		"scene-save-ui": "src/editor/ui-components/scene-save-ui", 
		"snap-to-grid-toggle-ui": "src/editor/ui-components/snap-to-grid-toggle-ui", 
		"viewport-creator-ui": "src/editor/ui-components/viewport-creator-ui", 
		"viewport-editor-ui": "src/editor/ui-components/viewport-editor-ui", 
		"viewport-selector-simple-ui": "src/editor/ui-components/viewport-selector-simple-ui", 
		"viewport-selector-ui": "src/editor/ui-components/viewport-selector-ui", 
		"world-edit-ui": "src/editor/ui-components/world-edit-ui", 
		"setup-viewport": "src/editor/viewports/setup-viewport", 
		"viewport-outline": "src/editor/viewports/viewport-outline", 
		"display-setup": "src/extensions/display-setup", 
		"mouse-events": "src/extensions/mouse-events", 
		"basic-bullet": "src/game-objects/basic-bullet", 
		"player-ship": "src/game-objects/player-ship", 
		"basic-bullet-renderer": "src/renderers/basic-bullet-renderer", 
		"large-star-renderer": "src/renderers/large-star-renderer", 
		"medium-star-renderer": "src/renderers/medium-star-renderer", 
		"micro-star-renderer": "src/renderers/micro-star-renderer", 
		"ship-renderer": "src/renderers/ship-renderer", 
		"small-star-renderer": "src/renderers/small-star-renderer", 
		"star-field": "src/star-field", 
		"viewport-follow": "src/viewport-follow", 
		"domready": "./lib/requirejs-domready/domReady", 
		"jquery": "./lib/jquery/dist/jquery", 
		"jquery-ui": "./lib/jquery-ui/jquery-ui", 
		"jquery-bootstrap": "./lib/bootstrap", 
		"bootstrap-toogle": "./lib/bootstrap-toggle/js/bootstrap2-toggle", 
		"jquery-selectBoxIt": "./lib/jquery.selectBoxIt/src/javascripts/jquery.selectBoxIt", 
		  
	}  
});