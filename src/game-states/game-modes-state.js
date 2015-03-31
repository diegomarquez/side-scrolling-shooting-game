define(function(require) {
	var stateMachineFactory = require("state-machine");
	var gb = require("gb");

	var playerStateMachine = stateMachineFactory.createFixedStateMachine();
	
	playerStateMachine.add((require("stage-overview-state"))("stage_overview_state"));
	playerStateMachine.add((require("scene-player-state"))("scene_player_state"));

	var editorStateMachine = stateMachineFactory.createFixedStateMachine();

	editorStateMachine.add((require("scene-editor-state"))("scene_editor_state"));

  return function (name) {
    var state = stateMachineFactory.createState(this, name);

    var currentStateMachine = null;

    state.addStartAction(function (args) {
    	if (args == "play-mode") {
    		currentStateMachine = playerStateMachine;

    		currentStateMachine.start();

    		var stageOverview = currentStateMachine.get("stage_overview_state");
    		var scenePlayer = currentStateMachine.get("scene_player_state");

    		stageOverview.once(stageOverview.BACK, this, function() {
    			currentStateMachine.finish();	
    			state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });
    		});

    		scenePlayer.once(scenePlayer.BACK, this, function() {
    			state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });
    		});
    	}

    	if (args == "edit-mode") {
    		currentStateMachine = editorStateMachine;

    		currentStateMachine.start();

    		var sceneEditor = currentStateMachine.get("scene_editor_state");

    		sceneEditor.once(sceneEditor.BACK, this, function() {
    			currentStateMachine.finish();
    			state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });
    		});
    	}
    });

    state.addUpdateAction(function (delta) {
    	currentStateMachine.update(delta);
    });

    state.addCompleteAction(function (args) {
    	gb.reclaimer.clearAllObjectsFromPools().now();
    	gb.reclaimer.clearAllPools().now();
    });

    return state;
  };
});   

  