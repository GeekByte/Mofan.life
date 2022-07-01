---
title: '服务器socket: too many open files问题排查'
categories:
  - Linux
tags:
  - Linux
date: 2021-08-01 09:03:47
---

## 错误描述

`socket: too many open files`

从字面意思上看就是说程序打开的文件数过多，不过这里的files不单是文件的意思，也包括打开的通讯连接(比如socket)，正在监听的端口等等，所以有时候也可以叫做句柄(handle)，这个错误通常也可以叫做句柄数超出系统限制。

**因此应该重点检查进程在某个时刻是否打开了超过系统限制的文件数量以及通讯连接数。**

## 排查

查看当前系统设置的最大句柄数：

```shell
$ ulimit -a
core file size          (blocks, -c) unlimited
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 64033
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 65535
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 64033
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

`lsof | wc -l` 命令可以查看系统当前打开的句柄数量，执行时间较长

查看某个进程打开的句柄数量，用于检测是否打开了过多的句柄，开启的连接以及打开的文件没有关闭，都会导致输出的数值比较大：

`lsof -p pid | wc -l`

## 解决方案

### 1. 增大系统允许打开的句柄数量

```shell
# 临时（重启系统会失效）
ulimit -n 4096 (注：非root用户最大开启4096个，如果需要更多，请用root用户)

# 永久生效（需要重启系统）
vim /etc/security/limits.conf
# 在最后加入
* soft nofile 4096  
* hard nofile 4096
```

### 2. 检查程序问题

如果你对程序打开的连接数量有一定的估算，在排查阶段发现打开的数值异常，可以将程序打开的句柄详情重定向都文件中进行分析。

`lsof -p pid > openfiles.log`

> 对于代码的检查：
>
> a. 是否有必要打开这些文件
>
> b. 是否打开或写入文件没有关闭连接
>
> c. 通讯相关的连接是否没有关闭，或者没有设置超时结束机制
>
> d. 是否在循环中不小心创建了大量的连接

题外话：

> 对于代码中使用的一些方法特性最好充分了解，比如Java 中的 post.releaseConnection()关闭连接，字面意思可能是关闭，但实际上这种关闭并没有真正关闭连接，而是将该连接提交给 MultiThreadedHttpConnectionManager，等待复用。
> Close_wate需要延迟几秒钟才能关闭连接，而每个Socket连接都需要等待几秒钟，压力过大时，开启的Socket连接超过了系统所能承受的最大连接数（ulimit -u 1024），所以抛出Too many open files异常。

最后，提醒一点，**写代码一定要规范谨慎，认真斟酌！！！**
