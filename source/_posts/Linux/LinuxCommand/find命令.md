---
title: 'Linux find 命令'
categories:
  - Linux
  - Linux Command
tags:
  - Linux
  - Linux Command
date: 2022-12-27 16:53:23
---



根据路径和条件查找相关文件或目录。

find命令通常进行的是从根目录（/）开始的全盘搜索，有别于whereis、which、locate……等等的有条件或部分文件的搜索。对于服务器负载较高的情况，建议不要在高峰时期使用find命令的模糊搜索，会相对消耗较多的系统资源。



## 参数及作用

| -name             | 匹配名称                                                     |
| ----------------- | ------------------------------------------------------------ |
| -perm             | 匹配权限（mode为完全匹配，-mode为包含即可）                  |
| -user             | 匹配所有者                                                   |
| -group            | 匹配所有组                                                   |
| -mtime -n +n      | 匹配修改内容的时间（-n指n天以内，+n指n天以前）               |
| -atime -n +n      | 匹配访问文件的时间（-n指n天以内，+n指n天以前）               |
| -ctime -n +n      | 匹配修改文件权限的时间（-n指n天以内，+n指n天以前）           |
| -nouser           | 匹配无所有者的文件                                           |
| -nogroup          | 匹配无所有组的文件                                           |
| -newer f1 !f2     | 匹配比文件f1新但比f2旧的文件                                 |
| -type b/d/c/p/l/f | 匹配文件类型（后面的字幕字母依次表示块设备、目录、字符设备、管道、链接文件、文本文件） |
| -size             | 匹配文件的大小（+50KB为查找超过50KB的文件，而-50KB为查找小于50KB的文件） |
| -prune            | 忽略某个目录                                                 |
| -exec  {} \;      | 后面可跟用于进一步处理搜索结果的命令，类似 xargs             |



## Example

搜索系统中以 `.conf` 结尾的文件

```sh
find / -name *.conf
```



搜索系统中大于 1M 的文件

```sh
find / -size +1M
```



在 home 目录中搜索属于用户 cyp 的文件

```sh
find /home -user cyp
```



列出工作目录中所有文件、目录以及子文件信息

```sh
find .
```



在 /var/log 目录下搜索所有 `.log` 后缀的文件，后缀不需要大小写

```sh
find /var/log -iname "*.log"
```



在 /var/log 目录中，所有后缀不是 `.log` 的文件

```sh
find /var/log ! -name "*.log"
```



列出当前目录中，所有近 7 天被修改的文件

```sh
find . -mtime +7
```



搜索系统中，类型为目录，且权限为 1777 的目录文件：

```sh
find / -type d -perm 1777
```



搜索系统中，类型为文件，且有执行权限的文件

```sh
find / -type f -perm /a=x
```



搜索系统中后缀为 `.mp4` 的文件，并删除它们

```sh
find / -name "*.mp4" -exec rm -rf {} \;
```

