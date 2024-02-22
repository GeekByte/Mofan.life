---
title: PostgreSQL使用实例
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-04-01 08:55:55
---



### 创建表

```sql
create table xtable (name varchar(20), address text, age int);
```

### 插入数据

```sql
insert into xtable values("X001", "X City", 24);
insert into xtable values("Y001", "Y City", 22);
insert into xtable values("Z001", "Z City", 22);
```

### 更新数据

#### 使用RETURNING子句返回更新后的字段

```sql
update xtable set age = 20 where name = "X001" returning age as age_no;
```

### 查询数据

#### 去重查询

```sql
select distinct age from xtable order by 1;
```

###  清空表

```sql
truncate table xtable;
```

### 删除表

从数据库中删除表，包含表的所有关联数据，包括 索引、规则、触发器和约束。

```sql
drop table if exists xtable;
```

### 创建视图

通过从表、子集或基础表中选择的列形成的虚拟表。

```sql
create or replace view vi as select * from xtable where age is null;
```

### 使用select语句创建表

```sql
select 'Jax' as col1, 24 as col2, 'from china' as col3 into ytable;
```

### 设定超时

指定某个查询在规定时间后超时中止，精确到毫秒。

```sql
postgres# set statement_timeout = 10;
postgres# select pg_sleep(20);
ERROR:  canceling statement due to statement timeout
```

### 序号生成器

创建序列后，可以使用 `nextval` 和 `currval` 函数获取序列的下一个值和当前值。

```sql
create sequence seq;

nextval('seq');

currval('seq');
```





