---
title: Linux终端调用可视化程序打开文件或路径
categories:
  - Linux
  - 实践问题
tags:
  - Linux
  - 实践问题
date: 2021-04-11 09:44:52
---

一般在控制台中，可以使用命令操作各式文本文件。但有些时候，我们需要在当前位置打开文件管理器或者其他的界面程序比如用`Word`打开`.doc`文件等。

常规做法是，打开文件管理器，再一层层点进对应目录，找到对应文件，再双击打开。如果文件层级很深，这将是一个很费力的操作。

其实在终端，我们可以通过命令调用某些程序，直接打开文件或者路径。

### 方式一: 借助nautilus

`nautilus` 是 `Ubuntu` 下默认的文件管理器。
在控制台可以使用 `nautilus` 命令打开文件管理器，并且文件管理器界面所处的路径和当前终端相同。

```shell
nautilus <path>
```

为了更方便的使用该命令，可以为它添加 `alias`

```shell
alias opendir='nautilus'
```

### 方式二：直接打开

大多数软件安装后都是可以从命令行调用启动的，如果不能在终端调用，也可以找到其安装路径，将其添加到环境变量中。

因此直接调用对应的应用程序，打开对应文件。例如

```shell
wps xxx.doc
FoxitReader xxx.pdf
```

### 方式三：xdg-open

上面介绍的两种方式需要记住两类命令，一类是打开路径的，一类是打开文件的，但我们用鼠标无论是打开文件夹还是打开文件都只有一个操作--双击，其背后的原理就是文件夹或文件的打开都绑定了一个默认操作它的程序。

所以，我们可以使用`xdg-open`命令打开文件或文件夹，剩下的具体用什么程序打开，交给系统去判断。

```shell
xdg-open xxx.doc
xdg-open xxx.pdf
xdg-open xxx.png
xdg-open xxx.mp4
xdg-open .
xdg-open ~/Downloads
```

`xdg-open`命令还有一个操作，就是可以传入网址，系统监测到是网址，于是调用默认的浏览器去打开它。

```shell
xdg-open https://www.baidu.com
```

总之，`xdg-open`可以完成所有你用鼠标双击的操作，都是调用默认的程序去打开对应的文件。

为了方便输入这个命令，同样可以给它添加一个`alias`

```shell
alias dakai='xdg-open'
alias 打开='xdg-open'
```

我们看到我们添加了两个`alias`，于是就实现了输入英文或者输入中文都能使用`xdg-open`的操作，免去了在终端还有切换一次中英文的操作。