define(function(require) {
	var stateMachineFactory = require("state-machine");
	var gb = require("gb");

	// Built in levels state machine
	var playerStateMachine = stateMachineFactory.createFixedStateMachine();
	
	playerStateMachine.add((require("stage-overview-state"))("stage_overview_state"));
	playerStateMachine.add((require("scene-player-state"))("scene_player_state"));

	// Editor state machine
	var editorStateMachine = stateMachineFactory.createFixedStateMachine();

	editorStateMachine.add((require("scene-editor-state"))("scene_editor_state"));

	// Custom levels state machine
	var customStateMachine = stateMachineFactory.createFixedStateMachine();
	
	customStateMachine.add((require("custom-stage-select-state"))("custom_stage_select_state"));
	customStateMachine.add((require("custom-scene-player-state"))("custom_scene_player_state"));

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

    	if (args == "custom-mode") {
    		currentStateMachine = customStateMachine;

    		currentStateMachine.start();

    		var customStageSelect = currentStateMachine.get("custom_stage_select_state");
    		var customSceneplayer = currentStateMachine.get("custom_scene_player_state");

    		customStageSelect.once(customStageSelect.BACK, this, function() {
    			currentStateMachine.finish();
    			state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });
    		});

    		customSceneplayer.once(customSceneplayer.BACK, this, function() {
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

  