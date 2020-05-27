"use strict";

//=============================================================================
// DvLyon Games
// DvLyon_Glitch.js
//=============================================================================

var Imported = Imported || {};
Imported.DvLyon_Glitch = true;

var DvLyon = DvLyon || {};
DvLyon.Glitch = DvLyon.Glitch || {};
DvLyon.Glitch.version = 2;

/*:
-------------------------------------------------------------------------
@title GlitchMV by DvLyon
@author DvLyon Games @ https://games.dvlyon.com
@date Feb 4, 2020
@version 2.0.0
@filename DvLyon_GlitchMV.js
@url https://games.dvlyon.com

Contact:

* Website: https://games.dvlyon.com
* Twitter: https://twitter.com/DvLyon

-------------------------------------------------------------------------------
@plugindesc GlitchMV by DvLyon
@help 
-------------------------------------------------------------------------------
== Description ==

GlitchMV by DvLyon.

== Terms of Use ==

- This is a private plugin. ONLY to be used by GlitchMV, or with GlitchMV's
authorization.
- DvLyon is the developer and maintainer of this plugin, but renounces all
legal claims to it's ownership, and it's use, except for advertisement
purposes.
- This plugin can ONLY be partly - or completely - modified by GlitchMV, or
under GlitchMV's authorization.
- ONLY GlitchMV has the legal right to edit, or delete, this copyright.

== Change Log ==

2.0.0 - Feb 4, 2020
 * Added font switching system.
 * Added plugin command to load a savefile.
1.0.0 - Jan 28, 2020
 * Wallpaper change system.
 * Picture pre-loading system system.
 * BGM loop fixes.
 * Multiple screen titles system.
 * Release.

== Usage ==

Install, activate and configure parameters.

--- Plugin Commands ---

titleScene sceneName

Changes the title scene to the specified one. Currently accepted values:
Regular (Default + Olivia_HorrorEffects)
Title-Map (SRD_TitleMapBackground)
CustomTitle (GALV_CustomTitle)

preTitleEventMap mapId

Sets the map id to be used by PreTitleEvents.

titleMapId mapId

Sets the map id to be used by SRD_TitleMapBackground.

changeGlobalFont fontName

Sets the global font (window title/unconfigured save one) to one of the following:

GameFont
Glitch
DvLyon
Fiery_Turk
Font1
Font2
Font3
Font4
Font5
Font6
Font7
Font8
Font9
Ammys_Handwriting
arial
calibri
Crayawn
JOURNAL
JPHSL
Rio_Oro
verdana
VL-Gothic-Regular
VL-PGothic-Regular

changeSaveFont fontName

Sets the global font (window title/unconfigured save one) to one of the following:

GameFont
Glitch
DvLyon
Fiery_Turk
Font1
Font2
Font3
Font4
Font5
Font6
Font7
Font8
Font9
Ammys_Handwriting
arial
calibri
Crayawn
JOURNAL
JPHSL
Rio_Oro
verdana
VL-Gothic-Regular
VL-PGothic-Regular

loadSave saveId

Loads the designated saveId.

== Notes ==

Images must be placed in img/dvlyon.

-------------------------------------------------------------------------------
 *
 * @param PTS
 * @text Pre-Title Screen
 * @desc Display Pre-Title Screen? <Requires PreTitleEvents.js (Mod by DvLyon)>
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param TitleScreen
 * @text Title Screen
 * @desc Default Title Screen type.
 * @type select
 * @option Regular
 * @option Title-Map
 * @option CustomTitle
 * @default Regular
 *
 * @param Font
 * @text Default Font
 * @desc Default Font Type.
 * @type select
 * @option GameFont
 * @option Glitch
 * @option DvLyon
 * @option Fiery_Turk
 * @option Font1
 * @option Font2
 * @option Font3
 * @option Font4
 * @option Font5
 * @option Font6
 * @option Font7
 * @option Font8
 * @option Font9
 * @option Ammys_Handwriting
 * @option arial
 * @option calibri
 * @option Crayawn
 * @option JOURNAL
 * @option JPHSL
 * @option Rio_Oro
 * @option verdana
 * @option VL-Gothic-Regular
 * @option VL-PGothic-Regular
 * @default Glitch
 *
 * @param OverrideFont
 * @text Override Font
 * @desc Override Font Type. (If this one is selected as Global, it will override local ones)
 * @type select
 * @option GameFont
 * @option Glitch
 * @option DvLyon
 * @option Fiery_Turk
 * @option Font1
 * @option Font2
 * @option Font3
 * @option Font4
 * @option Font5
 * @option Font6
 * @option Font7
 * @option Font8
 * @option Font9
 * @option Ammys_Handwriting
 * @option arial
 * @option calibri
 * @option Crayawn
 * @option JOURNAL
 * @option JPHSL
 * @option Rio_Oro
 * @option verdana
 * @option VL-Gothic-Regular
 * @option VL-PGothic-Regular
 * @default GameFont
 *
 * @param FontSettings
 * @text Font Settings
 * @desc Settings for each available font.
 * @type struct<FontSetting>[]
 * @default ["{\"Font\":\"GameFont\",\"Size\":\"28\"}","{\"Font\":\"Glitch\",\"Size\":\"28\"}","{\"Font\":\"DvLyon\",\"Size\":\"28\"}","{\"Font\":\"Fiery_Turk\",\"Size\":\"28\"}","{\"Font\":\"Font1\",\"Size\":\"28\"}","{\"Font\":\"Font2\",\"Size\":\"28\"}","{\"Font\":\"Font3\",\"Size\":\"28\"}","{\"Font\":\"Font4\",\"Size\":\"28\"}","{\"Font\":\"Font5\",\"Size\":\"28\"}","{\"Font\":\"Font6\",\"Size\":\"28\"}","{\"Font\":\"Font7\",\"Size\":\"28\"}","{\"Font\":\"Font8\",\"Size\":\"28\"}","{\"Font\":\"Font9\",\"Size\":\"28\"}","{\"Font\":\"Ammys_Handwriting\",\"Size\":\"28\"}","{\"Font\":\"arial\",\"Size\":\"28\"}","{\"Font\":\"calibri\",\"Size\":\"28\"}","{\"Font\":\"Crayawn\",\"Size\":\"28\"}","{\"Font\":\"JOURNAL\",\"Size\":\"28\"}","{\"Font\":\"JPHSL\",\"Size\":\"28\"}","{\"Font\":\"Rio_Oro\",\"Size\":\"28\"}","{\"Font\":\"verdana\",\"Size\":\"28\"}","{\"Font\":\"VL-Gothic-Regular\",\"Size\":\"28\"}","{\"Font\":\"VL-PGothic-Regular\",\"Size\":\"28\"}"]
 *
*/
/*~struct~FontSetting:
 *
 * @param Font
 * @text Font Name
 * @desc Font Name.
 * @type text
 * @default Name
 *
 * @param Size
 * @text Font Size
 * @desc Font Size.
 * @type number
 * @min 0
 * @max 100
 * @default 28
 *
 */

//=============================================================================
// Declarations
//=============================================================================

var fs = require('fs');
var saveGameLoad = 0;

function Scene_AutoLoadSave() {
  this.initialize.apply(this, arguments);
}

//=============================================================================
// Dependencies
//=============================================================================

if (Imported.DvLyon_Core && DvLyon.Core && DvLyon.Core.version >= 1.6) {

//=============================================================================
// Plugin Start
//=============================================================================

(function() {

	//=============================================================================
	// Requirements
	//=============================================================================

	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var wallpaper = require('wallpaper');

	//=============================================================================
	// Character File Management System
	//=============================================================================

  if (!fs.existsSync(base + '/Characters'))
  {
		fs.mkdirSync(base + '/Characters');
	}

	//=============================================================================
	// Variables
	//=============================================================================

	var win = nw.Window.get();
	var oldWallpaper = null;

	//=============================================================================
	// Wallpaper Change System
	//=============================================================================

  (async () => {
    await wallpaper.get()
		.then((result) => {
      oldWallpaper = result;
    });
  })();

	async function changeWallpaper(file) {
		if (!!oldWallpaper) {
      await wallpaper.set('./img/dvlyon/' + file + '.png');
		}
	}

	win.on('close', async function () {
		this.hide();

		if (!!oldWallpaper) {
      await wallpaper.set(oldWallpaper)
        .then(async (result) => {
          this.close(true);
        });
		} else {
			this.close(true);
		}
	});

	//=============================================================================
	// Parameters
	//=============================================================================

	DvLyon.Glitch.Parameters = PluginManager.parameters('DvLyon_Glitch');

	DvLyon.Glitch.PTS = toBool(DvLyon.Glitch.Parameters['PTS'], true);
	DvLyon.Glitch.TitleScreen = toText(DvLyon.Glitch.Parameters['TitleScreen'], 'Regular');

	DvLyon.Glitch.Font = toText(DvLyon.Glitch.Parameters['Font'], 'Glitch');
	DvLyon.Glitch.OverrideFont = toText(DvLyon.Glitch.Parameters['OverrideFont'], 'GameFont');

	DvLyon.Glitch.FontSettings = {};
	DvLyon.Glitch.FontSettingsRaw = JSON.parse(DvLyon.Glitch.Parameters['FontSettings']);
	DvLyon.Glitch.FontSettingsRaw.forEach(function(custom) {
		custom = JSON.parse(custom);
		DvLyon.Glitch.FontSettings[toText(custom.Font, 'Name')] = toNumber(custom.Size, 28);
	});

	//=============================================================================
	// Core
	//=============================================================================

	WebAudio.prototype._readMetaData = function(array, index, size) {
		for (var i = index; i < index + size; i++) {
			if (this._readFourCharacters(array, i) === 'LOOP') {
				var text = '';
				while (array[i] > 0) {
					text += String.fromCharCode(array[i++]);
				}
				if (text.match(/LOOPSTART=([0-9]+)/)) {
					this._loopStart = parseInt(RegExp.$1);
				}
				if (text.match(/LOOPLENGTH=([0-9]+)/)) {
          this._loopLength = parseInt(RegExp.$1);
				}
				if (text == 'LOOPSTART' || text == 'LOOPLENGTH') {
					var text2 = '';
					i += 16;
					while (array[i] > 0) {
						text2 += String.fromCharCode(array[i++]);
					}
					if (text == 'LOOPSTART') {
						this._loopStart = parseInt(text2);
					} else {
						this._loopLength = parseInt(text2);
					}
				}
			}
		}
	};

	//=============================================================================
	// Managers
	//=============================================================================

	/* ConfigManager */

	Object.defineProperty(ConfigManager, 'titleScreen', {
		get: function() {
			return this._titleScreen;
		},
		set: function(value) {
			this._titleScreen = value;
		},
		configurable: true
	});

	Object.defineProperty(ConfigManager, 'font', {
		get: function() {
			return this._font;
		},
		set: function(value) {
			this._font = value;
		},
		configurable: true
	});

  var _ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.call(this);
		config.titleScreen = this._titleScreen;
		config.font = this._font;
		return config;
	};

	var _ConfigManager_applyData = ConfigManager.applyData;
	ConfigManager.applyData = function(config) {
		_ConfigManager_applyData.call(this, config);
		this._titleScreen = this.readText(config, 'titleScreen', DvLyon.Glitch.TitleScreen);
		this._font = this.readText(config, 'font', DvLyon.Glitch.Font);
	};

	/* SceneManager */

	var _SceneManager_onKeyDown = SceneManager.onKeyDown;
	SceneManager.onKeyDown = async function(event) {
		if (!event.ctrlKey && !event.altKey && event.keyCode === 116) {
			if (Utils.isNwjs()) {
				if (!!oldWallpaper) {
					wallpaper.set(oldWallpaper);
				}
				location.reload();
			}
		} else {
			_SceneManager_onKeyDown.call(this, event);
		}
	};

	var _SceneManager_isNextScene = SceneManager.isNextScene;
	SceneManager.isNextScene = function(sceneClass) {
		if (sceneClass === Scene_Title) {
			return this._nextScene &&
				((this._nextScene.constructor === Scene_Title) || (this._nextScene.constructor === Scene_TitleMap));
		} else {
			return _SceneManager_isNextScene.call(this, sceneClass);
		}
	};

	var _SceneManager_goto = SceneManager.goto;
	SceneManager.goto = function(sceneClass) {
		if (sceneClass === Scene_Title) {
			switch (ConfigManager.titleScreen) {
        case 'Title-Map':
          this._nextScene = new Scene_TitleMap();
          break;
        case 'CustomTitle':
          this._nextScene = new Scene_CustomTitle();
          break;
        default:
          this._nextScene = new Scene_Title();
          break;
			}
			if (this._scene) {
				this._scene.stop();
			}
		} else {
			_SceneManager_goto.call(this, sceneClass);
		}
	};

	//=============================================================================
	// Objects
	//=============================================================================

	/* Game_Interpreter */

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		switch (command) {
			case 'titleScene':
				ConfigManager.titleScreen = args[0];
				ConfigManager.save();
				break;
			case 'changeGlobalFont':
				ConfigManager.font = args[0];
				ConfigManager.save();
				$gameDvLyon.refreshAllWindows();
				break;
			case 'setGlobalFontOverride':
				ConfigManager['font'] = DvLyon.Glitch.OverrideFont;
				ConfigManager.save();
				$gameDvLyon.refreshAllWindows();
				break;
			case 'changeSaveFont':
				$gameDvLyon.setSaveFont(args[0]);
				break;
			case 'loadSave':
				saveGameLoad = toNumber(args[0], 0);
				SceneManager.goto(Scene_AutoLoadSave);
				break;
			default:
				_Game_Interpreter_pluginCommand.call(this, command, args);
		}
	};

	/* Game_DvLyon */

	var _Game_DvLyon_clear = Game_DvLyon.prototype.clear;
	Game_DvLyon.prototype.clear = function() {
		_Game_DvLyon_clear.call(this);
		this._font = ConfigManager.font;
	};

	Game_DvLyon.prototype.changeWallpaper = function(file) {
		changeWallpaper(file);
	};

	Game_DvLyon.prototype.getSaveFont = function() {
		if (DvLyon.Glitch.OverrideFont === ConfigManager.font) {
			return DvLyon.Glitch.OverrideFont;
		}
		return this._font;
	};

	Game_DvLyon.prototype.getSaveFontSize = function() {
		return DvLyon.Glitch.FontSettings[this.getSaveFont()];
	};

	Game_DvLyon.prototype.setSaveFont = function(font) {
		this._font = font;
		this.refreshAllWindows();
	};

	Game_DvLyon.prototype.createFile = function(name, text) {
		text = text || '';
		if (fs.existsSync(base + '/Characters')) {
			fs.writeFile(base + '/Characters/' + name + '.char', text, 'utf8', function (err) {
				if (err) {
					throw err;
				}
			});
		}
	};

	Game_DvLyon.prototype.eraseFile = function(name) {
		if (fs.existsSync(base + '/Characters')) {
			fs.unlink(base + '/Characters/' + name + '.char', (err) => {
				if (err) {
					throw err;
				}
			});
		}
	};

	Game_DvLyon.prototype.existsFile = function(name) {
		if (fs.existsSync(base + '/Characters')) {
			var fd;
			try {
        fd = fs.openSync(base + '/Characters/' + name + '.char');
			} catch (err) {
				return false;
			} finally {
				if (fd !== undefined) {
					fs.closeSync(fd);
					return true;
				}
				return false;
			}
		}
		return false;
	};

	Game_DvLyon.prototype.writeFile = function(name, text) {
		if (fs.existsSync(base + '/Characters')) {
			fs.writeFile(base + '/Characters/' + name + '.char', text, 'utf8', function (err) {
				if (err) {
					throw err;
				}
			});
		}
	};

	Game_DvLyon.prototype.doesFileContain = function(name, text) {
		if (fs.existsSync(base + '/Characters')) {
			return fs.readFileSync(base + '/Characters/' + name + '.char', 'utf8') === text;
		}
		return false;
	};

	//=============================================================================
	// Scenes
	//=============================================================================

	/* Scene_Boot */

  const _Scene_Boot_initialize = Scene_Boot.prototype.initialize;
	Scene_Boot.prototype.initialize = function() {
    _Scene_Boot_initialize.call(this);
		Graphics.loadFont('Glitch', 'fonts/Glitch.ttf');
		Graphics.loadFont('DvLyon', 'fonts/ratio___.ttf');
		Graphics.loadFont('Fiery_Turk', 'fonts/Fiery_Turk.ttf');
		Graphics.loadFont('Font1', 'fonts/Font1.ttf');
		Graphics.loadFont('Font2', 'fonts/Font2.ttf');
		Graphics.loadFont('Font3', 'fonts/Font3.ttf');
		Graphics.loadFont('Font4', 'fonts/Font4.ttf');
		Graphics.loadFont('Font5', 'fonts/Font5.ttf');
		Graphics.loadFont('Font6', 'fonts/Font6.ttf');
		Graphics.loadFont('Font7', 'fonts/Font7.ttf');
		Graphics.loadFont('Font8', 'fonts/Font8.ttf');
		Graphics.loadFont('Font9', 'fonts/Font9.ttf');
		Graphics.loadFont('Ammys_Handwriting', 'fonts/Ammys Handwriting.ttf');
		Graphics.loadFont('arial', 'fonts/arial.ttf');
		Graphics.loadFont('calibri', 'fonts/calibri.ttf');
		Graphics.loadFont('Crayawn', 'fonts/Crayawn.ttf');
		Graphics.loadFont('JOURNAL', 'fonts/JOURNAL.ttf');
		Graphics.loadFont('JPHSL', 'fonts/JPHSL.ttf');
		Graphics.loadFont('Rio_Oro', 'fonts/Rio Oro.otf');
		Graphics.loadFont('verdana', 'fonts/verdana.ttf');
		Graphics.loadFont('VL-Gothic-Regular', 'fonts/VL-Gothic-Regular.ttf');
		Graphics.loadFont('VL-PGothic-Regular', 'fonts/VL-PGothic-Regular.ttf');
	}

	//Graphics.loadFont

	const _Scene_Boot_isReady = Scene_Boot.prototype.isReady;
	Scene_Boot.prototype.isReady = function() {
		return _Scene_Boot_isReady.call(this) && this.areGameFontsLoaded();
	};

	var _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {
      Scene_Base.prototype.start.call(this);
      SoundManager.preloadImportantSounds();
      this.checkPlayerLocation();
      DataManager.setupNewGame();
			if (DvLyon.Core.SkipTitle && !DataManager.isAnySavefileExists()) {
        SceneManager.goto(Scene_Map);
			} else {
				if (DvLyon.Glitch.PTS && !!Imported.PreTitleEvents && !!TH.PreTitleEvents.isModDvLyon) {
          SceneManager.goto(Scene_PretitleMap);
				} else {
          SceneManager.goto(Scene_Title);
				}
        Window_TitleCommand.initCommandPosition();
        Window_CustomTitleCommand.initCommandPosition();
			}
      this.updateDocumentTitle();
		} else {
			_Scene_Boot_start.call(this);
		}
	};

  Scene_Boot.prototype.areGameFontsLoaded = function() 
  {
		if (Graphics.isFontLoaded('Glitch') && Graphics.isFontLoaded('DvLyon') && Graphics.isFontLoaded('Fiery_Turk') && Graphics.isFontLoaded('Font1')
			&& Graphics.isFontLoaded('Font2') && Graphics.isFontLoaded('Font3')
			&& Graphics.isFontLoaded('Font4') && Graphics.isFontLoaded('Font5')
			&& Graphics.isFontLoaded('Font6') && Graphics.isFontLoaded('Font7')
			&& Graphics.isFontLoaded('Font8') && Graphics.isFontLoaded('Font9')
      && Graphics.isFontLoaded('Ammys_Handwriting') &&
      Graphics.isFontLoaded('arial')
      && Graphics.isFontLoaded('calibri') && 
      Graphics.isFontLoaded('Crayawn')
      && Graphics.isFontLoaded('JOURNAL') && 
      Graphics.isFontLoaded('JPHSL')	&& Graphics.isFontLoaded('Rio_Oro') && Graphics.isFontLoaded('verdana') && Graphics.isFontLoaded('VL-Gothic-Regular') && Graphics.isFontLoaded('VL-PGothic-Regular')) {
			return true;
		}
	};

	/* Scene_Map */

	var _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
		_Scene_Map_start.call(this);
		this.reservePictures();
	};

	Scene_Map.prototype.reservePictures = function() {
		$gameMap.events().forEach(function(e) {
			e.event().pages.forEach(function(page) {
				page.list.filter(function(command) {
					return command.code === 231;
				}).forEach(function(command) {
					ImageManager.reservePicture(command.parameters[1]);
				});
			});
		});
	};

	//-----------------------------------------------------------------------------
	// Scene_AutoLoadSave
	//
	// Scene for loading a save automatically.

	Scene_AutoLoadSave.prototype = Object.create(Scene_Base.prototype);
	Scene_AutoLoadSave.prototype.constructor = Scene_AutoLoadSave;

	Scene_AutoLoadSave.prototype.initialize = function() {
		Scene_Base.prototype.initialize.call(this);
	};

	Scene_AutoLoadSave.prototype.start = function() {
		Scene_Base.prototype.start.call(this);
    if (DataManager.loadGame(saveGameLoad)) 
    {
			saveGameLoad = 0;
			this.onLoadSuccess();
    }
    else 
    {
			this.onLoadFailure();
		}
	};

	Scene_AutoLoadSave.prototype.onLoadSuccess = function() {
		SoundManager.playLoad();
		this.fadeOutAll();
		this.reloadMapIfUpdated();
		SceneManager.goto(Scene_Map);
	};

	Scene_AutoLoadSave.prototype.onLoadFailure = function() {
		SceneManager.goto(Scene_Title);
	};

  Scene_AutoLoadSave.prototype.reloadMapIfUpdated = function() 
  {
		if ($gameSystem.versionId() !== $dataSystem.versionId) {
			$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
			$gamePlayer.requestMapReload();
		}
	};

	//=============================================================================
	// Windows
	//=============================================================================

	/* Window_Base */

	Window_Base.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_Base.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_Selectable.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_Selectable.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_Command.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_Command.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_HorzCommand.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_HorzCommand.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_Help.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_Help.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_Gold.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_Gold.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_MenuCommand.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_MenuCommand.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_MenuStatus.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_MenuStatus.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_MenuActor.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_MenuActor.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_ItemCategory.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ItemCategory.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_ItemList.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ItemList.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_SkillType.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_SkillType.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_SkillStatus.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_SkillStatus.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_SkillList.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_SkillList.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_EquipStatus.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_EquipStatus.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_EquipCommand.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_EquipCommand.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_EquipSlot.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_EquipSlot.prototype.standardFontSize = function() {
    return $gameDvLyon.getSaveFontSize();
	};

	Window_EquipItem.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_EquipItem.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_Status.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_Status.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_Options.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_Options.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_SavefileList.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_SavefileList.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_ShopCommand.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ShopCommand.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_ShopBuy.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ShopBuy.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_ShopSell.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ShopSell.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_ShopNumber.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ShopNumber.prototype.standardFontSize = function() {
    return $gameDvLyon.getSaveFontSize();
	};

	Window_ShopStatus.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ShopStatus.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_NameEdit.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_NameEdit.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_NameInput.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_NameInput.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_ChoiceList.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ChoiceList.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_NumberInput.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_NumberInput.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_EventItem.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_EventItem.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_Message.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_Message.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_ScrollText.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ScrollText.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_MapName.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_MapName.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_BattleLog.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_BattleLog.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_PartyCommand.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_PartyCommand.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_ActorCommand.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_ActorCommand.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_BattleStatus.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_BattleStatus.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_BattleActor.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_BattleActor.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_BattleEnemy.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_BattleEnemy.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_BattleSkill.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_BattleSkill.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_BattleItem.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_BattleItem.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_TitleCommand.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_TitleCommand.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_GameEnd.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_GameEnd.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_DebugRange.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_DebugRange.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

	Window_DebugEdit.prototype.standardFontFace = function() {
		return $gameDvLyon.getSaveFont();
	};

	Window_DebugEdit.prototype.standardFontSize = function() {
		return $gameDvLyon.getSaveFontSize();
	};

})();

//=============================================================================
// Plugin End
//=============================================================================

} else {
	var text = 'DvLyon_Glitch requires DvLyon_Core at the latest version to run.';
	console.error(text);
	require('nw.gui').Window.get().showDevTools();
}