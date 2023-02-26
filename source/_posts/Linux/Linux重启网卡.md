---
title: Linux重启网卡
categories:
  - Linux
tags:
  - Linux
date: 2021-11-05 13:26:37
---

修改了IP之后，要使其生效，有几种方法
1、ifdown/ifup
#ifdown eth0
#ifup eth0

2、ifconfig
#ifconfig eth0 down
#ifconfig eth0 up

3、network
#/etc/init.d/network restart
这条命令是重启整个网络
重启之后需要重新登录服务器，比较麻烦
可使用 nohup /etc/init.d/network restart &
