---
title: Redis查看当前连接数及设置最大连接数
categories:
  - 数据库
  - Redis 
tags:
  - Redis 
date: 2021-08-26 18:12:36
---

### 查看连接信息
成功连接 redis server 后，使用 `info clients` 命令会打印以下信息:
```tex
# Clients
connected_clients:5
cluster_connections:0
maxclients:10000
client_recent_max_input_buffer:40
client_recent_max_output_buffer:0
blocked_clients:0
tracking_clients:0
clients_in_timeout_table:0
```
通过上面的信息可知, `connected_clients` 代表当前连接数，`maxclients` 代表该redis server 允许的最大连接数。

> 也可以通过命令 `CONFIG GET maxclients` 获取最大连接数。
```tex
1) "maxclients"
2) "10000"
```
### 设置最大连接数
有三种方式可以进行设置。

#### 通过配置文件
在2.6之后的版本，允许通过配置文件修改最大连接数。
在配置文件中找到`# maxclients 1000，取消注释，修改数值即可，修改完后要重启 `redis server`。

#### 启动 redis server 时加参数

```shell
redis-server --maxclients 100000 -f /etc/redis.conf
```

#### 通过redis客户端设置
成功连接redis server后，在终端使用下面命令设置

```shell
CONFIG SET maxclients 2000
```

通过这种方式修改不需要重启Redis，但是在 redis server 重启后这种设置会失效。
