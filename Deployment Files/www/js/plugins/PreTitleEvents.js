"use strict";

//=============================================================================
// Hime @ HimeWorks - Pre-Title Events (Mod by DvLyon)
// PreTitleEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.PreTitleEvents = true;

var TH = TH || {};
TH.PreTitleEvents = TH.PreTitleEvents || {};
TH.PreTitleEvents.isModDvLyon = true;

/*:
-------------------------------------------------------------------------
@title Pre-Title Events (Mod by DvLyon)
@author Hime @ HimeWorks (http://himeworks.com
@date Feb 23, 2016
@filename PreTitleEvents.js
@url http://himeworks.com/2015/11/pre-title-events/

If you enjoy my work, consider supporting me on Patreon!

https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/
-------------------------------------------------------------------------
@plugindesc Build your own sequence of events that should occur before
the title screen begins

@help
-------------------------------------------------------------------------
== Description ==

RPG Maker MV gives you a nice title screen, but it doesn't give you much
control over what should happen before the game goes to the title
screen.

For example, you might want to show some splash screens, or perhaps
an introductory video.

With this plugin, you can easily put together what should happen before
the title screen using events that you are already familiar with.

Because it is an event, you can do basically anything you want!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Feb 23, 2016 - pre-title map can be used as the title screen.
Nov 14, 2015 - switched to a new pre-title map subclass
Nov  5, 2015 - initial release

== Usage ==

-- Use as Splash Screen --

Start by creating a new map where you will be creating your pre-title
event.

Next, go to the plugin manager, double-click on my plugin entry, and
then set the "Pre-Title Map ID" value to the ID of your map.

Note that the pre-title event doesn't automatically go to the title
screen when your event is finished. This is to provide you with full
control over how the event will behave.

If you would like to go to the title screen afterwards, you can make
the following script call:

   SceneManager.goto(Scene_Title)

-------------------------------------------------------------------------
 *
 * @param Pre-Title Map ID
 * @desc Default map to show for pre-title events
 * @type number
 * @min 1
 * @default 1
 *
*/

//=============================================================================
// Declarations
//=============================================================================

function Scene_PretitleMap() {
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

	TH.PreTitleEvents.Parameters = PluginManager.parameters('PreTitleEvents')
	TH.PreTitleEvents.MapID = Math.max(toNumber(TH.PreTitleEvents.Parameters['Pre-Title Map ID'], 1), 1)

	//=============================================================================
	// Managers
	//=============================================================================

	/* ConfigManager */

	Object.defineProperty(ConfigManager, 'preTitleMap', {
		get: function() {
			return this._preTitleMap
		},
		set: function(value) {
			this._preTitleMap = value
		},
		configurable: true
	})

	var _ConfigManager_makeData = ConfigManager.makeData
	ConfigManager.makeData = function() {
		var config = _ConfigManager_makeData.call(this)
		config.preTitleMap = this._preTitleMap
		return config
	}

	var _ConfigManager_applyData = ConfigManager.applyData
	ConfigManager.applyData = function(config) {
		_ConfigManager_applyData.call(this, config)
		this._preTitleMap = this.readText(config, 'preTitleMap', TH.PreTitleEvents.MapID)
	}

	//=============================================================================
	// Objects
	//=============================================================================

	/* Game_Interpreter */

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		if (command === 'preTitleEventMap') {
			ConfigManager['preTitleMap'] = toNumber(args[0], TH.PreTitleEvents.MapID)
			ConfigManager.save()
		} else {
			_Game_Interpreter_pluginCommand.call(this, command, args)
		}
	}

	//=============================================================================
	// Scenes
	//=============================================================================

	//-----------------------------------------------------------------------------
	// Scene_PretitleMap
	//
	// The scene class of the map screen to be displayed as the title screen.

	Scene_PretitleMap.prototype = Object.create(Scene_Map.prototype)
	Scene_PretitleMap.prototype.constructor = Scene_PretitleMap

	Scene_PretitleMap.prototype.initialize = function() {
		Scene_Map.prototype.initialize.call(this)
		$gamePlayer.reserveTransfer(ConfigManager['preTitleMap'], 0, 0)
	}

})()

//=============================================================================
// Plugin End
//=============================================================================

} else {
	var text = 'PreTitleEvents requires DvLyon_Core at the latest version to run.'
	console.error(text)
	require('nw.gui').Window.get().showDevTools()
}

//=============================================================================
// Modded by DvLyon Games
//=============================================================================