---
title: 有趣的Linux命令
categories:
  - Linux
tags:
  - Linux
date: 2021-06-28 18:59:13
---

### 新建文件夹并进入

```shell
mkdir hello && cd $_
```

### ls命令

-c按创建时间ctime排序，-t按修改时间mtime排序，-r可以实现逆序排序，按时间排序的默认是降序排序。

```shell
ls -alrt # 按修改时间升序排序
ls --sort=time -lra # 等价于 ls -alrt
ls -alrc # 按创建时间升序排序
ls -alru # 按访问时间升序排序
```
查询文件，将结果按时间排序

```shell
find . -name *.php|xargs ls -alt
```
