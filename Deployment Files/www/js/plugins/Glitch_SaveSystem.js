"use strict";

//=============================================================================
// DvLyon Games
// Glitch_SaveSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.Glitch_SaveSystem = true;

var DvLyon = DvLyon || {};
DvLyon.GlitchSS = DvLyon.GlitchSS || {};
DvLyon.GlitchSS.version = 1;

/*:
-------------------------------------------------------------------------
@title Glitch Save System by DvLyon
@author DvLyon Games @ https://games.dvlyon.com
@date Mar 7, 2020
@version 1.0.0
@filename Glitch_SaveSystem.js
@url https://games.dvlyon.com

Contact:

* Website: https://games.dvlyon.com
* Twitter: https://twitter.com/DvLyon

-------------------------------------------------------------------------------
@plugindesc Glitch Save System by DvLyon
@help 
-------------------------------------------------------------------------------
== Description ==

Glitch Save System by DvLyon.

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

1.0.0 - Mar 7, 2020
 * Release.

== Usage ==

Install and activate.

-------------------------------------------------------------------------------
 *
*/

//=============================================================================
// Declarations
//=============================================================================

//=============================================================================
// Dependencies
//=============================================================================
function GlitchSaveManager() {
  throw new Error('This is a static class');
}


if (Imported.DvLyon_Core && DvLyon.Core && DvLyon.Core.version >= 1.31) {

  //=============================================================================
  // Plugin Start
  //=============================================================================

  (function () {

    //=============================================================================
    // Managers
    //=============================================================================

    /* DataManager */

    let _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
      _DataManager_loadDatabase.call(this);
      GlitchSaveManager.load();
    };

    DataManager.autoSaveGame = function () {
      try {
        StorageManager.backup(-33);
        return this.autoSaveGameWithoutRescue();
      } catch (e) {
        console.error(e);
        try {
          StorageManager.remove(-33);
          StorageManager.restoreBackup(-33);
        } catch (e2) {
          console.error(e2);
        }
        return false;
      }
    };

    DataManager.autoSaveGameWithoutRescue = function () {
      let info = this.makeSavefileInfo();
      let contents = this.makeSaveContents();
      let json = JsonEx.stringify(Object.assign(info, contents)); //JsonEx.stringify({ ...info, ...contents });
      StorageManager.save(-33, json);
      return true;
    };

    DataManager.loadAutoSavefileInfo = function () {
      var json;
      try {
        json = StorageManager.load(-33);
      } catch (e) {
        console.error(e);
        return null;
      }
      if (json) {
        return JsonEx.parse(json);
      } else {
        return null;
      }
    };

    DataManager.loadAutoSaveGame = function () {
      try {
        return this.loadAutoSaveGameWithoutRescue();
      } catch (e) {
        console.error(e);
        return false;
      }
    };

    DataManager.loadAutoSaveGameWithoutRescue = function () {
      var json = StorageManager.load(-33);
      this.createGameObjects();
      this.extractSaveContents(JsonEx.parse(json));
      return true;
    };

    /* StorageManager */

    var _StorageManager_localFilePath = StorageManager.localFilePath;
    StorageManager.localFilePath = function (savefileId) {
      var filePath = _StorageManager_localFilePath.call(this, savefileId);
      if (savefileId === -33) {
        return this.localFileDirectoryPath() + 'autosave.rpgsave';
      }
      if (savefileId === -69) {
        return this.localFileDirectoryPath() + 'glitch.rpgsave';
      }
      return filePath;
    };

    var _StorageManager_webStorageKey = StorageManager.webStorageKey;
    StorageManager.webStorageKey = function (savefileId) {
      var storageKey = _StorageManager_webStorageKey.call(this, savefileId);
      if (savefileId === -33) {
        return 'RPG Autosave';
      }
      if (savefileId === -69) {
        return 'RPG Glitch';
      }
      return storageKey;
    };

    //-----------------------------------------------------------------------------
    // GlitchSaveManager
    //
    // The static class that manages the Glitch Global data.



    GlitchSaveManager.switches = {};
    GlitchSaveManager.variables = {};
    GlitchSaveManager.texts = {};
    GlitchSaveManager.arrays = {};

    GlitchSaveManager.load = function () {
      var json;
      var config = {};
      try {
        json = StorageManager.load(-69);
      } catch (e) {
        console.error(e);
      }
      if (json) {
        config = JSON.parse(json);
      }
      this.applyData(config);
    };

    GlitchSaveManager.save = function () {
      StorageManager.save(-69, JSON.stringify(this.makeData()));
    };

    GlitchSaveManager.makeData = function () {
      var data = {};
      data.switches = JSON.stringify(this.switches);
      data.variables = JSON.stringify(this.variables);
      data.texts = JSON.stringify(this.texts);
      data.arrays = JSON.stringify(this.arrays);
      return data;
    };

    GlitchSaveManager.applyData = function (data) {
      this.switches = this.readData(data, 'switches');
      this.variables = this.readData(data, 'variables');
      this.texts = this.readData(data, 'texts');
      this.arrays = this.readData(data, 'arrays');
    };

    GlitchSaveManager.readData = function (config, name) {
      var value = config[name];
      if (value !== undefined) {
        return JSON.parse(value);
      }
      return {};
    };

    GlitchSaveManager.getSwitch = function (index) {
      if (!this.switches[index]) {
        this.switches[index] = false;
      }
      return this.switches[index];
    };

    GlitchSaveManager.onSwitch = function (index) {
      if (!this.getSwitch(index)) {
        this.switches[index] = true;
        this.onChange();
      }
    };

    GlitchSaveManager.offSwitch = function (index) {
      if (!!this.getSwitch(index)) {
        this.switches[index] = false;
        this.onChange();
      }
    };

    GlitchSaveManager.toggleSwitch = function (index) {
      this.switches[index] = !this.getSwitch(index);
      this.onChange();
    };

    GlitchSaveManager.getVariable = function (index) {
      if (!this.variables[index]) {
        this.variables[index] = 0;
      }
      return this.variables[index];
    };

    GlitchSaveManager.addVariable = function (index, value) {
      this.variables[index] = this.getVariable(index) + toNumber(value, 0);
      this.onChange();
    };

    GlitchSaveManager.onChange = function () {
      $gameMap.requestRefresh();
      this.save();
    };

    //=============================================================================
    // Objects
    //=============================================================================

    /* Game_System */

    Game_System.prototype.autoSaveGame = function () {
      $gameSystem.onBeforeSave();
      if (DataManager.autoSaveGame()) {
        StorageManager.cleanBackup(-33);
      }
    };

    /* Game_Player */

    let _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function () {
      _Game_Player_performTransfer.call(this);
      if (this._newMapId > 0) {
        $gameSystem.autoSaveGame();
      }
    };

    /* Game_Interpreter */

    let _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function () {
      _Game_Interpreter_command201.call(this);
      $gameSystem.autoSaveGame();
    };

    let _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
      switch (command) {
        case 'autosave':
          $gameSystem.autoSaveGame();
          break;
        case 'loadAutosave':
          SceneManager.goto(Scene_AutoLoadAutoSave);
          break;
        case 'onGlobalSwitch':
          GlitchSaveManager.onSwitch(String(args[0]));
          break;
        case 'offGlobalSwitch':
          GlitchSaveManager.offSwitch(String(args[0]));
          break;
        case 'toggleGlobalSwitch':
          GlitchSaveManager.toggleSwitch(String(args[0]));
          break;
        case 'addGlobalVariable':
          GlitchSaveManager.addVariable(String(args[0]), toNumber(args[1], 0));
          break;
        default:
          _Game_Interpreter_pluginCommand.call(this, command, args);
      }
    };

    /* Game_DvLyon */

    Game_DvLyon.prototype.forceSave = function () {
      DataManager.saveGame(DataManager._lastAccessedId);
    };

    Game_DvLyon.prototype.addCheckpoint = function (id) {
      GlitchSaveManager.addVariable('Checkpoint' + id, 1);
      $gameSystem.autoSaveGame();
    };

    Game_DvLyon.prototype.totalCheckpoints = function (goal) {
      goal = toNumber(goal, 0);
      let result = GlitchSaveManager.getVariable('Checkpoint0');
      for (let i = 1; i <= goal; i++) {
        let checkpoint = GlitchSaveManager.getVariable('Checkpoint' + i);
        result = Math.min(result, checkpoint);
      }
      return result;
    };

    //=============================================================================
    // Scenes
    //=============================================================================

    /* Scene_Load */

    Scene_Load.prototype.savefileId = function () {
      return this._listWindow.index();
    };

    let _Scene_Load_onSavefileOk = Scene_Load.prototype.onSavefileOk;
    Scene_Load.prototype.onSavefileOk = function () {
      if (this.savefileId() === 0) {
        if (DataManager.loadAutoSaveGame()) {
          this.onLoadSuccess();
        } else {
          this.onLoadFailure();
        }
      } else {
        _Scene_Load_onSavefileOk.call(this);
      }
    };

    /* Scene_Debug */

    let _Scene_Debug_helpText = Scene_Debug.prototype.helpText;
    Scene_Debug.prototype.helpText = function () {
      switch (this._rangeWindow.mode()) {
        case 'globalSwitch':
          return 'Enter : ON / OFF';
        case 'globalVariable':
          return ('Left     :  -1\n' + 'Right    :  +1\n' + 'Pageup   : -10\n' + 'Pagedown : +10');
        case 'globalText':
          return 'globalText';
        case 'globalArray':
          return 'globalArray';
        default:
          return _Scene_Debug_helpText.call(this);
      }
    };

    //-----------------------------------------------------------------------------
    // Scene_AutoLoadAutoSave
    //
    // Scene for loading the autosave automatically.

    function Scene_AutoLoadAutoSave() {
      this.initialize.apply(this, arguments);
    }

    Scene_AutoLoadAutoSave.prototype = Object.create(Scene_AutoLoadSave.prototype);
    Scene_AutoLoadAutoSave.prototype.constructor = Scene_AutoLoadAutoSave;

    Scene_AutoLoadAutoSave.prototype.initialize = function () {
      Scene_AutoLoadSave.prototype.initialize.call(this);
    };

    Scene_AutoLoadAutoSave.prototype.start = function () {
      Scene_Base.prototype.start.call(this);
      if (DataManager.loadAutoSaveGame()) {
        this.onLoadSuccess();
      } else {
        this.onLoadFailure();
      }
    };

    //=============================================================================
    // Sprites
    //=============================================================================

    //=============================================================================
    // Windows
    //=============================================================================

    /* Window_SavefileList */

    let _Window_SavefileList_maxItems = Window_SavefileList.prototype.maxItems;
    Window_SavefileList.prototype.maxItems = function () {
      if (this._mode === 'load') {
        return DataManager.maxSavefiles() + 1;
      } else {
        return _Window_SavefileList_maxItems.call(this);
      }
    };

    let _Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem;
    Window_SavefileList.prototype.drawItem = function (index) {
      if (this._mode === 'load') {
        if (index === 0) {
          let valid = StorageManager.exists(-33);
          let info = DataManager.loadAutoSavefileInfo();
          let rect = this.itemRectForText(index);
          this.resetTextColor();
          this.changePaintOpacity(valid);
          this.drawAutosaveFile(index, rect.x, rect.y);
          if (info) {
            this.changePaintOpacity(valid);
            this.drawContents(info, rect, valid);
            this.changePaintOpacity(true);
          }
        } else {
          let valid = DataManager.isThisGameFile(index);
          let info = DataManager.loadSavefileInfo(index);
          let rect = this.itemRectForText(index);
          this.resetTextColor();
          this.changePaintOpacity(valid);
          this.drawFileId(index, rect.x, rect.y);
          if (info) {
            this.changePaintOpacity(valid);
            this.drawContents(info, rect, valid);
            this.changePaintOpacity(true);
          }
        }
      } else {
        _Window_SavefileList_drawItem.call(this, index);
      }
    };

    Window_SavefileList.prototype.drawAutosaveFile = function (id, x, y) {
      this.drawText('Autosave', x, y, 180);
    };

    /* Window_DebugRange */

    let _Window_DebugRange_initialize = Window_DebugRange.prototype.initialize;
    Window_DebugRange.prototype.initialize = function (x, y) {
      this._maxGlitchSwitches = Math.ceil(Object.keys(GlitchSaveManager.switches).length / 10);
      this._maxGlitchVariables = Math.ceil(Object.keys(GlitchSaveManager.variables).length / 10);
      this._maxGlitchTexts = Math.ceil(Object.keys(GlitchSaveManager.texts).length / 10);
      this._maxGlitchArrays = Math.ceil(Object.keys(GlitchSaveManager.arrays).length / 10);
      _Window_DebugRange_initialize.call(this, x, y);
    };

    let _Window_DebugRange_maxItems = Window_DebugRange.prototype.maxItems;
    Window_DebugRange.prototype.maxItems = function () {
      let glitchItems = this._maxGlitchSwitches + this._maxGlitchVariables + this._maxGlitchTexts;
      glitchItems += this._maxGlitchArrays;
      return _Window_DebugRange_maxItems.call(this) + glitchItems;
    };

    Window_DebugRange.prototype.mode = function () {
      let index = this.index();
      let total = this._maxGlitchSwitches;
      if (index < total) {
        return 'globalSwitch';
      }
      total += this._maxGlitchVariables;
      if (index < total) {
        return 'globalVariable';
      }
      total += this._maxGlitchTexts;
      if (index < total) {
        return 'globalText';
      }
      total += this._maxGlitchArrays;
      if (index < total) {
        return 'globalArray';
      }
      total += this._maxSwitches;
      if (index < total) {
        return 'switch';
      }
      return 'variable';
    };

    Window_DebugRange.prototype.topId = function () {
      let index = this.index();
      let total = this._maxGlitchSwitches;
      if (index < total) {
        return index * 10 + 1;
      }
      total += this._maxGlitchVariables;
      if (index < total) {
        return (index - (total - this._maxGlitchVariables)) * 10 + 1;
      }
      total += this._maxGlitchTexts;
      if (index < total) {
        return (index - (total - this._maxGlitchTexts)) * 10 + 1;
      }
      total += this._maxGlitchArrays;
      if (index < total) {
        return (index - (total - this._maxGlitchArrays)) * 10 + 1;
      }
      total += this._maxSwitches;
      if (index < total) {
        return (index - (total - this._maxSwitches)) * 10 + 1;
      }
      return (index - total) * 10 + 1;
    };

    Window_DebugRange.prototype.drawItem = function (index) {
      var rect = this.itemRectForText(index);
      var start;
      var text;
      let total = this._maxGlitchSwitches;
      if (index < total) {
        start = index * 10 + 1;
        text = 'GS';
      } else {
        total += this._maxGlitchVariables;
        if (index < total) {
          start = (index - (total - this._maxGlitchVariables)) * 10 + 1;
          text = 'GV';
        } else {
          total += this._maxGlitchTexts;
          if (index < total) {
            start = (index - (total - this._maxGlitchTexts)) * 10 + 1;
            text = 'GT';
          } else {
            total += this._maxGlitchArrays;
            if (index < total) {
              start = (index - (total - this._maxGlitchArrays)) * 10 + 1;
              text = 'GA';
            } else {
              total += this._maxSwitches;
              if (index < total) {
                start = (index - (total - this._maxSwitches)) * 10 + 1;
                text = 'S';
              } else {
                start = (index - total) * 10 + 1;
                text = 'V';
              }
            }
          }
        }
      }
      var end = start + 9;
      text += ' [' + start.padZero(4) + '-' + end.padZero(4) + ']';
      this.drawText(text, rect.x, rect.y, rect.width);
    };

    /* Window_DebugEdit */

    let _Window_DebugEdit_initialize = Window_DebugEdit.prototype.initialize;
    Window_DebugEdit.prototype.initialize = function (x, y, width) {
      _Window_DebugEdit_initialize.call(this, x, y, width);
      this._mode = 'globalSwitch';
      this.refresh();
    };

    let _Window_DebugEdit_itemName = Window_DebugEdit.prototype.itemName;
    Window_DebugEdit.prototype.itemName = function (dataId) {
      let key;
      switch (this._mode) {
        case 'globalSwitch':
          key = Object.keys(GlitchSaveManager.switches)[dataId - 1];
          return key || '';
        case 'globalVariable':
          key = Object.keys(GlitchSaveManager.variables)[dataId - 1];
          return key || '';
        case 'globalText':
          return 'globalText';
        case 'globalArray':
          return 'globalArray';
        default:
          return _Window_DebugEdit_itemName.call(this, dataId);
      }
    };

    let _Window_DebugEdit_itemStatus = Window_DebugEdit.prototype.itemStatus;
    Window_DebugEdit.prototype.itemStatus = function (dataId) {
      let key;
      switch (this._mode) {
        case 'globalSwitch':
          key = Object.keys(GlitchSaveManager.switches)[dataId - 1];
          return !!GlitchSaveManager.switches[key] ? '[ON]' : '[OFF]';
        case 'globalVariable':
          key = Object.keys(GlitchSaveManager.variables)[dataId - 1];
          return GlitchSaveManager.variables[key] || 0;
        case 'globalText':
          return 'globalText';
        case 'globalArray':
          return 'globalArray';
        default:
          return _Window_DebugEdit_itemStatus.call(this, dataId);
      }
    };

    Window_DebugEdit.prototype.update = function () {
      Window_Selectable.prototype.update.call(this);
      if (this.active) {
        switch (this._mode) {
          case 'globalSwitch':
            this.updateGlobalSwitch();
            break;
          case 'globalVariable':
            this.updateGlobalVariable();
            break;
          case 'globalText':
            return;
          case 'globalArray':
            return;
          case 'switch':
            this.updateSwitch();
            break;
          default:
            this.updateVariable();
        }
      }
    };

    Window_DebugEdit.prototype.updateGlobalSwitch = function () {
      if (Input.isRepeated('ok')) {
        var switchId = this.currentId();
        let key = Object.keys(GlitchSaveManager.switches)[switchId - 1];
        SoundManager.playCursor();
        GlitchSaveManager.toggleSwitch(key);
        this.redrawCurrentItem();
      }
    };

    Window_DebugEdit.prototype.updateGlobalVariable = function () {
      let variableId = this.currentId();
      let key = Object.keys(GlitchSaveManager.variables)[variableId - 1];
      if (Input.isRepeated('right')) {
        GlitchSaveManager.addVariable(key, 1);
        SoundManager.playCursor();
        this.redrawCurrentItem();
      }
      if (Input.isRepeated('left')) {
        GlitchSaveManager.addVariable(key, -1);
        SoundManager.playCursor();
        this.redrawCurrentItem();
      }
      if (Input.isRepeated('pagedown')) {
        GlitchSaveManager.addVariable(key, 10);
        SoundManager.playCursor();
        this.redrawCurrentItem();
      }
      if (Input.isRepeated('pageup')) {
        GlitchSaveManager.addVariable(key, -10);
        SoundManager.playCursor();
        this.redrawCurrentItem();
      }
    };

  })();

  //=============================================================================
  // Plugin End
  //=============================================================================

} else {
  var text = 'Glitch_SaveSystem requires DvLyon_Core at the latest version to run.';
  console.error(text);
  require('nw.gui').Window.get().showDevTools();
}