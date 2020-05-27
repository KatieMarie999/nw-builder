"use strict";

//-----------------------------------------------------------------------------
//  Galv's Custom Title (Mod by DvLyon)
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_CustomTitle.js
//-----------------------------------------------------------------------------
//  2017-11-29 - Version 1.5 - hopefully fixed issue with caching some had
//  2016-08-15 - Version 1.4 - added touch/click to work with "press start"
//  2016-08-10 - Version 1.3 - fixed issues with MV version 1.3
//  2016-07-07 - Version 1.2 - fixed a bug that caused crash when no sprites
//  2016-06-19 - Version 1.1 - 'press start' will only displays once now
//  2016-06-13 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_CustomTitle = true;

var Galv = Galv || {};            // Galv's main object
Galv.TITLE = Galv.TITLE || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.5) A plugin to allow you to modify aesthetics of the
 * default title screen. (Mod by DvLyon)
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param -- Command Window --
 * @desc
 * @default
 *
 * @param Cmd Width
 * @desc Width of the command window in pixels
 * Default: 240
 * @default 240
 *
 * @param Cmd Position X
 * @desc The command menu X position code.
 * Default: (Graphics.boxWidth - this.width) / 2
 * @default (Graphics.boxWidth - this.width) / 2
 *
 * @param Cmd Position Y
 * @desc The command menu Y position code.
 * Default: Graphics.boxHeight - this.height - 96
 * @default Graphics.boxHeight - this.height - 96
 *
 * @param Cmd Windowskin
 * @desc Windowskin file from /img/system/ for the command menu window
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param Cmd Window Opacity
 * @desc The opacity of the command menu background.
 * Default: 255
 * @default 255
 *
 * @param Cmd Text Align
 * @desc left,center or right - the alignment of text in the command menu
 * Default: left
 * @default left
 *
 * @param Cmd Font Name
 * @desc The name of the font. Note, this can be different to the font filename.
 * @default
 *
 * @param Cmd Font File
 * @desc The name of the font file located in /fonts/ folder in your directory.
 * @default
 *
 * @param Cmd Font Size
 * @desc How large the font is in the command menu
 * Default: 28
 * @default 28
 *
 * @param Cmd Color
 * @desc The color of the command text
 * Default: #ffffff
 * @default #ffffff
 *
 * @param Cmd Outline Width
 * @desc How large the font outline of the cmd menu text is
 * Default: 4
 * @default 4
 *
 * @param Cmd Outline Color
 * @desc The color of the cmd text outline
 * Default: #000000
 * @default #000000
 *
 * @param Cmd Button Size
 * @desc The size of the command buttons
 * Default: 36
 * @default 36
 *
 * @param -- Title Text --
 * @desc
 * @default
 *
 * @param Title Position X
 * @desc X position for title text
 * Default: 20
 * @default 20
 *
 * @param Title Position Y
 * @desc Y position for title text
 * Default: Graphics.height / 4
 * @default Graphics.height / 4
 *
 * @param Title Width
 * @desc Width the title text can take up.
 * Default: Graphics.width - x * 2;
 * @default Graphics.width - x * 2;
 *
 * @param Title Text Align
 * @desc left,center or right - the alignment of the title text
 * Default: center
 * @default center
 *
 * @param Title Font Name
 * @desc The name of the font. Note, this can be different to the font filename.
 * @default
 *
 * @param Title Font File
 * @desc The name of the font file located in /fonts/ folder in your directory.
 * @default
 *
 * @param Title Font Size
 * @desc How large the font is in the title text
 * Default: 72
 * @default 72
 *
 * @param Title Color
 * @desc The color of the title text
 * Default: #ffffff
 * @default #ffffff
 *
 * @param Title Outline Width
 * @desc How large the outline on the title text is
 * Default: 8
 * @default 8
 *
 * @param Title Outline Color
 * @desc The color of the title text outline
 * Default: #000000
 * @default #000000
 *
 * @param -- Press Start --
 * @desc
 * @default
 *
 * @param Start Image
 * @desc Image displayed from /img/system/ that disappears when player presses OK. Leave blank to not use.
 * @default
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param Start Position X
 * @desc The press start image X position code.
 * Default: (Graphics.boxWidth - this.pStart.width) / 2
 * @default (Graphics.boxWidth - this.pStart.width) / 2
 *
 * @param Start Position Y
 * @desc The press start image Y position code.
 * Default: Graphics.boxHeight - this.pStart.height - 96
 * @default Graphics.boxHeight - this.pStart.height - 96
 *
 * @param Start Blinking
 * @desc Settings to set the "Press Start" blinking effect.
 * fadeSpeed,pauseTimeIn,pauseTimeOut,minOpacity
 * @default 5,10,10,120
 *
 * @param Start Show Once
 * @desc true or false if press start image will shown only once or every time
 * @default true
 *
 * @param -- Advanced --
 * @desc
 * @default
 *
 * @param Layer Graphics
 * @desc Setup for layer graphics. See help file for more info.
 * fileName,xMove,yMove,opacity,z
 * @default
 *
 * @param Animated Sprites
 * @desc Setup for animated sprites. See help file for more info.
 * fileName,frames,animSpeed,x,y,repeat,z,animId
 * @default
 *
 * @help
 *   Galv's Custom Title
 * ----------------------------------------------------------------------------
 * A plugin to allow you to modify aesthetics of the default title screen.
 * ----------------------------------------------------------------------------
 *   "Start Blinking" Setting
 * ----------------------------------------------------------------------------
 * Settings to set the "Press Start" blinking effect.
 * fadeSpeed    = the speed at which the "Press Start" image fades in and out
 * pauseTimeIn  = frames the image pauses for when faded completely in
 * pauseTimeOut = frames the image pauses for when faded completely out
 * minOpacity   = the minimum opacity for the image to fade to before fading
 *                back in again.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   Animated Sprites
 * ----------------------------------------------------------------------------
 * This field is for setting up animated sprites using your own custom made
 * animation sheets. The data should be inputted in the order below:
 *
 *      fileName,frames,animSpeed,x1-x2,y1-y2,repeat,z,animId
 *
 * fileName    = name of the sprite sheet image in /img/system/
 * frames      = number of frames the sprite will cycle through
 * animSpeed   = how fast the sprite cycles through its frames
 * x1-x2       = x position randomized between x1 and x2
 * y1-y2       = y position randomized between y1 and y2
 * repeat      = true or false if the sprite loops it's frames or not
 * z           = the z level of the object to appear above/below others
 * animId      = animation from the database that is played on the sprite
 *               every time it loops.
 *
 * EXAMPLE:
 * titlegalv,6,10,100-400,100-400,true,500,1
 *
 * To add multiple animated sprites, add a | symbol after the sprite data set
 * before adding the next animated sprite's data. You can add as many as
 * required.
 *
 * ----------------------------------------------------------------------------
 *   Layer Graphics
 * ----------------------------------------------------------------------------
 * This field is for setting up layer graphics using graphics from
 * /img/parallaxes/ folder. The data should be inputted in the order below:
 *
 *      fileName,xMove,yMove,opacity,z
 *
 * To add multiple layers, add a | symbol after the layer graphic data set
 * before adding the next layer graphic data. You can add as many as required.
 *
 * ----------------------------------------------------------------------------
 *   Z value positions
 * ----------------------------------------------------------------------------
 * The default title objects have had z values set to the below:
 * Title image 1  = 0
 * Title Image 2  = 1
 * Title Text     = 2
 * Command Window = 3
 * Press Start    = 4
 * Animations     = 8
 *
 * When adding layers/sprites, use values to position them between the above
 * however you require. You can use decimal numbers to position things.
 */

//=============================================================================
// Declarations
//=============================================================================

function Scene_CustomTitle() {
	this.initialize.apply(this, arguments)
}

function Window_CustomTitleCommand() {
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

	Galv.TITLE.Parameters = PluginManager.parameters('Galv_CustomTitle')

	// Command Menu
	Galv.TITLE.cmdWidth = Number(Galv.TITLE.Parameters["Cmd Width"])
	Galv.TITLE.cmdX = Galv.TITLE.Parameters["Cmd Position X"]
	Galv.TITLE.cmdY = Galv.TITLE.Parameters["Cmd Position Y"]
	Galv.TITLE.cmdSkin = Galv.TITLE.Parameters["Cmd Windowskin"]
	Galv.TITLE.cmdWinOpac = Number(Galv.TITLE.Parameters["Cmd Window Opacity"])
	Galv.TITLE.cmdAlign = Galv.TITLE.Parameters["Cmd Text Align"].toLowerCase()
	Galv.TITLE.cmdFont = Galv.TITLE.Parameters["Cmd Font Name"]
	Galv.TITLE.cmdFontFile = Galv.TITLE.Parameters["Cmd Font File"]
	if (Galv.TITLE.cmdFont !== "") {
		Graphics.loadFont(Galv.TITLE.cmdFont,'fonts/' + Galv.TITLE.cmdFontFile)
	}
	Galv.TITLE.cmdFontSize = Number(Galv.TITLE.Parameters["Cmd Font Size"])
	Galv.TITLE.cmdFontOutline = Number(Galv.TITLE.Parameters["Cmd Outline Width"])
	Galv.TITLE.cmdFontOutlineColor = Galv.TITLE.Parameters["Cmd Outline Color"]
	Galv.TITLE.cmdFontColor = Galv.TITLE.Parameters["Cmd Color"]
	Galv.TITLE.cmdBtnSize = Number(Galv.TITLE.Parameters["Cmd Button Size"])

	// Title
	Galv.TITLE.tAlign = Galv.TITLE.Parameters["Title Text Align"].toLowerCase()
	Galv.TITLE.tX = Galv.TITLE.Parameters["Title Position X"]
	Galv.TITLE.tY = Galv.TITLE.Parameters["Title Position Y"]
	Galv.TITLE.tWidth = Galv.TITLE.Parameters["Title Width"]
	Galv.TITLE.tFont = Galv.TITLE.Parameters["Title Font Name"]
	Galv.TITLE.tFontFile = Galv.TITLE.Parameters["Title Font File"]
	if (Galv.TITLE.tFont !== "") {
		Graphics.loadFont(Galv.TITLE.tFont,'fonts/' + Galv.TITLE.tFontFile)
	}
	Galv.TITLE.tFontSize = Number(Galv.TITLE.Parameters["Title Font Size"])
	Galv.TITLE.tFontOutline = Number(Galv.TITLE.Parameters["Title Outline Width"])
	Galv.TITLE.tFontOutlineColor = Galv.TITLE.Parameters["Title Outline Color"]
	Galv.TITLE.tFontColor = Galv.TITLE.Parameters["Title Color"]

	// Press Start
	Galv.TITLE.sImage = Galv.TITLE.Parameters["Start Image"]
	Galv.TITLE.sX = Galv.TITLE.Parameters["Start Position X"]
	Galv.TITLE.sY = Galv.TITLE.Parameters["Start Position Y"]
	var txt = Galv.TITLE.Parameters["Start Blinking"].split(",")
	Galv.TITLE.sFade = Number(txt[0])
	Galv.TITLE.sPauseIn = Number(txt[1])
	Galv.TITLE.sPauseOut = Number(txt[2])
	Galv.TITLE.sOpac = Number(txt[3])
	Galv.TITLE.sShowOnce = Galv.TITLE.Parameters["Start Show Once"].toLowerCase() == 'true' ? true : false

	Galv.TITLE.alreadyShown = function() {
		return !!Galv.TITLE.sShowOnce ? Galv.TITLE.isAlreadyShown : false
	}

	// Animated Sprites
	/*
	0: fileName
	1: no.frames
	2: speed of frames
	3: x1-x2
	4: y1-y2
	5: repeat - true or false
	6: z
	7: animation ID
	*/
	Galv.TITLE.spriteData = []
	var txt = Galv.TITLE.Parameters["Animated Sprites"].split("|")
	for (var i = 0; i < txt.length; i++) {
		Galv.TITLE.spriteData[i] = txt[i].split(",")
	}

	// Layer Graphics
	/*
	0: fileName
	1: xMove
	2: yMove
	3: opacity
	4: z
	*/
	Galv.TITLE.layerData = []
	var txt = Galv.TITLE.Parameters["Layer Graphics"].split("|")
	for (var i = 0; i < txt.length; i++) {
		Galv.TITLE.layerData[i] = txt[i].split(",")
	}

	//=============================================================================
	// Scenes
	//=============================================================================

	/* Scene_Boot */

	// CACHE MV == 1.3
	Galv.TITLE.Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages
	Scene_Boot.loadSystemImages = function() {
		ImageManager.reserveSystem(Galv.TITLE.cmdSkin)
		ImageManager.reserveSystem(Galv.TITLE.sImage)
		Galv.TITLE.Scene_Boot_loadSystemImages.call(this)
		for (var i = 0; i < Galv.TITLE.spriteData.length; i++) {
			ImageManager.reserveSystem(Galv.TITLE.spriteData[i][0])
		}
		for (var i = 0; i < Galv.TITLE.layerData.length; i++) {
			ImageManager.reserveParallax(Galv.TITLE.layerData[i][0])
		}
	}

	//-----------------------------------------------------------------------------
	// Scene_CustomTitle
	//
	// The scene class of the title screen.

	Scene_CustomTitle.prototype = Object.create(Scene_Title.prototype)
	Scene_CustomTitle.prototype.constructor = Scene_CustomTitle

	Scene_CustomTitle.prototype.initialize = function() {
		Scene_Title.prototype.initialize.call(this)
	}

	Scene_CustomTitle.prototype.createBackground = function() {
		this._sLayer = new Tilemap()
		this.addChild(this._sLayer)

		this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name))
		this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name))
		this._backSprite1.z = 0
		this._backSprite2.z = 1
		this._sLayer.addChild(this._backSprite1)
		this._sLayer.addChild(this._backSprite2)

		this.createSprites()
		this.createLayers()
		this.createPressStart()
	}

	Scene_CustomTitle.prototype.createForeground = function() {
		this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height))
		this._sLayer.addChild(this._gameTitleSprite)
		this._gameTitleSprite.z = 2
		if (!!$dataSystem.optDrawTitle) {
			this.drawGameTitle()
		}
	}

	Scene_CustomTitle.prototype.createWindowLayer = function() {
		var width = Graphics.boxWidth
		var height = Graphics.boxHeight
		var x = (Graphics.width - width) / 2
		var y = (Graphics.height - height) / 2
		this._windowLayer = new WindowLayer()
		this._windowLayer.move(x, y, width, height)
		this._windowLayer.z = 3
		this._sLayer.addChild(this._windowLayer)
	}

	Scene_CustomTitle.prototype.drawGameTitle = function() {
		var x = eval(Galv.TITLE.tX)
		var y = eval(Galv.TITLE.tY)
		var maxWidth = eval(Galv.TITLE.tWidth)
		var text = $dataSystem.gameTitle
		if (Galv.TITLE.tFont !== "") {
			this._gameTitleSprite.bitmap.fontFace = Galv.TITLE.tFont
		}
		this._gameTitleSprite.bitmap.outlineColor = Galv.TITLE.tFontOutlineColor
		this._gameTitleSprite.bitmap.outlineWidth = Galv.TITLE.tFontOutline
		this._gameTitleSprite.bitmap.fontSize = Galv.TITLE.tFontSize
		this._gameTitleSprite.bitmap.textColor = Galv.TITLE.tFontColor
		this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, Galv.TITLE.tAlign)
	}

	Scene_CustomTitle.prototype.isBusy = function() {
		return this._commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this) || this._pressStart
	}

	Scene_CustomTitle.prototype.createSprites = function() {
		this._sprites = []
		for (var i = 0; i < Galv.TITLE.spriteData.length; i++) {
			if (Galv.TITLE.spriteData[i].length > 1) {
				this._sprites[i] = new Sprite_TitleSprite(i)
				this._sLayer.addChild(this._sprites[i])
			}
		}
	}

	Scene_CustomTitle.prototype.createLayers = function() {
		this._layers = []
		for (var i = 0; i < Galv.TITLE.layerData.length; i++) {
			this._layers[i] = new Sprite_TitleTileSprite(i)
			this._layers[i].move(0, 0, Graphics.width, Graphics.height)
			this._sLayer.addChild(this._layers[i])
		}
	}

	Scene_CustomTitle.prototype.createPressStart = function() {
		this._fade = 1
		this._pause = 0
		if ((Galv.TITLE.sImage !== "") && !Galv.TITLE.alreadyShown()) {
			this.pStart = new Sprite()
			this.pStart.bitmap = ImageManager.loadSystem(Galv.TITLE.sImage)
			this.pStart.opacity = 0
			this.pStart.x = eval(Galv.TITLE.sX)
			this.pStart.y = eval(Galv.TITLE.sY)
			this.pStart.z = 4
			this._sLayer.addChild(this.pStart)
			this._pressStart = true
			Galv.TITLE.isAlreadyShown = true
		}
	}

	Scene_CustomTitle.prototype.update = function() {
		Scene_Title.prototype.update.call(this)
		this.updatePressStart()
	}

	Scene_CustomTitle.prototype.updatePressStart = function() {
		if (this._pressStart) {
			switch (this._fade) {
				case 1:
					// fade in
					this.pStart.opacity += Galv.TITLE.sFade
					if (this.pStart.opacity >= 255) {
						this._pause = Galv.TITLE.sPauseIn
						this._fade = 2
					}
					break
				case 0:
					// fade out
					this.pStart.opacity -= Galv.TITLE.sFade
					if (this.pStart.opacity <= Galv.TITLE.sOpac) {
						this._pause = Galv.TITLE.sPauseOut
						this._fade = 2
					}
					break
				case 2:
					// pause
					this._pause -= 1
					if (this._pause <= 0) {
						if (this.pStart.opacity >= 255) {
							this._fade = 0
						}
						if (this.pStart.opacity <= Galv.TITLE.sOpac) {
							this._fade = 1
						}
					}
					break
			}
			if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isPressed()) {
				SoundManager.playOk()
				this._pressStart = false
			}
		} else if (this.pStart) {
			this.pStart.opacity -= Galv.TITLE.sFade * 4
		}
	}

	Scene_CustomTitle.prototype.createCommandWindow = function() {
		this._commandWindow = new Window_CustomTitleCommand()
		this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this))
		this._commandWindow.setHandler('continue', this.commandContinue.bind(this))
		this._commandWindow.setHandler('options',  this.commandOptions.bind(this))
		this.addWindow(this._commandWindow)
	}

	//=============================================================================
	// Sprites
	//=============================================================================

	//-----------------------------------------------------------------------------
	// Sprite_TitleSprite
	//
	// The sprite class for the title screen.

	function Sprite_TitleSprite() {
		this.initialize.apply(this, arguments)
	}

	Sprite_TitleSprite.prototype = Object.create(Sprite_Base.prototype)
	Sprite_TitleSprite.prototype.constructor = Sprite_TitleSprite

	Sprite_TitleSprite.prototype.initialize = function(id) {
		Sprite_Base.prototype.initialize.call(this)
		this._id = id
		this.createImage()
		this._ticker = 0
		this._pattern = 0
		this.updateFrame()
	}

	/*
	0: fileName
	1: no.frames
	2: speed of frames
	3: x1-x2
	4: y1-y2
	5: repeat - true or false
	6: z value
	7: animation ID
	*/
	Sprite_TitleSprite.prototype.data = function(index) {
		return Galv.TITLE.spriteData[this._id][index]
	}

	Sprite_TitleSprite.prototype.createImage = function() {
		this.bitmap = ImageManager.loadSystem(this.data(0))
		this._frames = Number(this.data(1))
		this._frameWidth = this.bitmap.width / this._frames
		this._frameHeight = this.bitmap.height
		this._maxPattern = this._frames - 1
		this._tickSpeed = Number(this.data(2))
		this.anchor.y = 0.5
		this.anchor.x = 0.5
		this.opacity = 255
		// Set x position
		var xRange = this.data(3).split("-")
		xRange[0] = Number(xRange[0])
		xRange[1] = xRange[1] ? Number(xRange[1]) : xRange[0]
		this.x = Math.randomInt(xRange[1] - xRange[0]) + xRange[0]
		// Set y position
		var yRange = this.data(4).split("-")
		yRange[0] = Number(yRange[0])
		yRange[1] = yRange[1] ? Number(yRange[1]) : yRange[0]
		this.y = Math.randomInt(yRange[1] - yRange[0]) + yRange[0]
		this._repeat = this.data(5).toLowerCase() == 'true' ? true : false
		this.z = Number(this.data(6))
	}

	Sprite_TitleSprite.prototype.update = function() {
		Sprite_Base.prototype.update.call(this)
		this.updateFrame()
		this.updateAnimation()
	}

	Sprite_TitleSprite.prototype.updateFrame = function() {
		if (this._pattern == 0 && this._ticker == 0) {
			this.doAnim()
		}

		var pw = this._frameWidth
		var ph = this._frameHeight
		var sx = this._pattern * pw
		this.setFrame(sx, 0, pw, ph)

		this._ticker += 1
		if (this._ticker >= this._tickSpeed) {
			if (this._pattern === this._maxPattern) {
				if (this._repeat) {
					this._pattern = 0
				}
			} else {
				this._pattern = this._pattern + 1
			}
			this._ticker = 0
		}
	}

	Sprite_TitleSprite.prototype.doAnim = function() {
		this._animId = Number(this.data(7))
	}

	Sprite_TitleSprite.prototype.updateAnimation = function() {
		this.setupAnimation()
		if (!this.isAnimationPlaying()) {
			this._animationPlaying = false
		}
	}

	Sprite_TitleSprite.prototype.setupAnimation = function() {
		if (this._animId > 0) {
			var animation = $dataAnimations[this._animId]
			this.startAnimation(animation, false, 0)
			this._animId = 0
			this._animationPlaying = true
		}
	}

	//-----------------------------------------------------------------------------
	// Sprite_TitleTileSprite
	//
	// The sprite class for the title screen tile.

	function Sprite_TitleTileSprite() {
		this.initialize.apply(this, arguments)
	}

	Sprite_TitleTileSprite.prototype = Object.create(TilingSprite.prototype)
	Sprite_TitleTileSprite.prototype.constructor = Sprite_TitleTileSprite

	Sprite_TitleTileSprite.prototype.initialize = function(id) {
		TilingSprite.prototype.initialize.call(this)
		this._id = id
		this.createImage()
	}

	/*
	0: fileName
	1: xMove
	2: yMove
	3: Opacity
	4: z value
	*/
	Sprite_TitleTileSprite.prototype.data = function(index) {
		return Galv.TITLE.layerData[this._id][index]
	}

	Sprite_TitleTileSprite.prototype.createImage = function() {
		this.bitmap = ImageManager.loadParallax(this.data(0))
		this.xSpeed = Number(this.data(1))
		this.ySpeed = Number(this.data(2))
		this.opacity = Number(this.data(3))
		this.z = Number(this.data(4))
	}

	Sprite_TitleTileSprite.prototype.update = function() {
		this.origin.x += this.xSpeed
		this.origin.y += this.ySpeed
	}

	//=============================================================================
	// Windows
	//=============================================================================

	//-----------------------------------------------------------------------------
	// Window_CustomTitleCommand
	//
	// The custom window for selecting New Game/Continue on the title screen.

	Window_CustomTitleCommand.prototype = Object.create(Window_TitleCommand.prototype)
	Window_CustomTitleCommand.prototype.constructor = Window_CustomTitleCommand

	Window_CustomTitleCommand.prototype.initialize = function() {
		Window_TitleCommand.prototype.initialize.call(this)
		this.opacity = Galv.TITLE.cmdWinOpac
		if (Galv.TITLE.alreadyShown() && Galv.TITLE.cmdOpened) {
			this.openness = 255
		}
	}

	Window_CustomTitleCommand._lastCommandSymbol = null

	Window_CustomTitleCommand.initCommandPosition = function() {
		this._lastCommandSymbol = null
	}

	Window_CustomTitleCommand.prototype.close = function() {
		if (!Galv.TITLE.alreadyShown()) {
			Window_TitleCommand.prototype.close.call(this)
		}
	}

	Window_CustomTitleCommand.prototype.open = function() {
		Window_TitleCommand.prototype.open.call(this)
		Galv.TITLE.cmdOpened = true
	}

	Window_CustomTitleCommand.prototype.loadWindowskin = function() {
		this.windowskin = ImageManager.loadSystem(Galv.TITLE.cmdSkin)
	}

	Window_CustomTitleCommand.prototype.updatePlacement = function() {
		this.x = eval(Galv.TITLE.cmdX)
		this.y = eval(Galv.TITLE.cmdY)
	}

	Window_CustomTitleCommand.prototype.windowWidth = function() {
		return Galv.TITLE.cmdWidth
	}
	Window_CustomTitleCommand.prototype.itemTextAlign = function() {
		return Galv.TITLE.cmdAlign
	}
	Window_CustomTitleCommand.prototype.lineHeight = function() {
		return Galv.TITLE.cmdBtnSize
	}

	Window_CustomTitleCommand.prototype.standardFontFace = function() {
		if (Galv.TITLE.cmdFont !== "") {
			return Galv.TITLE.cmdFont
		}
		return Window_TitleCommand.prototype.standardFontFace.call(this)
	}

	Window_CustomTitleCommand.prototype.drawItem = function(index) {
		this.contents.fontSize = Galv.TITLE.cmdFontSize
		this.contents.outlineWidth = Galv.TITLE.cmdFontOutline
		this.contents.outlineColor = Galv.TITLE.cmdFontOutlineColor
		Window_TitleCommand.prototype.drawItem.call(this,index)
	}

	Window_CustomTitleCommand.prototype.resetTextColor = function() {
		this.changeTextColor(Galv.TITLE.cmdFontColor)
	}

})()

//=============================================================================
// Plugin End
//=============================================================================

} else {
	var text = 'Galv_CustomTitle requires DvLyon_Core at the latest version to run.'
	console.error(text)
	require('nw.gui').Window.get().showDevTools()
}

//=============================================================================
// Modded by DvLyon Games
//=============================================================================