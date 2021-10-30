---
title: Mac上的ControlCe进程
categories:
  - Issues
tags:
  - Mac
date: 2021-10-30 22:07:37
---

这几天刚换笔记本，于是迁移了一波环境，在跑代码的时候，发现5000端口竟然被占用，因为之前项目一直用的5000端口，所以我有点好奇Mac上的什么进程用了这样一个普普通通的端口。

通过 `sudo lsof -i tcp:5000` 命令发现是 `ControlCe` 进程在占用，于是查了一下这个进程，在[Why is Control Center on Monterey … | Apple Developer Forums](https://developer.apple.com/forums/thread/682332)这里找到了答案，原来是 `AirPlay Receiver` 占用的。

关闭 `Airplay Recover` 的方式很简单，到 **系统偏好设置 -> 共享**，将左侧服务中的 **隔空播放接收器** 取消勾选即可。

