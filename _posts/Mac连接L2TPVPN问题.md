---
title: Mac连接L2TPVPN问题
categories:
  - Issues
tags:
  - Mac
date: 2021-03-23 22:30:26
---

### 最新说明，Mac OS Monetery 不再支持L2TP-VPN，以下设置仅对旧版系统有效

今天需要使用softether VPN，于是去官网下载其客户端，却看到说在Mac下只有命令行模式的客户端，但是推荐使用系统网络里自带的VPN配置，于是按照其说明配置一番，在点击 connect 的时候，出现“IPSec共享密钥”丢失的提醒，于是搜索一番，找到解决方法：

1. 在`/etc/ppp` 目录下新建文件`options`

	```shell
	sudo vim /etc/ppp/options
	```

2. 在`options` 文件中新增

	```
	plugin L2TP.ppp
	l2tpnoipsec
	```



完成后再连接就没有问题了

