 define(function(require) {
	var stateMachineFactory = require("state-machine");

	var gb = require("gb");
	var levelStorage = require("level-storage");
	var localStorageWrapper = require("local-storage");

	// Built in levels state machine
	var playerStateMachine = stateMachineFactory.createFixedStateMachine();

	playerStateMachine.add((require("stage-overview-state"))("stage_overview_state"));
	playerStateMachine.add((require("scene-player-state"))("scene_player_state"));

	// Editor state machine
	var editorStateMachine = stateMachineFactory.createFixedStateMachine();

	editorStateMachine.add((require("scene-editor-state"))("scene_editor_state"));
	editorStateMachine.add((require("scene-editor-player-state"))("scene_editor_player_state"));

	// Custom levels state machine
	var customStateMachine = stateMachineFactory.createFixedStateMachine();

	customStateMachine.add((require("custom-stage-select-state"))("custom_stage_select_state"));
	customStateMachine.add((require("custom-scene-player-state"))("custom_scene_player_state"));

	// Play scene from url state
	var urlStateMachine = stateMachineFactory.createFixedStateMachine();

	urlStateMachine.add((require("url-scene-player-state"))("url_scene_player_state"));

	return function (name) {
		var state = stateMachineFactory.createState(this, name);

		var currentStateMachine = null;

		state.addStartAction(function (args) {
			var mode = args.mode ? args.mode : args;

			if (mode === "play-mode") {
				currentStateMachine = playerStateMachine;

				currentStateMachine.start();

				var stageOverview = currentStateMachine.get("stage_overview_state");

				stageOverview.once(stageOverview.BACK, this, function() {
					currentStateMachine.finish();
					state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });
				});
			}

			if (mode === "edit-mode") {
				currentStateMachine = editorStateMachine;

				if (localStorageWrapper.getUrlScene()) {
					currentStateMachine.start(JSON.parse(localStorageWrapper.getUrlScene()));
				} else {
					currentStateMachine.start(levelStorage.getLevel(0));
				}

				var sceneEditor = currentStateMachine.get("scene_editor_state");

				sceneEditor.once(sceneEditor.BACK, this, function() {
					currentStateMachine.finish();
					state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });
				});
			}

			if (mode === "custom-mode") {
				currentStateMachine = customStateMachine;

				currentStateMachine.start();

				var customStageSelect = currentStateMachine.get("custom_stage_select_state");

				customStageSelect.once(customStageSelect.BACK, this, function() {
					currentStateMachine.finish();
					state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });
				});
			}

			if (mode === "url-mode") {
				currentStateMachine = urlStateMachine;

				currentStateMachine.start(args.data);

				var urlPlayer = currentStateMachine.get("url_scene_player_state");

				urlPlayer.once(urlPlayer.BACK, this, function() {
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

