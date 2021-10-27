---
title: PostgreSQL查看和设置最大连接数
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-07-12 17:49:55
---

### 查看最大连接数
```sql
postgres=# show max_connections;
```

### 查看当前连接数
```sql
postgres=# select count(*) from pg_stat_activity;
```

### 修改最大连接数
```shell
vim /etc/postgresql/9.6/main/postgresql.conf

# 通过/max 找到下面的配置,修改值
max_connections = 100

```

### 使配置生效

```shell
service postgresql restart
```

