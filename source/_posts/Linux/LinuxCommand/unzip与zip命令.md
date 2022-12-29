---
title: 'Linux unzip 与 zip 命令'
categories:
  - Linux
  - Linux Command
tags:
  - Linux
  - Linux Command
date: 2022-12-29 14:47:39
---

解压 zip 格式的文件使用 unzip 命令

压缩成 zip 格式的文件使用 zip 命令

## unzip

### 参数及所用

| 参数 | 作用                         |
| ---- | ---------------------------- |
| -d   | 指定解压到的目录             |
| -n   | 解压时默认不覆盖已有文件     |
| -o   | 解压时默认覆盖已有文件       |
| -l   | 查看被压缩文件列表           |
| -t   | 测试压缩文件是否损坏         |
| -v   | 与 -l 类似，增加压缩率的显示 |
| -z   | 查看压缩文件注释             |

### Example

**解压到指定目录**

```sh
unzip -d /temp t.zip
```



**解压时默认不覆盖已存在的文件**

```sh
unzip -n t.zip
```



**解压时默认覆盖已有文件**

```sh
unzip -o t.zip
```



**只查看被压缩的文件，不解压**

```sh
unzip -l t.zip
```



**检查 zip 文件是否损坏**

```sh
unzip -t t.zip
```



## zip

### 参数及作用

| 参数           | 作用                               |
| -------------- | ---------------------------------- |
| -q             | 不显示指令执行过程                 |
| -r             | 递归处理指定目录下文件及子目录文件 |
| -z             | 为压缩文件添加注释                 |
| -v             | 显示指令执行过程或显示版本信息     |
| -d             | 更新压缩包内文件                   |
| -n<字尾字符串> | 不压缩具有特定字尾字符串的文件     |



### Example

压缩指定目录与其子目录文件

```sh
zip -r etc.zip /etc
```



压缩指定目录内所有以 `.cfg` 结尾的文件

```sh
zip -r backup.zip *.cfg
```



更新压缩包中的某个文件

```sh
zip -dv backup.zip hyper.js

1>1: updating: anaconda-ks.cfg (deflated 44%)
```

