---
title: Docker使用
categories:
  - Docker
tags:
  - Docker
date: 2021-07-07 16:44:16
---

## 设置镜像在Dcoekr启动时启动(or 开机自启)

如果镜像还没创建，只需要在`docker run`命令中加上`--restart=awalys`即可；
如果镜像已经创建，则可以通过`docker update --restart=awalys 镜像名称`进行添加。


