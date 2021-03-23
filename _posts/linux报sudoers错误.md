---
title: Ubuntu报“xxx is not in the sudoers file.This incident will be reported”错误解决方法
categories:
  - 小问题
tags:
  - 小问题
date: 2021-03-23 22:42:07
---

我是在使用postgresql的时候出现的问题：

```shell
xxx is not in the sudoers file.This incident will be reported
```

按照下面的方法

解决方法来自：[Ubuntu报“xxx is not in the sudoers file.This incident will be reported” 错误解决方法_Linux教程_Linux公社-Linux系统门户网站](http://www.linuxidc.com/Linux/2016-07/133066.htm)

[Ubuntu](https://www.linuxidc.com/topicnews.aspx?tid=2)下普通用户用sudo执行命令时报"xxx is not in the sudoers file.This incident will be reported"错误，解决方法就是在/etc/sudoers文件里给该用户添加权限。如下：

1.切换到root用户下

2./etc/sudoers文件默认是只读的，对root来说也是，因此需先添加sudoers文件的写权限,命令是:
chmod u+w /etc/sudoers

3.编辑sudoers文件
`vi /etc/sudoers`
找到这行 root ALL=(ALL) ALL,在他下面添加xxx ALL=(ALL) ALL (这里的xxx是你的用户名)

ps:这里说下你可以sudoers添加下面四行中任意一条

```shell
youuser      ALL=(ALL)        ALL
%youuser     ALL=(ALL)        ALL
youuser      ALL=(ALL)        NOPASSWD: ALL
%youuser     ALL=(ALL)        NOPASSWD: ALL
```

* 第一行:允许用户youuser执行sudo命令(需要输入密码).
* 第二行:允许用户组youuser里面的用户执行sudo命令(需要输入密码).
* 第三行:允许用户youuser执行sudo命令,并且在执行的时候不输入密码.
* 第四行:允许用户组youuser里面的用户执行sudo命令,并且在执行的时候不输入密码.

4.撤销sudoers文件写权限,命令:
chmod u-w /etc/sudoers