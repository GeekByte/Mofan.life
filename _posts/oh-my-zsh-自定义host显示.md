---
title: oh my zsh 自定义host显示
categories:
  - null
tags:
  - null
date: 2021-07-20 23:01:50
---

这个方法也可修改文件显示的层级，防止在终端里路径过长。

1.查看自己用的oh-my-zsh主题
```shell
vim ~/.zshrc
```
找到`ZSH_THEME`

2.编辑`.oh-my-zsh/themes/murilasso.zsh-theme`
这个文件类似shell脚本，其中PS1大多用于定义终端显示的东西，具体根据实际情况修改，懂shell语法的应该一看就知道怎么改了。




