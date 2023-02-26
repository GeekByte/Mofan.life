---
title: Linux添加图形化程序自启动
categories:
  - Linux
tags:
  - Linux
date: 2021-11-03 10:36:36
---

### 1.先拿到程序的启动命令

输入: `dpkg -L 程序名`
在列表中找到能启动程序的命令，一般在bin下.

### 2.添加到启动项中

输入: `gnome-session-properties`
在打开的窗口中新增启动项
