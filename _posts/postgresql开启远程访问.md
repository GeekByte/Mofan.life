---
title: PostgreSQL开启远程访问
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-03-31 22:27:18
---

让`PostgreSQL`支持远程访问，需要修改两个文件：`postgresql.conf` 和 `pg_hba.conf`

关于这两个文件的位置在这里简单说下，只说`Mac` 和 `Linux` 的。

`Mac` : 默认是在`/Library/PostgreSQL/<版本号>/data` 下面。

`Linux`: 默认在`/etc/postgresql/<版本号>/main` 下面。

#### 操作

1.修改`pg_hba.conf`文件，在原先的`host all all` 下面添加内容：

```txt
host all all 0.0.0.0 0.0.0.0 md5
```

2.修改`postgresql.conf` 文件

```txt
找到：
#listen_addresses='localhost'

改成：
listen_addresses='*'
```

重启数据库`service postgres restart`

这样实现了远程访问，如果服务器在局域网中，那么还需要做一下内网穿透工作，推荐使用花生壳工具，当然你也可以在`GitHub`上搜索相关的开源技术，这里我比较推荐这两个:

* [nps](https://github.com/ehang-io/nps)

* [goproxy](https://github.com/snail007/goproxy)

