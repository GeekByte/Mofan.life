---
title: Ubuntu16.04进入桌面不显示菜单栏和侧栏
categories:
  - Linux
tags:
  - Linux
date: 2021-03-31 13:35:58

---

使用`VMware`装的 `Ubuntu16.04`，本来一切正常，结果在某次开机后发现：进入桌面不显示菜单栏和侧栏，但是终端可以在桌面右键打开，于是就有了下面的操作。

首先执行下命令查看下问题：

```shell
cat ~/.xsession-errors
```

大体记得是，输出信息是找不到某个桌面服务了，所以就 `exit` 了。

查阅资料发现主要由下面这两种解决方法。我的问题是通过下面的第二种方法解决的。

**解决方法：**

##### 第一种：重新启动lightdm服务

```shell
sudo service lightdm restart
```

之后重启系统，`reboot`

##### 第二种：重装桌面环境

```shell
sudo apt install --reinstall ubuntu-desktop
```

同样重启系统, `reboot`



