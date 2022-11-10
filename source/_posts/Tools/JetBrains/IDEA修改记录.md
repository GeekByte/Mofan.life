---
title: IDEA修改记录
categories:
  - Tools
  - JetBrains
tags:
  - Tools
  - IDEA
date: 2022-11-10 15:54:04
---

定义：
- 编辑区：写代码的地方
- 目录树：显示目录的地方

通过两个定义两个区来区分修改的内容。


## 编辑区

### 去掉顶部Tab标签

路径：Preferences --> Editor --> General --> Editor Tabs
操作：在 Appearance 中，将 Tab placement 设置为 None.

Editor Tab 是关于 Tab 标签页的配置，可以配置 是否显示文件图标，是否显示文件类型后缀，修改的文件是否加*提示，用更小字体显示文件名，以及调整 Tab 标签页的上下左右位置。

### 编辑时，设置光标为块状光标

路径：Preferences --> Editor --> General --> Appearance
操作：勾选 Use block caret

此处还可以设置 是否显示行号等。

### 关掉代码中无聊的提示

这种提示包括：方法里定义的形参名字，变量/方法 被使用次数，Git中谁编写的代码提示等。

路径：Preferences --> Editor --> Inlay Hints
操作：如果关掉些不需要的提示，可以点开里面的选项查看，否则直接全部关闭即可。

## 目录树

默认的还好


## 主题

使用的是 XCode-Dark，注意有个 XCode Dark，后者主题色彩偏暗，前者相对明亮一些。

### 主题修改

路径：Preferences --> Editor --> Color Scheme -- General

可以设置行号颜色等，也可以设置代码里不同类型数据高亮的颜色，记得选择对应的语言设置，比如Java。


## 编码习惯

### 使用 Tab 键选择自动补全提示

路径：Preferences --> Keymap
操作: 
我是基于 VSCode 的键修改的，可以复制一份，在备份上修改。在 Keymap 的搜索框里，输入：next completion，你会看到：Other/Select Next Completion Option，双击，选择 Add Keyboard Shortcut，点击 右侧+，选择 Set ⇥, 然后，如果你想通过 Shift + Tab 向上选择，搜索：previous completion, 你会看到 Other/Select Previous Completion Option，双击，选择 Add Keyboard Shortcut，点击 右侧+，选择 Set ⇧⇥，别着急，还需要恢复 Tab键自己的功能，搜索：tab，找到 Editor Actions/Tab，重复上面的操作，选择 Set ⇥。



