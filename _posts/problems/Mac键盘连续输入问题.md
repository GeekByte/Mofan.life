---
title: Mac键盘连续输入问题
categories:
  - Problems
  - Mac
tags:
  - Mac
date: 2022-06-23 11:08:00
---

在 Vim 里移动光标的时候，发现长按 `l` 会弹出 `l` 键相关的其他内容，类似于提示框的东西。

在终端使用下面命令后重启电脑可解决:
```tex
defaults write NSGlobalDomain ApplePressAndHoldEnabled -boolean false

或者

defaults write -g ApplePressAndHoldEnabled -bool false
```

如果想要恢复，将上方 `false` 改成 `true` 后重启电脑即可。
