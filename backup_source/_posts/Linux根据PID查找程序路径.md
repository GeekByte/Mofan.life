---
title: Linux根据PID查找程序路径
categories:
  - Linux
tags:
  - Linux
date: 2021-10-21 09:42:17
---

1. 拿到PID，假设为6666
2. 进入到`/proc`目录下以该进程ID命名的文件夹下，即`/proc/6666`

3. 输入`ls -ail`,查看结果中`exe`链接到的文件路径信息
4. 进入到此路径干掉程序。

注：有时候`docker`里跑的程序，通过`exe`拿到的路径并不能找到对应程序，因为docker里的路径是相对于docker而言的，非系统路径而言，这时候可以通过 `find / -name xxx`,xxx为程序名，从系统根目录搜索程序的位置，一半这种程序位于docker的安装目录下，如果想节省时间可以直接去docker安装目录下搜索。

