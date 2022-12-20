---
title: Vim分屏操作
categories:
  - Tools
  - Vim
tags:
  - Vim
date: 2022-03-24 18:44:27
---

#### 水平方向打开新文件

```tex
:sp linuxmi.py  
或者  
:split linuxmi.py  
```

这个命令把窗口横向切分为两个窗口，并把光标置于上面的窗口中。

#### 垂直方向分屏打开新文件

```tex
:vsp linux.py  
:vsplit linux.py 
```

这个命令把窗口纵向切分为两个窗口，并把光标置于左边的窗口中。

#### 从命令行直接打开多个文件并分屏

```tex
vim -On file1, file2 ... # 垂直分屏  
vim -on file1, file2 ... # 水平分屏  
```

#### 调整窗口宽度

```tex
Ctrl-w >   # 向右加宽，默认值为1  
Ctrl-w N > # 向右加宽宽度N  
Ctrl-w <   # 向左加宽，默认值为1 
Ctrl-w N < # 向左加宽宽度N  
```

#### **横屏/竖屏分屏打开当前文件** 

```tex
Ctrl+w s  
Ctrl+w v 
```

#### 切换分屏

```tex
Ctrl+w h,j,k,l  
Ctrl+w 上下左右键  
Crtl+w进行分屏窗口的切换 按完以后再按一个w  
Crtl+w进行分屏窗口的切换 按完以后再按一个r 互换窗口  
Crtl+w进行分屏窗口的切换 按完以后再按一个c 关闭窗口 
```

#### 关闭分屏

```tex
Ctrl+W c 关闭当前窗口  
Ctrl+w q 关闭当前窗口，若只有一个分屏且退出vim  
:only 仅保留当前分屏  
:hide 关闭当前分屏  
```

#### 调整分屏大小

```tex
Ctrl+w = 所有分屏都统一高度  
Ctrl+w + 增加高度，默认值为1  
Ctrl+w - 减少高度  
10 ctrl+w + 增加10行高度  
Ctrl-w N + //当前屏高度加N 
```

#### 重设当前屏的高度

```tex
:resize 30
```

#### 移动分屏

```tex
Ctrl-w + K  # 将屏幕移动到最顶端 
Ctrl-w + J  # 将屏幕移动到最低端 
Ctrl-w + H  # 将屏幕移动到最左边 
Ctrl-w + L  # 将屏幕移动到最右边 
```

