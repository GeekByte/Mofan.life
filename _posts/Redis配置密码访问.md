---
title: Redis配置密码访问
categories:
  - 数据库
  - Redis
tags:
  - 数据库
  - Redis
date: 2021-04-13 09:17:10
---

Redis配置密码访问的方式有两种。

最常用的是修改配置文件`redis.conf`，但需要重启`redis-server`，如有需要，请做好数据的持久化后再重启，因为重启`redis-server`会清除所有`db`下的数据。

另一种是在`redis-cli`的交互界面配置，这种是临时的，在`redis-server`重启后就会失效。

#### 通过修改配置文件配置密码

`redis.conf`配置文件一般是在`redis安装包`解压后的`conf`目录里，当然你也可以放在其他位置，比如常用的`/etc/redis/redis.conf`

通过`Vim`打开这个文件，使用`Vim`的查找命令`/`找到`requirepass`，将它取消注释，然后删除后面的`footbared`，改成你的密码。

```bash
vim redis.conf

# 在vim中，按 Shift + : 进入命令行界面，输入 /requirepass ，按 n 查找下一个，找到后取消注释，设置密码。
```

重启`redis-server`，指定配置文件启动。

```shell
ps -ef | grep redis-server

kill xxx

redis-server redis.conf
```

现在用`redis-cli`连接`redis-server`

```shell
redis-cli -h <IP地址> -p <端口> -a <密码>
```

具体的`redis-cli`命令，可以通过`redis-cli --help`查看。

#### 临时修改

`redis-server` 已启动的情况下

```bash
# 使用redis-cli连接redis-server
redis-cli -h IP地址 -p 端口号(默认6379)

# 在交互界面输入命令，设置密码
> config set requirepass areyouok123

# 查看设置的密码
> config get requirepass

# 退出redis-cli，重新连接，再次输入命令就提示你要输入密码了
> config get requirepass
(error) NOAUTH Authentication required.
```

