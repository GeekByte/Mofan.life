---
title: Linux配置ssh远程登录
categories:
  - Linux
tags:
  - Linux
  - ssh
date: 2021-03-30 10:51:22
---

本来不想写的，但是发现网上没有一个靠谱的教程。简单的写几个步骤，照着做能实现：`Linux`安装`ssh`工具，配置`ssh`允许`root`登陆，开放对应端口，默认`ssh`端口是`22`。

### 安装ssh

```shell
# Ubuntu
sudo apt install openssh-server

# CentOS
sudo yum install openssh-server
```

### 配置

新系统如果没有`vim`先安装下`vim`。`sudo apt install vim`

修改配置文件：

```
sudo vim /etc/ssh/sshd_config
```

将里面字段改成这样：

```text
原：PermitRootLogin prohibit-password
现：PermitRootLogin yes

原：PasswordAuthentication no
现：PasswordAuthentication yes
```

上面的字段可能被注释了，要删除 `#`。

重启ssh `sudo /etc/init.d/ssh restart`

### 开放端口

iptables防火墙好像没有默认开放22端口。开放端口命令：

```shell
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT
```



然后就可以`ssh root@xxxxx`登陆了

### 远程登录

这里指的是外网访问：

如果Linux在局域网，你想在外网访问，那么需要内网穿透工具，花生壳的使用方式可以看一下。[花生壳 3.0 for Linux 相关安装使用文档](https://service.oray.com/question/4287.html)

如果是外网Linux，那就直接`ssh root@ip`登陆即可。

### 指定端口登陆

如果没有使用`22`端口的话，`ssh`登陆指定端口的命令：`ssh -p 端口号 root@xxxx`