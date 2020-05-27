"use strict";

//=============================================================================
// SumRndmDde - Title Map Background (Mod by DvLyon)
// SRD_TitleMapBackground.js
//=============================================================================

var Imported = Imported || {};
Imported.SRD_TitleMapBackground = true;

var SRD = SRD || {};
SRD.TitleMapBackground = SRD.TitleMapBackground || {};
SRD.TitleMapBackground.version = 1.01;

/*:
 * @plugindesc Allows developers to set a map to be used as the background of
 * their title screen. (Mod by DvLyon)
 * @author SumRndmDde
 *
 * @param Map ID
 * @desc The ID of the default map used in the Map Title Screen.
 * @type number
 * @min 1
 * @default 1
 *
 * @help
 *
 * Title Map Background
 * Version 1.01
 * SumRndmDde
 *
 *
 * This plugin allows developers to set a map to be used as the background of 
 * their title screen.
 *
 * Simply set the "Map ID" Parameter to the map you wish to use on the title.
 *
 * This map will play out normally like any map would within the game.
 * Events will act/move through the map, and all the animated tiles will be
 * animated.
 *
 *
 * ==============================================================================
 *  Setting up a Camera
 * ==============================================================================
 *
 * Now, an important thing to keep in mind about the Title-Map is that it will
 * not have the Player within it. Instead, the "camera" will be positioned in
 * the top-left of the map. However, you can set up an event to act as the 
 * position the camera will focus on, similar to how the camera focuses on the 
 * player during the game.
 *
 * Simply use the notetag:
 *
 *   <Title Map Camera>
 *
 * inside the notebox of an event within the Title-Map, and the camera will
 * follow that event around in the title screen.
 *
 *
 * ==============================================================================
 *  End of Help File
 * ==============================================================================
 * 
 * Welcome to the bottom of the Help file.
 *
 *
 * Thanks for reading!
 * If you have questions, or if you enjoyed this Plugin, please check
 * out my YouTube channel!
 *
 * https://www.youtube.com/c/SumRndmDde
 *
 *
 * Until next time,
 *   ~ SumRndmDde
*/

//=============================================================================
// Declarations
//=============================================================================

function Scene_TitleMap() {
	this.initialize.apply(this, arguments)
}

//=============================================================================
// Dependencies
//=============================================================================

if (Imported.DvLyon_Core && DvLyon.Core && DvLyon.Core.version >= 1.4) {

//=============================================================================
// Plugin Start
//=============================================================================

(function() {

	//=============================================================================
	// Parameters
	//=============================================================================

	SRD.TitleMapBackground.Parameters = PluginManager.parameters('SRD_TitleMapBackground')

	SRD.TitleMapBackground.MapId = Math.max(toNumber(SRD.TitleMapBackground.Parameters['Map ID'], 1), 1)

	/* ConfigManager */

	Object.defineProperty(ConfigManager, 'mapTitleId', {
		get: function() {
			return this._mapTitleId
		},
		set: function(value) {
			this._mapTitleId = value
		},
		configurable: true
	})

	var _ConfigManager_makeData = ConfigManager.makeData
	ConfigManager.makeData = function() {
		var config = _ConfigManager_makeData.call(this)
		config.mapTitleId = this._mapTitleId
		return config
	}

	var _ConfigManager_applyData = ConfigManager.applyData
	ConfigManager.applyData = function(config) {
		_ConfigManager_applyData.call(this, config)
		this._mapTitleId = this.readText(config, 'mapTitleId', SRD.TitleMapBackground.MapId)
	}

	//=============================================================================
	// Objects
	//=============================================================================

	/* Game_Map */

	Game_Map.prototype.setDisplayPosWOParallax = function(x, y) {
		if (this.isLoopHorizontal()) {
			this._displayX = x.mod(this.width())
		} else {
			var endX = this.width() - this.screenTileX()
			this._displayX = endX < 0 ? endX / 2 : x.clamp(0, endX)
		}
		if (this.isLoopVertical()) {
			this._displayY = y.mod(this.height())
		} else {
			var endY = this.height() - this.screenTileY()
			this._displayY = endY < 0 ? endY / 2 : y.clamp(0, endY)
		}
	}

	/* Game_Interpreter */

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		if (command === 'titleMapId') {
			ConfigManager['mapTitleId'] = toNumber(args[0], SRD.TitleMapBackground.MapId)
			ConfigManager.save()
		} else {
			_Game_Interpreter_pluginCommand.call(this, command, args)
		}
	}

	//=============================================================================
	// Scenes
	//=============================================================================

	//-----------------------------------------------------------------------------
	// Scene_TitleMap
	//
	// The scene class of the map screen to be displayed as the title screen.

	Scene_TitleMap.prototype = Object.create(Scene_Title.prototype)
	Scene_TitleMap.prototype.constructor = Scene_TitleMap

	Scene_TitleMap.prototype.initialize = function() {
		Scene_Title.prototype.initialize.call(this)
	}

	Scene_TitleMap.prototype.create = function() {
		Scene_Title.prototype.create.call(this)
		this.removeChild(this._backSprite1)
		this.removeChild(this._backSprite2)
		DataManager.loadMapData(ConfigManager['mapTitleId'])
	}

	Scene_TitleMap.prototype.update = function() {
		Scene_Title.prototype.update.call(this)
		if (this.isActive()) {
			this.updateMapFusionScene()
		}
	}

	Scene_TitleMap.prototype.updateMapFusionScene = function() {
		if ($dataMap && !this._loadedMap) {
			DataManager.createGameObjects()
			$gameMap.setup(SRD.TitleMapBackground.MapId)
			this._mapFusion = new Scene_TitleMapBackground()
			this._mapFusion.create()
			SceneManager.onSceneCreate()
			this._loadedMap = true
		}
		if (this._mapFusion && this._loadedMap) {
			if (!this._sceneStarted && this._mapFusion.isReady()) {
				this._mapFusion.start()
				this._mapFusion.update()
				this._sceneStarted = true
				this.addChildAt(this._mapFusion, 0)
				SceneManager.onSceneStart()
			}
		}
	}

	Scene_TitleMap.prototype.commandNewGame = function() {
		this.removeChild(this._mapFusion)
		Scene_Title.prototype.commandNewGame.call(this)
	}

	//-----------------------------------------------------------------------------
	// Scene_TitleMapBackground
	//
	// The scene class of the map background to be displayed at the title screen.

	function Scene_TitleMapBackground() {
		this.initialize.apply(this, arguments)
	}

	Scene_TitleMapBackground.prototype = Object.create(Scene_Map.prototype)
	Scene_TitleMapBackground.prototype.constructor = Scene_TitleMapBackground

	Scene_TitleMapBackground.prototype.create = function() {
		Scene_Base.prototype.create.call(this)
	}

	Scene_TitleMapBackground.prototype.createSpriteset = function() {
		this._spriteset = new Spriteset_TitleMapBackground()
		this.addChild(this._spriteset)
	}

	Scene_TitleMapBackground.prototype.onMapLoaded = function() {
		this.createDisplayObjects()
	}

	Scene_TitleMapBackground.prototype.updateMain = function() {
		var active = this.isActive()
		$gameMap.update(active)
		$gameTimer.update(active)
		$gameScreen.update()
	}

	Scene_TitleMapBackground.prototype.stop = function() {
		Scene_Base.prototype.stop.call(this)
		this._mapNameWindow.close()
	}

	Scene_TitleMapBackground.prototype.updateTransferPlayer = function() {}
	Scene_TitleMapBackground.prototype.updateDestination = function() {}
	Scene_TitleMapBackground.prototype.processMapTouch = function() {}
	Scene_TitleMapBackground.prototype.updateEncounter = function() {}
	Scene_TitleMapBackground.prototype.updateScene = function() {}
	Scene_TitleMapBackground.prototype.updateCallMenu = function() {}

	//=============================================================================
	// Sprites
	//=============================================================================

	//-----------------------------------------------------------------------------
	// Spriteset_TitleMapBackground
	//
	// The set of map sprites on the title screen.

	function Spriteset_TitleMapBackground() {
		this.initialize.apply(this, arguments)
	}

	Spriteset_TitleMapBackground.prototype = Object.create(Spriteset_Map.prototype)
	Spriteset_TitleMapBackground.prototype.constructor = Spriteset_TitleMapBackground

	Spriteset_TitleMapBackground.prototype.initialize = function() {
		Spriteset_Map.prototype.initialize.call(this)
		var events = $gameMap.events()
		if (events.length === 0) {
			this._titleCameraId = 0
		} else {
			for (var i = 0; i < events.length; i++) {
				if (events[i].event().note.match(/<Title\s*Map\s*Camera>/i)) {
					this._titleCameraId = i + 1
					break
				}
			}
		}
	}

	Spriteset_TitleMapBackground.prototype.updateTilemap = function() {
		if (this._titleCameraId > 0) {
			var event = $gameMap.event(this._titleCameraId)
			if (!event) {
				return
			}
			var x = event._realX
			var y = event._realY
			$gameMap.setDisplayPosWOParallax(x - this.centerX(), y - this.centerY())
			this._tilemap.origin.x = $gameMap.displayX() * $gameMap.tileWidth()
			this._tilemap.origin.y = $gameMap.displayY() * $gameMap.tileHeight()
		} else {
			this._tilemap.origin.x = 0
			this._tilemap.origin.y = 0
		}
	}

	Spriteset_TitleMapBackground.prototype.centerX = function() {
		return (Graphics.width / $gameMap.tileWidth() - 1) / 2
	}

	Spriteset_TitleMapBackground.prototype.centerY = function() {
		return (Graphics.height / $gameMap.tileHeight() - 1) / 2
	}

})()

//=============================================================================
// Plugin End
//=============================================================================

} else {
	var text = 'SRD_TitleMapBackground requires DvLyon_Core at the latest version to run.'
	console.error(text)
	require('nw.gui').Window.get().showDevTools()
}

//=============================================================================
// Modded by DvLyon Games
//=============================================================================