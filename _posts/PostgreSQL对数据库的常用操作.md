---
title: PostgreSQL对数据库的常用操作
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-04-13 21:35:19
---

### 创建数据库

`PostgreSQL` 创建数据库可以用以下三种方式：

- 1、使用 **CREATE DATABASE** SQL 语句来创建。
- 2、使用 **createdb** 命令来创建。
- 3、使用 **pgAdmin** 等可视化工具创建。

这里只介绍前两种。

#### CREATE DATABASE 创建数据库

基本创建，默认属于当前用户

```SQL
CREATE DATABASE <dbname>;
```

指定数据库所有者

```SQL
CREATE DATABASE <dbname> OWNER <username>;
```

#### createdb 命令创建数据库

`createdb` 是一个 SQL 命令 `CREATE DATABASE` 的封装。

`createdb` 命令语法格式如下：

```
createdb [option...] [dbname [description]]
```

**参数说明：**

**dbname**：要创建的数据库名。

**description**：关于新创建的数据库相关的说明。

**options**：参数可选项，可以是以下值：

| 序号              |                选项 & 描述                 |
| :---------------- | :----------------------------------------: |
| **-D tablespace** |           指定数据库默认表空间。           |
| **-e**            |   将 `createdb` 生成的命令发送到服务端。   |
| **-E encoding**   |      指定数据库的编码，默认是`utf-8`       |
| **-l locale**     |           指定数据库的语言环境。           |
| **-T template**   |          指定创建此数据库的模板。          |
| **--help**        |      显示 `createdb` 命令的帮助信息。      |
| **-h host**       |            指定服务器的主机名。            |
| **-p port**       | 指定服务器监听的端口，或者 `socket` 文件。 |
| **-U username**   |            连接数据库的用户名。            |
| **-w**            |               忽略输入密码。               |
| **-W**            |          连接时强制要求输入密码。          |

`createdb` 命令和 `psql` 命令一样，均位于 **PostgreSQL安装目录/bin** 下，执行创建数据库的命令：

```shell
createdb -h localhost -p 5432 -U postgres <dbname>
```

上面的命令，我们使用了超级用户 `postgres` 登录到主机地址为 `localhost`，端口号为 `5432` 的 `PostgreSQL` 数据库中并创建 `dbname` 数据库。

### 选择数据库

选择数据库的方式也有三种：分别是在数据库的命令窗口、在系统终端窗口和可视化工具，这里也只介绍前两种。

#### 数据库的命令窗口

`\l` : 查看已经存在的数据库

`\c <dbname>` : 进入到指定的数据库

#### 系统命令行窗口

使用`psql`命令，具体的使用请通过`psql --help` 查看.

```shell
psql -h localhost -p 5432 -U <username> -d <dbname>
```

* `-h` 指定数据库服务器IP地址
* `-p` 指定端口
* `-U` 指定登陆用户名
* `-d` 指定登陆到的数据库名称，可以省略，直接加数据库名，如果省略`-d`后面的内容，则默认登陆到和用户名相同的数据库

### 删除数据库

`PostgreSQL` 删除数据库可以用以下三种方式：

- 1、使用 **DROP DATABASE** SQL 语句来删除。
- 2、使用 **dropdb** 命令来删除。
- 3、使用 **pgAdmin** 工具。

这里只介绍前两种。

#### DROP DATABASE 删除数据库

**注意：**

* `DROP DATABASE `会删除数据库的系统目录项并且删除包含数据的文件目录。

* `DROP DATABASE` 只能由超级管理员或数据库拥有者执行。

* `DROP DATABASE` 命令需要在 `PostgreSQL` 命令窗口来执行。

删除名称为`dbname` 的数据库

```sql
DROP DATABASE <dbname>
```

如果存在`dbname` 则删除

```SQL
DROP DATABASE IF EXISTS <dbname>
```

#### dropdb 命令删除数据库

`dropdb` 是 `DROP DATABASE` 的包装器。

`dropdb` 用于删除 `PostgreSQL` 数据库。

`dropdb` 命令只能由超级管理员或数据库拥有者执行。

`dropdb` 命令语法格式如下：

```
dropdb [connection-option...] [option...] dbname
```

**参数说明：**

**dbname**：要删除的数据库名。

**options**：参数可选项，可以是以下值：

| 序号                        |                         选项 & 描述                          |
| :-------------------------- | :----------------------------------------------------------: |
| **-e**                      |        显示 `dropdb` 生成的命令并发送到数据库服务器。        |
| **-i**                      |             在做删除的工作之前发出一个验证提示。             |
| **-V**                      |                  打印 `dropdb` 版本并退出。                  |
| **--if-exists**             |       如果数据库不存在则发出提示信息，而不是错误信息。       |
| **--help**                  |              显示有关 `dropdb` 命令的帮助信息。              |
| **-h host**                 |                   指定运行服务器的主机名。                   |
| **-p port**                 |          指定服务器监听的端口，或者 `socket` 文件。          |
| **-U username**             |                     连接数据库的用户名。                     |
| **-w**                      |                     连接数据库的用户名。                     |
| **-W**                      |                   连接时强制要求输入密码。                   |
| **--maintenance-db=dbname** | 删除数据库时指定连接的数据库，默认为 `postgres`，如果它不存在则使用 `template1`。 |

基本使用

```shell
dropdb -h localhost -p 5432 -U <username> --if-exists <dbname> 
```

我们使用了用户 `username` 登录到主机地址为 `localhost`，端口号为 `5432` 的 `PostgreSQL` 数据库中并删除 `dbname` 数据库。

### 修改数据库信息

#### 修改数据库密码

修改密码有两种方式，一种是在`psql`客户端使用`Postgresql`命令的方式，一种是使用SQL语句，但是第一种会相对更安全一些。

**psql**

```sql
test1=> \password 
Enter new password: 
Enter it again: 
test1=> 
```

**SQL语句**

这种方式不限制客户端

```sql
ALTER USER test1 PASSWORD '<采用相关协议加密后的密码字符串>'
```

采用这种方式修改安全性低的原因是SQL语句可能被记录在相关日志中，日志泄漏会导致密码的泄漏，同时，如果数据库有主从复制，则其他数据库的密码也会修改，因为主从复制的实现原理是基于数据库操作日志的。

### 查看数据库的所有用户

```sql
\du
```

