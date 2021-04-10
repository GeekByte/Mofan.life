---
title: Linux安装Postgresql
categories:
  - Linux
  - 实践问题
tags:
  - Linux
  - PostgreSQL
  - 数据库
date: 2021-03-27 16:00:21
---

> 系统：Ubuntu 16.04 LTS
>
> PostgreSQL版本：9.6.21

在Linux上安装 `PostgreSQL` 其实挺简单的，官网已经给了脚本文件，只需要做细微修改即可。这是`Ubuntu` 版本的官方安装文档[PostgreSQL: Linux downloads (Ubuntu)](https://www.postgresql.org/download/linux/ubuntu/)

### 安装

下面的命令是官方的脚本，因为我要安装的是`9.6`的版本，所以，我需要修改最后一条命令，指定我要安装的版本，`postgresql`改成`postgresql-9.6`

```shell
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
# sudo apt-get -y install postgresql
sudo apt-get -y install postgresql-9.6
```

然后等待执行完毕就安装成功了。

### 简单使用

执行完上面的脚本后，系统里有了一个`postgres`用户

使用`sudo su postgres`命令切换到`postgres`用户。

然后执行`psql` 命令，你会看到下面这样的终端：

```txt
psql (9.6.21)
输入 "help" 来获取帮助信息.

postgres=#
```

这就是`PostgreSQL`的控制台，而`postgres`是这里的最高管理员

#### 创建用户及数据库

```sql
# 创建用户
postgres=# CREATE USER mofan WITH PASSWORD 'mofan';
# 创建数据库
postgres=# CREATE DATABASE mofan_data OWNER mofan;
# 将数据库授权给用户
postgres=# GRANT ALL PRIVILEGES ON DATABASE mofan_data TO mofan;
```

这样我们就创建了一个数据库`mofan_data`，数据库由`mofan`进行管理。

#### 使用psql连接数据库

在终端连接 `PostgreSQL` 数据库需要使用 `psql` 工具，根据参数的不同可以实现本地连接或者远程连接。

命令：`psql [选项] <数据库名称>`

**第一种方式：**

```shell
$ psql
```

直接在终端执行 `psql` ，使用默认参数。

这种方式的要求是：

* `PostgreSQL` 的用户名需要和终端当前用户名相同
* 数据库名需要和终端当前用户名相同

**第二种方式：**

使用参数`-U`指定用户名；

`-h` 指定 `Postgresql` 数据库的地址，这个地址可以是本地地址也可以是远程地址，当然，本地地址可以直接省略；

`-d`指定数据库名，但这个可以省略，直接跟上数据库名即可

示例：

```shell
psql -U mofan -h 192.168.1.3 mofan_db
```

通过上面的方式连接数据库，如果连接成功，终端也就变成了下面的形式：

```text
数据库名=>
```

然后就可以使用SQL语句操作数据库了。

#### 常见错误

在使用`psql`连接数据库时，如果提示`psql: 致命错误:  对用户"mofan"的对等认证失败`，需要修改配置文件`pg_hba.conf`

这个文件的位置一般在：

* `Mac` : 默认是在`/Library/PostgreSQL/<版本号>/data` 下面。

* `Linux`: 默认在`/etc/postgresql/<版本号>/main` 下面。

```shell
sudo vim /etc/postgresql/9.6/main/pg_hba.conf
```

```txt
# "local" is for Unix domain socket connections only
local   all             all                                     peer # 把这个peer改成md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```

修改完后，使用命令`service postgresql restart`重启数据库，问题解决。

#### 远程登录

如果需要开启远程登录，请参考我的这篇文章：[PostgreSQL开启远程访问 - Mofan](https://www.mofan.life/2021/03/31/postgresql%E5%BC%80%E5%90%AF%E8%BF%9C%E7%A8%8B%E8%AE%BF%E9%97%AE/)

