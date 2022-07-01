---
title: Docker镜像相关
categories:
  - Docker
tags:
  - Docker
date: 2022-03-15 00:14:05
---


### 将镜像打包成文件或从文件载入镜像

**镜像打包成文件**

```sh
docker save -o <文件名> <待打包镜像>
```
eg:
```sh
docker save -o nps.tar ffdfghdf/nps
```

**从文件导入镜像**
```sh
docker load --input <文件名>
或者
docker load < <文件名>
```
eg:
```sh
docker load < npc.tar
```

TODO:
[docker 拷贝镜像文件 - Bigben - 博客园](https://www.cnblogs.com/bigben0123/p/7592970.html)

[(17条消息) docker image 重命名_cs_sword2000的博客-CSDN博客_docker image 重命名](https://blog.csdn.net/cs_sword2000/article/details/98453495)


[(17条消息) Docker将自己的镜像发布到个人私有仓库_1024困不住-CSDN博客](https://blog.csdn.net/qq_24036403/article/details/101125233)


[Docker build 命令 | 菜鸟教程](https://www.runoob.com/docker/docker-build-command.html)

