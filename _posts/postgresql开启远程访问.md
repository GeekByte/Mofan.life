---
title: postgresql开启远程访问
categories:
  - postgresql
tags:
  - postgresql
date: 2021-03-31 22:27:18
---

让postgresql支持远程访问，需要修改两个文件：`postgresql.conf` 和 `pg_hba.conf`

关于这两个文件的位置在这里简单说下，只说`Mac` 和 `Linux` 的。

`Mac` : 默认是在`/Library/PostgreSQL/<版本号>/data` 下面。

`Linux`: 默认在`/etc/postgresql/<版本号>/main` 下面。



这个配置方法默认只允许某个主机或者某个范围的主机访问。



1.修改`pg_hba.conf`文件

```txt
... 
host all all 127.0.0.1/32  trust 
host all all 192.168.1.0/24 md5
```

这里是让192.168.1.0到192.168.1.255的主机访问。（这个方法我也不满意， 后续看着改）

2.修改`postgresql.conf` 文件

```txt
找到：
#listen_addresses='localhost'

改成：
listen_addresses='*'
```

重启服务器。

查看下监听的IP：

```sehll
dog@debian:~$ sudo netstat -plunt | grep postgres 
tcp  0  0 :5432   0.0.0.0:*    LISTEN  787/postgres 
tcp6  0  0 ::1:5432    :::*     LISTEN  787/postgres
```

在远程的情况下看到的都将是星号而不是127.0.0.1。