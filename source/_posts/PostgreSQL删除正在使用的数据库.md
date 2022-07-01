---
title: PostgreSQL删除正在使用的数据库
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-04-19 18:18:43
---

当我在卸载`PostgreSQL`的一个数据库时，提示这个数据库正在被使用，不能被卸载。

```shell
=>drop database db;
ERROR:  database "db" is being accessed by other users
DETAIL:  There is 1 other session using the database.
```

然后到网上查了下有没有强制删除的方法，主要方法如下：首先禁止会话再连入数据库中，然后断掉当前的所有的连接，然后卸载就行了。

**1.禁止会话连入**

```sql
postgres=# update pg_database set datallowconn = 'false' where datname = 'db_name';
```

**2.中断当前数据库的所有连接**

```sql
postgres=# select pg_terminate_backend(pid) from pg_stat_activity where datname = 'db';
```

**3.删除数据库**

```sql
postgres=# drop database db;
```

