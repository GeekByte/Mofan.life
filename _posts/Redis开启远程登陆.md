---
title: Redis开启远程登陆
categories:
  - 数据库
  - Redis
tags:
  - 数据库
  - Redis
date: 2021-04-13 09:45:43
---

`Redis`开启远程登录只需要两步操作，修改配置文件，和开放对应端口（默认是6379）。

#### 修改配置文件

`redis.conf` 一般位于`redis安装包` 解压后的目录，如果有指定，最常用的位置是`/etc/redis/redis.conf`

打开`redis.conf`文件后

1. 找到`bind127.0.0.1 -::1`这一行，将其注释掉。

2. 找到 `protected-mode yes` 改为 `protected-mode no`

保存后重启`redis-server`，注意要加载到我们配置过的`redis.conf`

```shell
redis-server redis.conf

# 如果想在后台运行，使用命令
nohup redis-server redis.conf &
# 这会在当前目录创建nohup.log文件，是nohup运行reids-server的日志输出文件。
```

#### 开放端口

默认端口是`6379`，如果是别的，请自行替换。

如果是`iptable`防火墙

```shell
# 命令行操作
iptables -A INPUT -p tcp --dport 6379 -j ACCEPT

# 或者
# 修改配置文件
vim /etc/sysconfig/iptables
# 在最后一行添加
-A RH-Firewall-1-INPUT -m state NEW -m tcp -dport 8080 -j ACCEPT
```

如果是`firewall`防火墙

```shell
firewall-cmd --zone=public --add-port=6379/tcp --permanent

# 重启防火墙
firewall-cmd --reload
```

