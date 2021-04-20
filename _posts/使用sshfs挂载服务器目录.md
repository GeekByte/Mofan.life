---
title: 使用sshfs挂载服务器目录
categories:
  - Linux
tags:
  - Linux
  - sshfs
date: 2021-04-20 20:37:14
---

因为我的开发环境是`Mac`和`Ubuntu`，所以有时候传输文件的时候，都是用的`scp`，但用`scp`传输文件的意图太明显了，我想让传输变得就像在本地移动文件一样，更加的自然，于是就有了本文。

我做的是把`Ubuntu`的工作目录放到了我的`Mac`上，用的工具就是`sshfs`，操作很简单，这里简单介绍一下安装和简单的使用。

### 安装

你想在哪台电脑上访问远程目录，你就在哪台电脑上安装。我这里是在`Mac`上进行安装。

```shell
# 首先安装一个插件
brew install Caskroom/cask/osxfuse

# 安装sshfs
brew install sshfs
```

### 挂载

```shell
sshfs -C -o reconnect user@hostname:remote_dir local_dir

# user与hostname和ssh命令的一样
# remote_dir 你要挂载服务器文件夹路径
# local_dir 你本地要和服务器文件夹建立关系的文件夹，最好新建一个空的
```

### 相关问题

当我们的 mac 网络断开或者休眠或重启, 回来时发现挂载的失败了, 进入目录会提示

```bash
$ls local_dir 
ls: local_dir: Input/output error
```

如果我们想取消挂载, 又会提示

```bash
$umount local_dir
umount: local_dir: not currently mounted
```

这个时候, 我们不得不关闭进程了, 可以先通过命令查看进程

```undefined
pgrep -lf sshfs
```

然后杀掉相应的挂载进程, 或者直接杀掉所有挂载进程

```undefined
pkill -9 sshfs 
```

之后重新挂载响应的目录即可



