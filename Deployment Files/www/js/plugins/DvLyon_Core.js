"use strict";

//=============================================================================
// DvLyon Games
// DvLyon_Core.js
//=============================================================================

var Imported = Imported || {};
Imported.DvLyon_Core = true;

var DvLyon = DvLyon || {};
DvLyon.Core = DvLyon.Core || {};
DvLyon.Core.version = 1.6;

/*:
-------------------------------------------------------------------------
@title DvLyon Core
@author DvLyon Games @ https://games.dvlyon.com
@date Feb 27, 2020
@version 1.6.0
@filename DvLyon_Core.js
@url https://games.dvlyon.com

Contact:

* Website: https://games.dvlyon.com
* Twitter: https://twitter.com/DvLyon

-------------------------------------------------------------------------------
@plugindesc DvLyon Core Functions
@help 
-------------------------------------------------------------------------------
== Description ==

DvLyon Core Functions and RMMV Settings Modifier.

== License ==

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

== Terms of Use ==

If you could credit DvLyon and https://games.dvlyon.com, we'd really
appreciate it!

We want to keep growing and making your RMMV experience better!

== Change Log ==

1.6.0 - Feb 27, 2020
 * (Feature) Added refreshAllWindows function.
 * (Cosmetic) Fixed incorrect changelog dates.
1.5.0 - Feb 5, 2020
 * (Feature) Added better drawIcon.
1.4.0 - Jan 28, 2020
 * (Feature) Added ConfigManager.readText function.
1.3.1 - Dec 31, 2019
 * (Feature) Now with strict mode.
1.3.0 - Dec 24, 2019
 * (Feature) Added shuffleArray helper.
1.2.0 - Dec 20, 2019
 * (Removed) Removed commaSeparatedToIntArray helper, as it was basically the
 same as toIntArray.
 * (Cosmetic) Reordered plugin.
1.1.1 - Sep 30, 2019
 * (Bugfix) Small fix that breaks older versions of the plugin.
1.1.0 - Sep 6, 2019
 * (Feature) Added commaSeparatedToIntArray helper.
1.0.0 - Sep 2, 2019
 * (Release) Release.

== Usage ==

Install and configure parameters.

-------------------------------------------------------------------------------
 *
 * @param ScreenWidth
 * @text Screen Width
 * @desc Sets the screen width (Default: 816).
 * @default 816
 *
 * @param ScreenHeight
 * @text Screen Height
 * @desc Sets the screen height (Default: 624).
 * @default 624
 *
 * @param SkipTitle
 * @text Skip Title If No Save
 * @desc Skips the title scene (straight to map) if there's no save data. (Default: No.)
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 *
*/

//=============================================================================
// Helpers
//=============================================================================

function toNumber(str, def) {
  if (str === 0) return 0;
  return isNaN(str) ? def : +(str || def);
}

function toText(str, def) {
  return str ? str : def;
}

function toBool(str, def) {
  switch (str) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return !!def ? true : false;
  }
}

function toDimColor(dim) {
  if (!dim) {
    return null;
  }
  dim = dim.split(',');
  var dimColor = 'rgba(';
  for (var i = 0; i < 4; i++) {
    dimColor += toNumber(dim[i], 0);
    if (i < 3) {
      dimColor += ',';
    }
  }
  dimColor += ')';
  return dimColor;
}

function toTone(tone) {
  tone = tone.split(',');
  var rgbg = [];
  for (var i = 0; i < 3; i++) {
    rgbg.push(toNumber(tone[i] || 0).clamp(-255, 255));
  }
  rgbg.push(toNumber(tone[3] || 0).clamp(0, 255));
  return rgbg;
}

function toRegion(str) {
  return Math.max(Math.min(toNumber(str, 0), 255), 0);
}

function circularDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function toIntArray(array) {
  var intArray = [];
  for (var i = 0; array && (i < array.length); i++) {
    var int = parseInt(array[i], 10);
    if (!isNaN(int)) {
      intArray.push(int);
    }
  }
  return intArray;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//=============================================================================
// Definitions
//=============================================================================

/* Number */

Number.prototype.makeId = function () {
  return Math.floor(Math.max(this, 0));
};

//=============================================================================
// Declarations
//=============================================================================

/* Game_DvLyon */

var $gameDvLyon = null;

function Game_DvLyon() {
  this.initialize.apply(this, arguments);
}

/* DvLyonTree */

function DvLyonTreeNode(data, extra) {
  this.data = data;
  this.extra = extra;
  this.children = [];
}

function DvLyonTree() {
  this.root = null;
}

//=============================================================================
// Plugin Start
//=============================================================================

(function () {

  //=============================================================================
  // Parameters
  //=============================================================================

  DvLyon.Core.Parameters = PluginManager.parameters('DvLyon_Core');

  DvLyon.Core.ScreenWidth = toNumber(DvLyon.Core.Parameters['ScreenWidth'], 816);
  DvLyon.Core.ScreenHeight = toNumber(DvLyon.Core.Parameters['ScreenHeight'], 624);
  DvLyon.Core.SkipTitle = toBool(DvLyon.Core.Parameters['SkipTitle'], false);

  //=============================================================================
  // Managers
  //=============================================================================

  /* DataManager */

  var _DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function () {
    _DataManager_createGameObjects.call(this);
    $gameDvLyon = new Game_DvLyon();
  };

  var _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    var contents = _DataManager_makeSaveContents.call(this);
    contents.dvlyon = $gameDvLyon;
    return contents;
  };

  var _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);
    $gameDvLyon = contents.dvlyon;
  };

  /* ConfigManager */

  ConfigManager.readText = function (config, name, def) {
    return config[name] || def;
  };

  /* ImageManager */

  ImageManager.loadDvLyon = function (filename, hue) {
    return this.loadBitmap('img/dvlyon/', filename, hue, true);
  };

  ImageManager.reserveDvLyon = function (filename, hue, reservationId) {
    return this.reserveBitmap('img/dvlyon/', filename, hue, true, reservationId);
  };

  /* SceneManager */

  SceneManager._screenWidth = DvLyon.Core.ScreenWidth;
  SceneManager._screenHeight = DvLyon.Core.ScreenHeight;
  SceneManager._boxWidth = DvLyon.Core.ScreenWidth;
  SceneManager._boxHeight = DvLyon.Core.ScreenHeight;

  var _SceneManager_initNwjs = SceneManager.initNwjs;
  SceneManager.initNwjs = function () {
    _SceneManager_initNwjs.call(this, arguments);
    if (Utils.isNwjs()) {
      var dw = DvLyon.Core.ScreenWidth - window.innerWidth;
      var dh = DvLyon.Core.ScreenHeight - window.innerHeight;
      window.moveBy(-dw / 2, -dh / 2);
      window.resizeBy(dw, dh);
    }
  };

  //=============================================================================
  // Objects
  //=============================================================================

  /* Game_Screen */

  var _Game_Screen_onBattleStart = Game_Screen.prototype.onBattleStart;
  Game_Screen.prototype.onBattleStart = function () {
    _Game_Screen_onBattleStart.call(this);
    $gameDvLyon.onBattleStart();
  };

  var _Game_Screen_update = Game_Screen.prototype.update;
  Game_Screen.prototype.update = function () {
    _Game_Screen_update.call(this);
    $gameDvLyon.screenUpdate();
  };

  /* Game_BattlerBase */

  Game_BattlerBase.prototype.isBadlyHurt = function () {
    return this.isAlive() && this._hp < this.mhp / 2 && !this.isDying();
  };

  Game_BattlerBase.prototype.isHurt = function () {
    return this.isAlive() && this._hp < this.mhp * 3 / 4 && !this.isBadlyHurt();
  };

  Game_BattlerBase.prototype.isOk = function () {
    return this.isAlive() && this._hp < this.mhp && !this.isHurt();
  };

  Game_BattlerBase.prototype.isPerfect = function () {
    return this.isAlive() && this._hp === this.mhp;
  };

  /* Game_CharacterBase */

  Game_CharacterBase.prototype.isEvent = function () {
    return !!this._eventId;
  };

  Game_CharacterBase.prototype.isPlayer = function () {
    return !this._eventId;
  };

  //-----------------------------------------------------------------------------
  // Game_DvLyon
  //
  // The game object class for all things DvLyon.

  Game_DvLyon.prototype.initialize = function () {
    this.clear();
  };

  Game_DvLyon.prototype.getSaveFont = function () {
    return "Glitch";
  };

  Game_DvLyon.prototype.getSaveFontSize = function () {
    return 28;
  };

  Game_DvLyon.prototype.clear = function () { };

  Game_DvLyon.prototype.screenUpdate = function () { };

  Game_DvLyon.prototype.onBattleStart = function () { };

  Game_DvLyon.prototype.refreshAllWindows = function () {
    const scene = SceneManager._scene;
    if (!!scene && !!scene._windowLayer) {
      const layer = scene._windowLayer;
      if (!!layer.children) {
        layer.children.forEach(function (win) {
          win.resetFontSettings();
          if (!!win.refresh) {
            win.refresh();
          }
        });
      }
    }
  };

  //=============================================================================
  // Scenes
  //=============================================================================

  /* Scene_Boot */

  var _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function () {
    if (DvLyon.Core.SkipTitle &&
      !DataManager.isBattleTest() &&
      !DataManager.isEventTest() &&
      !DataManager.isAnySavefileExists()) {
      Scene_Base.prototype.start.call(this);
      SoundManager.preloadImportantSounds();
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      SceneManager.goto(Scene_Map);
      this.updateDocumentTitle();
    } else {
      _Scene_Boot_start.call(this);
    }
  };

  //=============================================================================
  // Windows
  //=============================================================================

  /* Window_Base */

  Window_Base.prototype.drawIcon = function (iconIndex, x, y, width, height) {
    width = width || Window_Base._iconWidth;
    height = height || Window_Base._iconHeight;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, width, height);
  };

  Window_Base.prototype.drawFace = function (faceName, faceIndex, x, y, width, height) {
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var bitmap = ImageManager.loadFace(faceName);
    var sw = Window_Base._faceWidth;
    var sh = Window_Base._faceHeight;
    var sx = faceIndex % 4 * sw;
    var sy = Math.floor(faceIndex / 4) * sh;
    this.contents.bltImage(bitmap, sx, sy, sw, sh, x, y, width, height);
  };

  Window_Selectable.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_Selectable.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_Command.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_Command.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_HorzCommand.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_HorzCommand.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_Help.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_Help.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_Gold.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_Gold.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_MenuCommand.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_MenuCommand.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_MenuStatus.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_MenuStatus.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_MenuActor.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_MenuActor.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ItemCategory.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ItemCategory.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ItemList.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ItemList.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_SkillType.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_SkillType.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_SkillStatus.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_SkillStatus.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_SkillList.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_SkillList.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_EquipStatus.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_EquipStatus.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_EquipCommand.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_EquipCommand.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_EquipSlot.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_EquipSlot.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_EquipItem.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_EquipItem.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_Status.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_Status.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_Options.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_Options.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_SavefileList.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_SavefileList.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ShopCommand.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ShopCommand.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ShopBuy.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ShopBuy.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ShopSell.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ShopSell.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ShopNumber.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ShopNumber.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ShopStatus.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ShopStatus.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_NameEdit.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_NameEdit.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_NameInput.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_NameInput.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ChoiceList.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ChoiceList.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_NumberInput.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_NumberInput.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_EventItem.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_EventItem.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_Message.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_Message.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ScrollText.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ScrollText.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_MapName.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_MapName.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_BattleLog.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_BattleLog.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_PartyCommand.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_PartyCommand.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_ActorCommand.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_ActorCommand.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_BattleStatus.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_BattleStatus.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_BattleActor.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_BattleActor.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_BattleEnemy.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_BattleEnemy.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_BattleSkill.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_BattleSkill.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_BattleItem.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_BattleItem.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_TitleCommand.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_TitleCommand.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_GameEnd.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_GameEnd.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_DebugRange.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  }

  Window_DebugRange.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  Window_DebugEdit.prototype.standardFontFace = function () {
    return $gameDvLyon.getSaveFont();
  };

  Window_DebugEdit.prototype.standardFontSize = function () {
    return $gameDvLyon.getSaveFontSize();
  };

  //=============================================================================
  // Extra
  //=============================================================================

  //-----------------------------------------------------------------------------
  // DvLyonTree
  //
  // A tree structure.

  DvLyonTree.prototype.add = function (data, toNodeData, extra) {
    var node = new DvLyonTreeNode(data, extra)
    var parent = toNodeData ? this.findBFS(toNodeData) : null;
    if (parent) {
      parent.children.push(node);
    } else {
      if (!this.root) {
        this.root = node;
      } else {
        return;
      }
    }
  };

  DvLyonTree.prototype.findBFS = function (data) {
    var queue = [this.root]
    if (queue) {
      while (queue.length) {
        var node = queue.shift();
        if (node.data === data) {
          return node;
        }
        for (var i = 0; i < node.children.length; i++) {
          queue.push(node.children[i]);
        }
      }
    }
    return null;
  }

})();

//=============================================================================
// Plugin End
//=============================================================================

//=============================================================================
// Version Checker
//=============================================================================

function versionChecker() {
  var url = "https://raw.githubusercontent.com/dvlyon/RMMV-Free/master/versions.json";
  var request = new Request(url);
  fetch(request)
    .then(function (response) {
      return response.json();
    })
    .then(function (body) {
      if (body && (body.core > DvLyon.Core.version)) {
        var text = 'An updated version of DvLyon_Core is available at https://games.dvlyon.com';
        console.info(text);
      }
    });
}

versionChecker();