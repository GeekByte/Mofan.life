---
title: Hyper的个人配置
categories:
  - Tools
  - Hyper
tags:
  - Hyper
date: 2021-10-29 10:02:02
---

刚开始接触 Mac 的人，可能他的第二款终端软件就是 iTerm2，但是，用时间长了后，总感觉 iTerm2 不够纯粹，但好在 iTerm2 的功能还是挺多的，属于那种开箱就用也能体验良好的终端。
当我在思考替代 iTerm2 的终端的时候，我的需求渐渐清晰，一定要轻量，而且在好看的同时具有个性，于是我发现了 Hyper，看到的第一眼就喜欢上了这款终端，开启这个软件让人有一种眼前一亮的感觉.

说了这么多，就贴一份我的配置清单吧.
我使用的主题是: hyper-electron-highlighter, 需要通过 `hyper i hyper-electron-highlighter` 命令进行安装, 同时要注意该 plugins 要放到config下，因为后面还有我自定义的一些颜色，总之，注意顺序，别把修改的部分覆盖了.

> 如果你安装时，提示 hyper 命令不可用，你可以点击菜单栏的 Tools -> Install Hyper CLI command in PATH


> 另外，配合oh-my-zsh的主题使用效果更好，请参考: https://www.mofan.life/2021/10/29/oh-my-zsh%E8%87%AA%E7%94%A8%E4%B8%BB%E9%A2%98%E6%8E%A8%E8%8D%90/

> 如果安装oh-my-zsh后，发现 .bash_profile 里的环境变量不能用了，请在 .zshrc 的文件上面加上一行: source ~/.bash_profile

```js
"use strict";
// Future versions of Hyper may add additional config options,
// which will not automatically be merged into this file.
// See https://hyper.is#cfg for all currently supported options.
module.exports = {
    config: {
        // choose either `'stable'` for receiving highly polished,
        // or `'canary'` for less polished but more frequent updates
        updateChannel: 'stable',
        // default font size in pixels for all tabs
        fontSize: 14,
        // font family with optional fallbacks
        fontFamily: 'Monaco, Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
        // default font weight: 'normal' or 'bold'
        fontWeight: 'normal',
        // font weight for bold characters: 'normal' or 'bold'
        fontWeightBold: 'normal',
        // line height as a relative unit
        lineHeight: 1.1,
        // letter spacing as a relative unit
        letterSpacing: 1,
        // terminal cursor background color and opacity (hex, rgb, hsl, hsv, hwb or cmyk)
        cursorColor: 'rgba(248,28,229,0.8)',
        // terminal text color under BLOCK cursor
        cursorAccentColor: '#000',
        // `'BEAM'` for |, `'UNDERLINE'` for _, `'BLOCK'` for █
        cursorShape: 'BLOCK',
        // set to `true` (without backticks and without quotes) for blinking cursor
        cursorBlink: true,
        // color of the text
        foregroundColor: '#fff',
        // terminal background color
        // opacity is only supported on macOS
        backgroundColor: '#000',
        // terminal selection color
        selectionColor: 'rgba(204, 51, 255,0.4)',
        // border color (window, tabs)
        borderColor: '#333',
        // custom CSS to embed in the main window
        css: '::selection { background-color: rgba(233, 44, 108, 0.8); color: #fcfcfc; border-radius: 25px;}',
        // custom CSS to embed in the terminal window
        termCSS: '::selection { background-color: rgba(233, 44, 108, 0.8); color: #fcfcfc; border-radius: 25px;}',
        // set custom startup directory (must be an absolute path)
        workingDirectory: '',
        // if you're using a Linux setup which show native menus, set to false
        // default: `true` on Linux, `true` on Windows, ignored on macOS
        showHamburgerMenu: '',
        // set to `false` (without backticks and without quotes) if you want to hide the minimize, maximize and close buttons
        // additionally, set to `'left'` if you want them on the left, like in Ubuntu
        // default: `true` (without backticks and without quotes) on Windows and Linux, ignored on macOS
        showWindowControls: '',
        // custom padding (CSS format, i.e.: `top right bottom left`)
        padding: '10px 12px',
        // the full list. if you're going to provide the full color palette,
        // including the 6 x 6 color cubes and the grayscale map, just provide
        // an array here instead of a color map object
        plugins: ["hyper-electron-highlighter"],
        colors: {
              black: '#ffffff',
        //      red: '#66ff99',
              green: '#00ff66',
            yellow: '#ffff33',
        //     blue: '#0A2FC4',
             magenta: '#ff66cc',
        //     cyan: '#20C5C6',
             white: '#00ff00',
        //     lightBlack: '#686868',
        //     lightRed: '#FFFFFF',
        //     lightGreen: '#67F86F',
        //     lightYellow: '#009933',
        //     lightBlue: '#6A76FB',
             lightMagenta: '#9900ff',
        //     lightCyan: '#68FDFE',
             lightWhite: '#00ff00',
        //     limeGreen: '#32CD32',
        //     lightCoral: '#F08080',
        },
        // the shell to run when spawning a new session (i.e. /usr/local/bin/fish)
        // if left empty, your system's login shell will be used by default
        //
        // Windows
        // - Make sure to use a full path if the binary name doesn't work
        // - Remove `--login` in shellArgs
        //
        // Windows Subsystem for Linux (WSL) - previously Bash on Windows
        // - Example: `C:\\Windows\\System32\\wsl.exe`
        //
        // Git-bash on Windows
        // - Example: `C:\\Program Files\\Git\\bin\\bash.exe`
        //
        // PowerShell on Windows
        // - Example: `C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`
        //
        // Cygwin
        // - Example: `C:\\cygwin64\\bin\\bash.exe`
        shell: '/bin/zsh',
        // for setting shell arguments (i.e. for using interactive shellArgs: `['-i']`)
        // by default `['--login']` will be used
        shellArgs: ['--login'],
        // for environment variables
        env: {},
        // Supported Options:
        //  1. 'SOUND' -> Enables the bell as a sound
        //  2. false: turns off the bell
        bell: 'SOUND',
        // An absolute file path to a sound file on the machine.
        // bellSoundURL: '/path/to/sound/file',
        // if `true` (without backticks and without quotes), selected text will automatically be copied to the clipboard
        copyOnSelect: false,
        // if `true` (without backticks and without quotes), hyper will be set as the default protocol client for SSH
        defaultSSHApp: true,
        // if `true` (without backticks and without quotes), on right click selected text will be copied or pasted if no
        // selection is present (`true` by default on Windows and disables the context menu feature)
        quickEdit: false,
        // choose either `'vertical'`, if you want the column mode when Option key is hold during selection (Default)
        // or `'force'`, if you want to force selection regardless of whether the terminal is in mouse events mode
        // (inside tmux or vim with mouse mode enabled for example).
        macOptionSelectionMode: 'vertical',
        // Whether to use the WebGL renderer. Set it to false to use canvas-based
        // rendering (slower, but supports transparent backgrounds)
        webGLRenderer: false,
        // keypress required for weblink activation: [ctrl|alt|meta|shift]
        // todo: does not pick up config changes automatically, need to restart terminal :/
        webLinksActivationKey: '',
        // if `false` (without backticks and without quotes), Hyper will use ligatures provided by some fonts
        disableLigatures: true,
        // for advanced config flags please refer to https://hyper.is/#cfg
        windowSize: [900, 600]

       // verminal: {
       //   fontFamily: '"My favourite font"',
       //   fontSize: 16
       // },

       // Customize the theme
       // themeSettings: {
       //     // Do not make background transparent (default is 0.9)
       //     opacity: 1,
       //     // Switch from luke's orange uniform to master yoda (check the available styles above)
       //     style: 'luke',
       //     // Change the character that mars a tab active
       //     tabActiveMarker: '💁'
       // },

    },
    // a list of plugins to fetch and install from npm
    // format: [@org/]project[#version]
    // examples:
    //   `hyperpower`
    //   `@company/project`
    //   `project#1.0.1`
    // "hyper-ui", "hyper-aura-theme", "hyper-named-css-colors"
    //plugins: [
    //     "hyper-electron-highlighter",
    //],
    // in development, you can create a directory under
    // `~/.hyper_plugins/local/` and include it here
    // to load it and avoid it being `npm install`ed
    localPlugins: [],
    keymaps: {
    // Example
    // 'window:devtools': 'cmd+alt+o',
        "window:devtools": "command+alt+i",
        "window:reload": "command+shift+r",
        "window:reloadFull": "command+shift+f5",
        "window:preferences": "command+,",
        "zoom:reset": "command+0",
        "zoom:in": [
          "command+plus",
          "command+="
        ],
        "zoom:out": "command+-",  
        "window:new": "command+n",
        "window:minimize": "command+m",
        "window:zoom": "command+enter",
        "window:toggleFullScreen": "command+ctrl+f",
        "window:close": "command+shift+w",
        "tab:new": "command+t",
        "tab:next": [
          "command+shift+]",
          "command+shift+right",
          "command+alt+right",
          "ctrl+tab"
        ],
        "tab:prev": [
          "command+shift+[",
          "command+shift+left",
          "command+alt+left",
          "ctrl+shift+tab"
        ],
        "tab:jump:prefix": "command",
        "pane:next": "command+j", 
        "pane:prev": "command+k", 
        "pane:splitRight": "command+d",
        "pane:splitDown": "command+shift+d",
        "pane:close": "command+w",
        "editor:undo": "command+z",
        "editor:redo": "command+y",
        "editor:cut": "command+x",
        "editor:copy": "command+c",
        "editor:paste": "command+v",
        "editor:selectAll": "command+a",
        "editor:search": "command+f",
        "editor:search-close": "esc",
        "editor:movePreviousWord": "alt+left",
        "editor:moveNextWord": "alt+right",
        "editor:moveBeginningLine": "command+left",
        "editor:moveEndLine": "command+right",
        "editor:deletePreviousWord": "alt+backspace",
        "editor:deleteNextWord": "alt+delete",
        "editor:deleteBeginningLine": "command+backspace",
        "editor:deleteEndLine": "command+delete",
        "editor:break": "ctrl+c",
        "plugins:update": "command+shift+u"
      
    },
};
//# sourceMappingURL=config-default.js.map
```
