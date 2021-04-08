---
title: Linux使用自定义的Python版本
categories:
  - Linux
tags:
  - Linux
  - Python
  - pip
date: 2021-04-08 19:54:40
---

不知原因为何，用系统默认的pyhton安装的pip却不可用，执行pip命令就报一大堆错误，于是自己从官网下载最新的Python版本来用，并通过创建软连接的方式，让python默认就是指定的版本，并将pip默认成我当前python的pip。

在上面的基础上，又全局修改了pip的镜像源，以提高下载速度。

### 安装Python

Linux的Python是需要自己编译的，下载编译的过程可以查看网上的一些教程，这里就不过多描述了。

### 创建软连接



### 修改pip镜像源

